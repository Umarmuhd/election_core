import busboy from 'busboy';
import fs from 'fs';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Assignment, AssignmentModel } from './assignment.model';
import { createAssignment, findAssignment, findUserByWard } from './assignment.service';
import { UserModel } from '../user/user.model';
import { UpdateAssignmentBody, UpdateAssignmentParams } from './assignment.schema';
import { PartyModel } from '../party/party.model';

export async function createAssignmentHandler(
  req: Request<{}, {}, UpdateAssignmentBody>,
  res: Response
) {
  const { _id: userId } = res.locals.user;
  const ward = req.body.ward;
  try {
    // const existingward = await findUserByWard(ward);
    // if (existingward) {
    //   res.status(StatusCodes.CONFLICT).json({
    //     success: false,
    //     message: 'This Poling Unit Have Submitted Before',
    //   });
    //   return;

    // }
    // console.log(req.body.party);
    console.log(userId);
    const wardvotes = await createAssignment({ ...req.body, owner: userId });

    const existingVote = await PartyModel.findOne({ name: req.body.party })

    if (!existingVote) {
      res.status(400).json({ status: "failed", message: "Party Not found" });
      return;
    }

    existingVote.votes = (existingVote.votes + req.body.votes);

    await existingVote.save();
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Result Submitted successfully!',
      data: wardvotes,
    });
  } catch (err: any) {
    console.log(err);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message });
  }
}

export async function getSingleAssignmentHandler(req: Request, res: Response) {
  const basket_Id = req.params.assignment_Id;

  try {
    const basket = await AssignmentModel.findOne({ basket_Id }).populate(
      'owner',
      'first_name last_name email address'
    );

    if (!basket) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Basket not found' });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Basket found',
      data: {
        basket,
      },
    });
  } catch (error: any) {
    return res.status(409).json({ status: 'failed', message: error.message });
  }
}

export async function getAllUserAssignmentHandler(req: Request, res: Response) {

  try {
    const votes = await AssignmentModel.find({}).sort({ votes: -1 });
    return res
      .status(200)
      .json({ status: 'success', message: 'Votes list', data: votes });
  } catch (error: any) {
    return res.status(409).json({ status: 'failed', message: error.message });
  }
}

export async function deleteAssignmentHandler(req: Request, res: Response) {
  const basket_Id = req.params.assignment_Id;

  try {
    const basket = await AssignmentModel.findOneAndDelete({ basket_Id });

    if (!basket) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Basket not found' });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Basket Deleted',
    });
  } catch (error: any) {
    return res.status(409).json({ status: 'failed', message: error.message });
  }
}

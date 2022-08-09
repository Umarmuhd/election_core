import busboy from 'busboy';
import fs from 'fs';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Party, PartyModel } from './party.model';
import { createParty, findParty, findUserByPartyName } from './party.service';
import { UserModel } from '../user/user.model';
import { UpdatePartyBody, UpdatePartyParams } from './party.schema';

export async function createPartyHandler(
  req: Request<{}, {}, UpdatePartyBody>,
  res: Response
) {
  const { _id: userId } = res.locals.user;
  const party = req.body.name;
  // const logo = req.file;
  try {
    // if (!req.file) {
    //   res
    //     .status(400)
    //     .json({ status: 'failed', message: 'Please add an image' });
    //   return;
    // }
    console.log(party)
    const existingward = await findUserByPartyName(party);
    if (existingward) {
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: 'Party Exist',
      });
      return;

    }
    console.log(userId);
    const wardvotes = await createParty({ ...req.body, owner: userId });
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

export async function getSinglePartyHandler(req: Request, res: Response) {
  const party_Id = req.params.party_Id;

  try {
    const basket = await PartyModel.findOne({ party_Id }).populate(
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

export async function getAllUserPartyHandler(req: Request, res: Response) {

  try {
    const party = await PartyModel.find({}).sort({ votes: -1 }).limit(4);
    return res
      .status(200)
      .json({ status: 'success', message: 'Parties list', data: party });
  } catch (error: any) {
    return res.status(409).json({ status: 'failed', message: error.message });
  }
}
export async function getHighestPartyHandler(req: Request, res: Response) {

  try {
    const party = await PartyModel.find({}).sort({ votes: -1 }).limit(1);
    return res
      .status(200)
      .json({ status: 'success', message: 'Parties list', data: party });
  } catch (error: any) {
    return res.status(409).json({ status: 'failed', message: error.message });
  }
}

export async function deletePartyHandler(req: Request, res: Response) {
  const basket_Id = req.params.Party_Id;

  try {
    const basket = await PartyModel.findOneAndDelete({ basket_Id });

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

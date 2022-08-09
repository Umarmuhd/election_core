import { boolean, object, number, string, TypeOf } from "zod";

export const updateAssignmentSchema = {
  body: object({
    ward: string(),
    votes: number(),
    party: string(),


  }),
  params: object({
    assignment_Id: string(),
  }),
};

export type UpdateAssignmentBody = TypeOf<typeof updateAssignmentSchema.body>;
export type UpdateAssignmentParams = TypeOf<typeof updateAssignmentSchema.params>;

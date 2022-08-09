import { boolean, object, number, string, TypeOf } from "zod";

export const updatePartySchema = {
  body: object({
    name: string(),
    votes: number(),
    candidate: string(),


  }),
  params: object({
    Party_Id: string(),
  }),
};

export type UpdatePartyBody = TypeOf<typeof updatePartySchema.body>;
export type UpdatePartyParams = TypeOf<typeof updatePartySchema.params>;

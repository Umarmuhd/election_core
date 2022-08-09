import { Party, PartyModel } from "./party.model";

export function createParty(input: Partial<Party>) {
  return PartyModel.create(input);
}

export function findParty(Party_Id: Party["party_Id"]) {
  return PartyModel.findOne({ Party_Id });
}
export async function findUserByPartyName(name: Party["name"]) {
  return PartyModel.findOne({ name });
}
// export function findBaskets() {
//   return basket_Id.find({
//     published: true,
//   }).lean();
// }

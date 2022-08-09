import { Assignment, AssignmentModel } from "./assignment.model";

export function createAssignment(input: Partial<Assignment>) {
  return AssignmentModel.create(input);
}

export function findAssignment(assignment_Id: Assignment["assignment_Id"]) {
  return AssignmentModel.findOne({ assignment_Id });
}
export async function findUserByWard(ward: Assignment["ward"]) {
  return AssignmentModel.findOne({ ward });
}
// export function findBaskets() {
//   return basket_Id.find({
//     published: true,
//   }).lean();
// }

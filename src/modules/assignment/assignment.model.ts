import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { customAlphabet } from 'nanoid';
import { User } from '../user/user.model';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

export class Assignment {
  @prop({ required: true })
  public ward: string;

  @prop({ required: true })
  public votes: number;

  @prop({ required: true })
  public party: string;

  @prop({ unique: true, default: () => nanoid() })
  public assignment_Id: string;

  @prop({ required: true, ref: () => User })
  public owner: Ref<User>;


}

export const AssignmentModel = getModelForClass(Assignment, {
  schemaOptions: {
    timestamps: true,
  },
});

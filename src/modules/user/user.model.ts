import { getModelForClass, prop, pre, Ref } from '@typegoose/typegoose';
import argon2 from 'argon2';

@pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await argon2.hash(this.password);
    this.password = hash;

    return next();
  }
})
export class User {
  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: true })
  public first_name: string;

  @prop({ required: true })
  public last_name: string;

  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}




export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});

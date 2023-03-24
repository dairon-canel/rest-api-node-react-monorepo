import { SchemaDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(
  input: SchemaDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >,
) {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}

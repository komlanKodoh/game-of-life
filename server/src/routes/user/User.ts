import * as dynamoose from "dynamoose";
import { Document } from "dynamoose/dist/Document";
import Config from "../../config";

export class User extends Document {
  id!: string;
  username!: string;
  password!: string;
}

const UserSchema = new dynamoose.Schema({
  id: String,
  username: {
    type: String,
    index: {
      name: "username-index",
      global: true
  }
  },
  password: String,
});

export const UserRepository = dynamoose.model<User>(
  Config.USER_TABLE,
  UserSchema
);

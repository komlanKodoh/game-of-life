import { UserRepository } from "./User";
import bcrypt from "bcrypt";
import Config from "../../config";
import utils from "../../utils";

export interface UserCredentials {
  username: string;
  password: string;
}

export const createUser = async (userCredentials: UserCredentials) => {
  let user = {
    id: utils.getUUID(),
    username: userCredentials.username,
    password: await bcrypt.hash(userCredentials.password, Config.HASH_STRENGTH),
  };

  UserRepository.create(user);
};

export const deleteUser = async (credentials: UserCredentials) => {
  let user = await getUser(credentials);

  user.delete();
};

export const getUser = async (credentials: UserCredentials) => {
  let user = await UserRepository.get({ username: credentials.username });

  if (!(await bcrypt.compare(credentials.password, user.password))) {
    throw { status: 401, message: "Invalid username or password" };
  }

  return user;
};

export const updateUser = async (
  credentials: UserCredentials,
  newCredentials: Partial<UserCredentials>
) => {
  let user = await getUser(credentials);

  user = Object.assign(user, newCredentials);

  await user.save();
};

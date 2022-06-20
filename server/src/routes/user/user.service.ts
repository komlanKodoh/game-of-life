
import { UserRepository } from "./User";
import bcrypt from "bcrypt";
import Config from "../../config";
import utils from "../../utils";
import { InvalidCredentialError, ResourceConflicting } from "../../error/CustomErrors";

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

  const existingUser = (await UserRepository.query("username").eq(user.username).exec())[0];

  if ( existingUser ) throw ResourceConflicting("User with username already exists");

  await UserRepository.create(user);
};

export const deleteUser = async (credentials: UserCredentials) => {
  let user = await getUser(credentials);

  user.delete();
};

export const getUser = async (credentials: UserCredentials) => {
  if ( !credentials.username ) throw InvalidCredentialError("wrong username or password");

  let user = (
    await UserRepository.query("username").eq(credentials.username).exec()
  )[0];

  if (!user) throw InvalidCredentialError("wrong username or password");

  await bcrypt.compare(credentials.password, user.password).catch((_) => {
    throw InvalidCredentialError("wrong username or password");
  });

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

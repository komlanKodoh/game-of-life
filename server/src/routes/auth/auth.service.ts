import { InvalidCredentialError } from "./../../error/CustomErrors";
import jwt from "jsonwebtoken";
import Config from "../../config";

export interface UserIdentifier {
  id: string;
}

export interface Token {
  value: string,
  expires?: number
}

export const getToken = (userIdentifier: UserIdentifier) => {
  let data = {
    id: userIdentifier.id,
  };
  
  const token = jwt.sign(data, Config.JWT_SECRET_KEY, {
    expiresIn: Config.JWT_VALIDITY_TIME,
  });

  const {exp: expires } = jwt.decode( token ) as { exp: number };

  return {
    value: token,
    expires
  } as Token ;
};

export const parseToken = (token: string) => {
  try {
    let data = jwt.verify(token, Config.JWT_SECRET_KEY) as UserIdentifier;
    return { id: data.id } as UserIdentifier;
  } catch (e: any) {
    throw InvalidCredentialError();
  }
};

export const refreshToken = (refreshToken: string) => {
  let userIdentifier = parseToken(refreshToken);

  return getToken(userIdentifier);
};

export const getRefreshToken = (userIdentifier: UserIdentifier) => {
  const token = jwt.sign(userIdentifier, Config.JWT_SECRET_KEY, {
    expiresIn: Config.REFRESH_TOKEN_VALIDITY_TIME,
  });

  const {exp: expires } = jwt.decode( token ) as { exp: number };

  return {
    value: token,
    expires
  } as Token;
};

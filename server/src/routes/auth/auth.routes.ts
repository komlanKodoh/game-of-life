import Auth from ".";
import User from "../user";
import Router from "koa-router";
import Config from "../../config";
import { InvalidCredentialError } from "./../../error/CustomErrors";
import { UserCredentials } from "../user/user.service";

const router = new Router();

router.get("/token", async (ctx) => {
  let userCredentials = {
    username: ctx.request.query.username,
    password: ctx.request.query.password,
  } as UserCredentials;

  let { id } = await User.Service.getUser(userCredentials);

  let token = Auth.Service.getToken({ id });
  ctx.body = token; 

  ctx.cookies.set(
    Config.REFRESH_TOKEN_COOKIE_NAME,
    Auth.Service.getRefreshToken({ id }).value
  );
});

router.get("/refreshToken", async (ctx) => {
  let refreshToken = ctx.cookies.get(Config.REFRESH_TOKEN_COOKIE_NAME);

  if (!refreshToken) throw InvalidCredentialError("Token Invalid or absent");

  let newToken = Auth.Service.refreshToken(refreshToken);
  ctx.body = {
    data: { token: newToken },
  };
});

export default router.routes();

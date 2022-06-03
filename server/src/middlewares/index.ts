import Koa from "koa";
import parse from "co-body";
import Auth from "../routes/auth";
import { InvalidCredentialError } from "../error/CustomErrors";

type Middleware = (ctx: Koa.Context, next: () => Promise<any>) => void;

const bodyParser: Middleware = async (ctx, next) => {
  try {
    ctx.body = await parse(ctx);
  } catch (e) {}

  await next();
};

const userAuthentication: Middleware = async (ctx, next) => {
  const bearerToken = ctx.get("Authorization")?.slice(7);

  if (bearerToken) ctx.user = Auth.Service.parseToken(bearerToken);

  await next();
};

const requireUser: Middleware = async (ctx, next) => {
  if ( ! ctx.user ) throw InvalidCredentialError("Absent or invalid token");

  await next();
}

const Middleware = {
  bodyParser,
  requireUser,
  userAuthentication,
};

export default Middleware;

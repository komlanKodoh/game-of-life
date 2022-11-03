
import parse from "co-body";
import Auth from "../routes/auth";
import { InvalidCredentialError } from "../error/CustomErrors";
import { RouterContext } from "../utils/api";
import Config from "../config";

type Middleware = (ctx: RouterContext, next: () => Promise<any>) => void;

const bodyParser: Middleware = async (ctx, next) => {
  try {
    ctx.request.body = await parse(ctx);
  } catch (e) {}

  await next();
};

const userAuthentication: Middleware = async (ctx, next) => {
  const bearerToken = ctx.get("Authorization")?.slice(7);

  if (bearerToken) ctx.user = Auth.Service.parseToken(bearerToken);
  else if (Config.isDev()) ctx.user = {id: "test-user-id"};
  
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

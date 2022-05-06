import Koa from "koa";
import parse from "co-body";

type Middleware = (ctx: Koa.Context, next: () => Promise<any>) => void;

const bodyParser: Middleware = async (ctx, next) => {
  ctx.body = await parse(ctx);
  next();
};

const Middleware = {
  bodyParser,
};

export default Middleware;

import Koa from "koa";
import "dotenv/config";
import KoaRouter from "koa-router";

/**
 * Start api and bind port;
 */
export const startApp = (app: Koa) => {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);
  });
};

/** Wraps response data in a response object */
export function wrapResponseData<T>(data: T) {
  return { data };
}

type ContextAddon = { user?: { id: string }, request: { body?: any } };
export type RouterContext = Koa.Context & ContextAddon;

/** Custom router */
export class Router extends KoaRouter<any, ContextAddon> {}


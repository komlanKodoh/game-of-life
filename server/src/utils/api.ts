import Koa from "koa";
import "dotenv/config";

/**
 * Start api and bind port;
 */
export const startApp = (app: Koa) => {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port : ${process.env.PORT}`);
  });
};

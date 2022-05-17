import Koa from "koa";
import "dotenv/config";

/**
 * Start api and bind port;
 */
export const startApp = (app: Koa) => {
  const PORT = process.env.PORT || 3000 ;

  app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);
  });

};

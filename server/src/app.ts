import Koa from "koa";
import utils from "./utils";
import Config from "./config";
import serve from "koa-static";
import Router from "koa-router";
import Logger from "koa-logger";
import Auth from "./routes/auth";
import User from "./routes/user";
import Middleware from "./middlewares";
import Ecosystem from "./routes/ecosystem";
import HealthCheck from "./routes/health-check";
import ErrorHandler from "./error/error.register";

const app = new Koa();
const apiRouter = new Router({ prefix: "/api" });

ErrorHandler.Register(app);

apiRouter
  .use(Middleware.bodyParser)

  .use("/user", User.Routes)
  .use("/auth", Auth.Routes)
  .use("/ecosystem", Ecosystem.Routes);

app
  .use(Logger())
  .use(apiRouter.routes())
  .use(HealthCheck.Routes)
  .use(serve(Config.PUBLIC_DIR));

utils.api.startApp(app);

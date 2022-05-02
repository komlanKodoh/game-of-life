

import Koa from "koa";
import Router from "koa-router";
import ErrorHandler from "./error/error.register";
import Auth from "./routes/auth/auth.register";
import utils from "./utils";

const app = new Koa();

ErrorHandler.Register(app);

const router = new Router();


Auth.RegisterRoutes(router, "/auth" )



app.use(router.routes());

utils.api.startApp(app);


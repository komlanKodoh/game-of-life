

import Koa from "koa";
import utils from "./utils";
import Config from "./config";
import serve from "koa-static";
import Router from "koa-router";
import Auth from "./routes/auth/auth.register";
import ErrorHandler from "./error/error.register";
import User from "./routes/user/user.register";

const app = new Koa();
const apiRouter = new Router({
    prefix: "/api"
});

ErrorHandler.Register(app);

Auth.RegisterRoutes(apiRouter, "/auth" );
User.RegisterRoutes(apiRouter, "/user");



app.use(apiRouter.routes());
app.use(serve(Config.PUBLIC_DIR));

utils.api.startApp(app);


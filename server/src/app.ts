

import Koa from "koa";
import utils from "./utils";
import Config from "./config";
import serve from "koa-static";
import Router from "koa-router";
import Auth from "./routes/auth/auth.register";
import ErrorHandler from "./error/error.register";

const app = new Koa();

ErrorHandler.Register(app);


app.use(serve(Config.PUBLIC_DIR));

const router = new Router();
Auth.RegisterRoutes(router, "/auth" )




app.use(router.routes());
utils.api.startApp(app);


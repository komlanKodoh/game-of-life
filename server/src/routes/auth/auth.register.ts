
import Router from "koa-router";
import router from "./auth.routes";

const RegisterRoutes = (appRouter: Router, path: string) => {
    appRouter.use(path, router.routes());
};

const Auth = {
  RegisterRoutes,
};

export default Auth;

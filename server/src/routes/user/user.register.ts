import Router from "koa-router";
import router from "./user.routes";

const RegisterRoutes = (appRouter: Router, path: string) => {
    appRouter.use(path, router.routes());
};

const User = {
  RegisterRoutes,
};

export default User;

import Router from "koa-router";
import * as UserService from "./user.service";

const router = new Router();

router.post("/", (ctx) => {
  let credentials = ctx.body.user;
  UserService.createUser(credentials);
});

router.put("/", (ctx) => {
  let credentials = ctx.body.user ;
  let newCredentials = ctx.body.newUser;

  UserService.updateUser(credentials,newCredentials );
})

export default router.routes();

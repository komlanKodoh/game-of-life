
import Router from "koa-router";

const router = new Router();

router.get("/", (ctx) => {
  ctx.body = {
    token: "Some random cool json ",
  };
});

export default router;
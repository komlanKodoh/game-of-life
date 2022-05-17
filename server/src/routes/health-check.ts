import Router from "koa-router";

const router = new Router();

router.all("/health-check", (ctx ) => {
    ctx.status  = 200;
    ctx.body = "healthy";
});

const HealthCheck = {
  Routes: router.routes(),
};

export default HealthCheck;

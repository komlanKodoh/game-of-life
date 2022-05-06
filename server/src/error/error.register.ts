
import Koa from "koa";

export interface ApiError {
  status: number;
  message: string;
  details?: any;
}

const Register = (app: Koa) => {
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = (err as ApiError).status || 500;
      ctx.body = (err as ApiError).message;
      ctx.app.emit("error", err, ctx);
    }
  });

  app.on("error", (err, ctx) => {
    ctx.body = {
      error: {
        message: err.message,
        status: "CAPITAL_CODE",
        timestamp: new Date().toISOString(),
      },
    };
  });
};

const ErrorHandler = {
  Register,
};

export default ErrorHandler;

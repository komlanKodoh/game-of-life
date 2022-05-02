import Koa from "koa";

interface ApiError  { status : number, message: string }

const Register = (app: Koa) => {
    app.use(async (ctx, next) => {
        try {
          await next();
        } catch (err) {
          ctx.status = ( err as ApiError ).status || 500;
          ctx.body = (err as ApiError ).message;
          ctx.app.emit('error', err, ctx);
        }
      });
      
      app.on('error', (err, ctx) => {

        console.log ( err, ctx )
      });
};

const ErrorHandler = {
    Register
}

export default ErrorHandler ;
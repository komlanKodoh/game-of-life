
import Router from 'koa-router';

const router = new Router();

router.get('/token', (ctx) => {
    ctx.body = {
        token: "Some random cool json ",
    }
} )


export default router;
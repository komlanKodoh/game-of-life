import { Ecosystem, EcosystemRepository } from './Ecosystem';

import utils from "../../utils";
import Middleware from '../../middlewares';
import { BadRequestError, InvalidCredentialError } from '../../error/CustomErrors';

const router = new utils.api.Router();

router.get("/", async (ctx) => {
    let limit = ctx.query.limit || 15;
    // let page = ctx.query.page || 1;

    if ( typeof limit !== "number" ) throw BadRequestError("limit must be an integer"); 

    ctx.body = await EcosystemRepository.scan({public: true }).limit(limit).exec();
})

router.use(Middleware.requireUser);
    
router.post("/", (ctx) => { 
    const ecosystem: Omit < Ecosystem, "id" | "owner_id" > = ctx.body.ecosystem;

    EcosystemRepository.create({
        ...ecosystem,
        owner_id: (ctx.user as { id: string }).id,
        id: utils.getUUID()
    })
});

router.get("/mine", async (ctx) => {
    let limit = ctx.query.limit || 15;
    // let page = ctx.query.page || 1;

    if( ! ctx.user ) throw InvalidCredentialError();
    if ( typeof limit !== "number" ) throw BadRequestError("limit must be an integer"); 

    ctx.body = await EcosystemRepository.scan({owner_id: ctx.user.id }).limit(limit).exec();
})

export default router.routes();
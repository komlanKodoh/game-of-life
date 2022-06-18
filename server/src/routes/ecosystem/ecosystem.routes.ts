import { Ecosystem, EcosystemRepository } from "./Ecosystem";

import utils from "../../utils";
import Middleware from "../../middlewares";
import {
  BadRequestError,
  InvalidCredentialError,
  NotFoundError,
} from "../../error/CustomErrors";

const router = new utils.api.Router();

router.get("/", async (ctx) => {
  let limit = ctx.query.limit || 15;
  // let page = ctx.query.page || 1;

  if (typeof limit !== "number")
    throw BadRequestError("limit must be an integer");

  const filter: { [key: string]: string | boolean } = { public: true };
  if (ctx.query.name) filter.name = ctx.query.name as string;

  ctx.body = await EcosystemRepository.scan(filter)
    .limit(limit)
    .exec();
});

router.get("/unique/:name", async (ctx) => {
  let name = ctx.params.name as string;
  let user = ctx.user;

  let ecosystem = (await EcosystemRepository.query({ name }).exec())[0];

  if ( !ecosystem ) throw NotFoundError("Ecosystem with given name does not exist");

  console.log( ecosystem.owner_id, user?.id)
  if ( ecosystem.public === false && (!user || ecosystem.owner_id !== user.id )) throw InvalidCredentialError("Ecosystem is private and user does not have necessary permission");

  ctx.body = ecosystem;
});



router.use(Middleware.requireUser);

router.post("/", async (ctx) => {
  const ecosystem: Omit<Ecosystem, "owner_id"> = ctx.request.body.ecosystem;

  await EcosystemRepository.create({
    ...ecosystem,
    owner_id: (ctx.user as { id: string }).id,
  });
});

router.get("/mine", async (ctx) => {
  let limit = ctx.query.limit || 15;

  if (!ctx.user) throw InvalidCredentialError();
  if (typeof limit !== "number")
    throw BadRequestError("limit must be an integer");

  const filter: { [key: string]: string } = { owner_id: ctx.user.id };
  if (ctx.query.name) filter.name = ctx.query.name as string;

  ctx.body = await EcosystemRepository.scan(filter).limit(limit).exec();
});

export default router.routes();

import { Ecosystem, EcosystemRepository } from "./Ecosystem";

import utils from "../../utils";
import Middleware from "../../middlewares";
import {
  BadRequestError,
  InvalidCredentialError,
  NotFoundError,
} from "../../error/CustomErrors";
import { createEcosystem } from "./ecosystem.service";

const router = new utils.api.Router();

router.get("/", async (ctx) => {
  let limit = +(ctx.query.limit || 15);
  let startAt = ctx.query.startAt;

  const filter: { [key: string]: string | boolean } = { public: true };

  let query = EcosystemRepository.scan(filter).limit(limit);

  startAt && query.startAt({ id: startAt });

  ctx.body = await query.exec();
});

router.get("/unique/:id", async (ctx) => {
  let id = ctx.params.id as string;
  let user = ctx.user;

  let ecosystem = (await EcosystemRepository.query({ id }).exec())[0];

  if (!ecosystem) throw NotFoundError("Ecosystem with given id does not exist");

  if (ecosystem.public === false && (!user || ecosystem.owner_id !== user.id))
    throw InvalidCredentialError(
      "Ecosystem is private and user does not have necessary permission"
    );

  ctx.body = ecosystem;
});

router.use(Middleware.requireUser);

router.post("/", async (ctx) => {
  const ecosystem: Omit<Ecosystem, "owner_id"> = ctx.request.body.ecosystem;

  await createEcosystem((ctx.user as { id: string }).id, ecosystem);
});

router.put("/", async (ctx) => {
  const ecosystem: Ecosystem = ctx.request.body.ecosystem;
  const savedEcosystem: Ecosystem | undefined = 
  ( await EcosystemRepository.query({ id: ecosystem.id }).exec()
  )[0];

  if (! savedEcosystem) throw NotFoundError("Can't update: Ecosystem does not exist");
  
  if (!ctx.user || savedEcosystem.owner_id !== ctx.user.id)
    throw InvalidCredentialError();

  delete ecosystem.createdAt;
  delete ecosystem.updatedAt;

  await EcosystemRepository.update(ecosystem);
});

router.get("/mine", async (ctx) => {
  let limit = ctx.query.limit || 15;

  if (!ctx.user) throw InvalidCredentialError();
  if (typeof limit !== "number")
    throw BadRequestError("limit must be an integer");

  const filter: { [key: string]: string } = { owner_id: ctx.user.id };
  if (ctx.query.id) filter.id = ctx.query.id as string;

  ctx.body = await EcosystemRepository.scan(filter).limit(limit).exec();
});

export default router.routes();

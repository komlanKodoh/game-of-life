
import { BadRequestError, InvalidCredentialError, NotFoundError } from "../../error/CustomErrors";
import utils from "../../utils";
import { User, UserRepository } from "./User";
import * as UserService from "./user.service";

const router = new utils.api.Router();

router.post("/", async (ctx) => {
  let credentials = ctx.body.user;
  await UserService.createUser(credentials);
});

router.put("/", async (ctx) => {
  let credentials = ctx.body.user ;
  let newCredentials = ctx.body.newUser;

  await UserService.updateUser(credentials,newCredentials );
})

router.get("/:id", async (ctx) => {
  let userId = ctx.params.id;

  if ( !userId ){
    if ( !userId )  throw BadRequestError("User Id not provided");
  };

  const user = (await UserRepository.query("id").eq(userId).exec())[0];

  if ( !user) throw NotFoundError("User with given id does not exist");

  ctx.body = {
    id: user.id,
    username: user.username
  };
  
})

router.get("/", async (ctx) => {
  if ( !ctx.user ) throw InvalidCredentialError("User token missing or invalid");

  const user = (await UserRepository.query("id").eq(ctx.user.id).exec())[0] as User;

  ctx.body = {
    id: user.id,
    username: user.username
  }
})

export default router.routes();

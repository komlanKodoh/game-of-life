
const Config = {
  PUBLIC_DIR: process.env.PUBLIC_DIR || "",

  USER_TABLE : "game-of-life-users",
  ECOSYSTEM_TABLE : "game-of-life-ecosystems",

  HASH_STRENGTH: 14,

  JWT_VALIDITY_TIME: "1h",
  JWT_SECRET_KEY: "Some random shit",
  REFRESH_TOKEN_VALIDITY_TIME: "30d",
  REFRESH_TOKEN_COOKIE_NAME: "RefreshToken",
};

export default Config;


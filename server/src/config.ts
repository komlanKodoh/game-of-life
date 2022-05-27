import dynamoose from 'dynamoose';

const Config = {
  PUBLIC_DIR: process.env.PUBLIC_DIR || "/game-of-life/public/",

  USER_TABLE : "game-of-life-users",
  ECOSYSTEM_TABLE : "game-of-life-ecosystems",

  HASH_STRENGTH: 14,

  JWT_VALIDITY_TIME: "1h",
  JWT_SECRET_KEY: "Some random shit",
  REFRESH_TOKEN_VALIDITY_TIME: "30d",
  REFRESH_TOKEN_COOKIE_NAME: "RefreshToken",

  isDev: () => process.env.ENVIRONMENT === "DEV"
};


/** AWS Dynamo db configuration */
if ( Config.isDev() ) dynamoose.aws.ddb.local("http://dynamodb-local:3500");

dynamoose.aws.sdk.config.update({
  "region": process.env.AWS_REGION,
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID ,
  "secretAccessKey": process.env.AWS_ACCESS_KEY_SECRET ,
});


export default Config;


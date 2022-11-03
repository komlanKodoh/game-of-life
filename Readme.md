# Env required for container

```
AWS_ACCESS_KEY_ID #Access id of the secret key for dynamodb databse connection
AWS_ACCESS_KEY_SECRET #Secret access key for dynamodb database the cotaiener uses
AWS_REGION #AWS region of the dynamodb database the container uses

PORT #The port inside the countainer the server should listen to
PUBLIC_DIR #The directory containing the public files. This shoudl be the same as the target of the angular build
```

# Run 

```cmd
./cmd/build.sh && docker compose up
```

The container uses the temporary database int the docker network for developpement purposes

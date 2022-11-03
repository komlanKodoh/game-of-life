
#!/bin/bash

cd "$(dirname "$0")"

docker run -d -p 3500:8000 amazon/dynamodb-local
npm run dev

echo "Done";
const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/productRoutes')

const app = express();
const Port = 5000;
app.use(cors());

app.use(express.json());

app.use('/products', productRouter)

app.listen(Port, () => console.log(`Port: ${Port}`));

/*
docker build -f Dockerfile -t bff .
docker run -d -p 5000:5000 --name bff \
--env PRODUCT_API_URL=http://host.docker.internal:4000 bff

docker run -it -p 5000:5000 --name bff \
--env PRODUCT_API_URL=http://host.docker.internal:4000 --entrypoint "/bin/bash" bff

*/

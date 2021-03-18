const express = require('express');

const productRouter = require('./routes/productRoutes')

const app = express();
const Port = 5000;


app.use(express.json());

app.use('/products', productRouter)

app.listen(Port, () => console.log(`Port: ${Port}`));
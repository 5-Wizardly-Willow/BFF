const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/productRoutes')

const app = express();
const Port = 5000;
app.use(cors());

app.use(express.json());

app.use('/products', productRouter)

app.listen(Port, () => console.log(`Port: ${Port}`));
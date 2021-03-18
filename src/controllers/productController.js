const axios = require("axios");

exports.getProductInformation = async (req, res, next) => {
  // call product by id to get the product data

  // call the product styles to get the styles of the current product

  // call the related products route

  // combine data together and try to respect the legacy data contract 
  

  try {
    const url = `http://localhost:4000/products/${req.params.product_id}`;

    const data = await axios.get(url);
    console.log(data);
    res.status(200).json({ status : 'success' , data : data.data });
    } catch (err) {
    console.log(err);

      res.status(500).json({ error : err });
    }
};


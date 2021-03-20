const axios = require('axios');

exports.getProductInformation = async (req, res, next) => {
  // call product by id to get the product data

  // call the product styles to get the styles of the current product

  // call the related products route

  // combine data together and try to respect the legacy data contract

  try {
    const baseUrl = 'http://localhost:4000/products';
    const productByIdUrl = `${baseUrl}/${req.params.product_id}`;
    const productStylesUrl = `${productByIdUrl}/styles`;
    const relatedProductsUrl = `${productByIdUrl}/related`;

    const productData  = await axios.get(productByIdUrl);
    const  stylesData  = await axios.get(productStylesUrl);
    const  relatedData  = await axios.get(relatedProductsUrl);
   
    res.status(200).json({
      status: 'success',
      data: {
        productData : productData.data.data,
        stylesData : stylesData.data.data,
        relatedData : relatedData.data.data,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err });
  }
};

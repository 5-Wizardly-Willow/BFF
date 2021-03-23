const axios = require('axios');
const Cache = require('lru-cache');

const cachedProducts = new Cache({
  max: 1000,
  maxAge: 1000 * 15,
});

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
    /*
    const productData  = await axios.get(productByIdUrl);
    const  stylesData  = await axios.get(productStylesUrl);
    const  relatedData  = await axios.get(relatedProductsUrl);
*/
    let data = cachedProducts.get(req.params.product_id);

    if (!data) {
      const [productData, stylesData, relatedData] = await Promise.all([
        axios.get(productByIdUrl),
        axios.get(productStylesUrl),
        axios.get(relatedProductsUrl),
      ]);

      data = {
        productData: productData.data.data,
        stylesData: stylesData.data.data,
        relatedData: relatedData.data.data,
      };
      cachedProducts.set(req.params.product_id, data);
    } else {
      console.log('cachedProducts cache hit');
    }

    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const baseUrl = 'http://localhost:4000/products';
    const productByIdUrl = `${baseUrl}/${req.params.product_id}`;

    let data = cachedProducts.get(req.params.product_id);

    if (!data) {
      data = await axios.get(productByIdUrl);

      cachedProducts.set(req.params.product_id, data);
    } else {
      console.log('cachedProducts cache hit');
    }
    res.status(200).json({
      ...data.data.data,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err });
  }
};

import {
  createMultipleProducts,
  createProduct,
  deleteProduct,
  findProductById,
  getAllProducts,
  updateProduct,
} from "../services/product-service";

export const createProductForUser = async (req, res) => {
  try {
    const product = await createProduct(req.body);

    return res.status(201).send(product);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const deleteProductForUser = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await deleteProduct(productId);

    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const updateProductForUser = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await updateProduct(productId, req.body);

    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const findProductByIdForUser = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await findProductById(productId);

    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const getAllProductsForUser = async (req, res) => {
  try {
    const products = await getAllProducts(req.query);

    return res.status(200).send(products);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export const createMultipleProductsForUser = async (req, res) => {
  try {
    const product = await createMultipleProducts(req.body);

    return res.status(200).send({ message: "Products Created Successfully." });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

import {
  createMultipleProducts,
  createProduct,
  deleteProduct,
  findProductById,
  getAllProducts,
  searchProducts,
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

export const searchProductsForUser = async (req, res) => {
  try {
    const { q: searchQuery } = req.query;

    const products = await searchProducts(searchQuery);

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const searchProductsWithFiltersForUser = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;

    const filters = {
      search,
      category,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    const products = await productService.searchProductsWithFilters(filters);

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
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

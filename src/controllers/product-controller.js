import {
  createMultipleProducts,
  createProduct,
  deleteProduct,
  findProductById,
  getAllProducts,
  getProductsForHome,
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

export const getHomeProductsForUser = async (req, res) => {
  const categories = [
    { name: "Men's Sweaters", id: "men_sweaters" },
    { name: "Dresses", id: "women_dresses" },
    { name: "Men's Cargos", id: "men_cargos" },
    { name: "Tops", id: "women_tops" },
    { name: "Oversized T-shirts", id: "men_oversized_tshirts" },
    { name: "Women's Sweaters", id: "women_sweaters" },
    { name: "Sneakers", id: "sneakers" },
  ];
  const limit = 9;

  try {
    const allProducts = [];
    for (const category of categories) {
      const products = await getProductsForHome(category, limit);
      allProducts.push(products);
    }
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get products" });
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

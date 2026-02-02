import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const createProduct = async (productData) => {
  let topLevel = await Category.findOne({
    name: productData.topLevelCategory,
  });

  if (!topLevel) {
    topLevel = new Category({
      name: productData.topLevelCategory,
      level: 1,
    });

    await topLevel.save();
  }

  let secondLevel = await Category.findOne({
    name: productData.secondLevelCategory,
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: productData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });

    await secondLevel.save();
  }
  const product = new Product({
    title: productData.title,
    price: productData.price,
    discountedPrice: productData.discountedPrice,
    discountPercent: productData.discountPercent,
    quantity: productData.quantity,
    color: productData.color,
    sizes: productData.sizes,
    imageUrl: productData.imageUrl,
    samplePics: productData.samplePics,
    category: secondLevel._id,
  });

  return await product.save();
};

export const deleteProduct = async (productId) => {
  const product = await findProductById(productId);

  await Product.findByIdAndDelete(product._id);

  return {
    mesage: "Product Deleted Successfully",
    deletedProductId: product._id,
  };
};

export const updateProduct = async (productId, productData) => {
  return await Product.findByIdAndUpdate(productId, productData);
};

export const findProductById = async (productId) => {
  const product = await Product.findById(productId).populate("category").exec();

  if (!product) {
    throw new Error(`No Product Found With Id ${productId}`);
  }

  return product;
};

export const getAllProducts = async (reqQuery) => {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = pageSize || 10;

  let query = Product.find().populate("category");

  if (category && category !== "undefined") {
    const existsCategory = await Category.findOne({ name: category });

    if (existsCategory) {
      query = query.where("category").equals(existsCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase()),
    );

    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

    query = query.where("color").regex(colorRegex);
  }

  if (sizes) {
    const sizesSet = new Set(sizes.split(","));

    query = query.where("sizes.name").in([...sizesSet]);
  }

  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
    query = query.where("discountPercent").gte(minDiscount);
  }

  if (sort) {
    if (sort === "popularity") {
      query = query.sort({ $natural: 1 });
    } else {
      const sortDirection = sort === "price_high" ? -1 : 1;

      query = query.sort({ discountedPrice: sortDirection });
    }
  }

  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").lt(1);
    }
  }

  const totalProducts = await Product.countDocuments(query);

  const skip = (pageNumber - 1) * pageSize;

  query = query.skip(skip).limit(pageSize);

  const finalProducts = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);

  return {
    content: finalProducts,
    currentPage: pageNumber,
    totalProducts,
    totalPages,
  };
};

export const getProductsForHome = async (category, limit) => {
  try {
    const existingCategory = await Category.findOne({ name: category.id });

    const products = await Product.find({ category: existingCategory._id })
      .limit(limit)
      .select("title imageUrl price discountedPrice discountPercent _id");

    const homeProduct = {
      section: category,
      content: products,
    };

    return homeProduct;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get products by category");
  }
};

export const searchProducts = async (searchQuery) => {
  try {
    const query = {};

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");

      query.$or = [{ title: searchRegex }, { "category.name": searchRegex }];
    }

    const products = await Product.find(query)
      .select("title imageUrl category _id")
      .populate("category", "name")
      .limit(10)
      .lean();

    return products.map((product) => ({
      id: product._id,
      name: product.title,
      category: product.category.name,
      imageUrl: product.imageUrl,
    }));
  } catch (error) {
    throw new Error(`Error searching products: ${error.message}`);
  }
};

export const searchProductsWithFilters = async (filters) => {
  try {
    const { search, category, minPrice, maxPrice } = filters;
    const query = {};

    if (search) {
      query.title = new RegExp(search, "i");
    }

    if (category) {
      query.category = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    const products = await Product.find(query)
      .select("title imageUrl category _id")
      .populate("category", "name")
      .limit(10)
      .lean();

    return products.map((product) => ({
      id: product._id,
      name: product.title,
      category: product.category?.name || "Uncategorized",
      imageUrl: product.imageUrl,
    }));
  } catch (error) {
    throw new Error(`Error searching products with filters: ${error.message}`);
  }
};

export const createMultipleProducts = async (products) => {
  for (let product of products) {
    await createProduct(product);
  }
};

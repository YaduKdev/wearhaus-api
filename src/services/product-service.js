import Category from "../models/Category";
import Product from "../models/Product";

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

  return "Product Deleted Successfully";
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

  if (category) {
    const existsCategory = await Category.findOne({ name: category });

    if (existsCategory) {
      query = query.where("category").equals(existsCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );

    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

    query = query.where("color").regex(colorRegex);
  }

  if (sizes) {
    const sizesSet = new Set(sizes);

    query = query.where("sizes.name").in([...sizesSet]);
  }

  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
    query = query.where("discountPercent").gte(minDiscount);
  }

  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;

    query = query.sort({ discountedPrice: sortDirection });
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

  return { content: finalProducts, currentPage: pageNumber, totalPages };
};

export const createMultipleProducts = async (products) => {
  for (let product of products) {
    await createProduct(product);
  }
};

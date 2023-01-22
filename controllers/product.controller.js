import { validationResult } from "express-validator";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  console.log(req.body)
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

export const getProducts = (req, res) => {
  return res.json(req.Product);
}
export const createProduct = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const product = new Product(req.body);
  try {
    const pro = await product.save();
    res.json({ pro });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
  //   product.save((err, Product) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: err,
  //       });
  //     }
  //     res.json({ Product });
  //   });
};

export const getSingleProduct = async (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Product Not found",
      });
    }
    req.Product = product;
    next();
  });
};

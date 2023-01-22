import { validationResult } from "express-validator";
import Cart from "../models/cart.model.js";

export const getUserCartItems = async (req, res) => {
  console.log(req.body);
  return res.status(200).json({
    ok: "ok",
  });
  try {
    // Cart.findById()
  } catch (error) {}
};

// export const getCartItems = (req, res) => {
//   return res.json(req.Cart);
// };

export const getSingleUserCartItems = (req, res, next, id) => {
  //   console.log(id);
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

export const createCartItem = async (req, res) => {
  // console.log(req.body);
//   return res.status(200).json({
//     ok: "ok",
//   });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const cartBody = {
    user_id : req.body.user,
    product_id : req.body.user
  }
  const cartItems = new Cart(req.body);
  try {
    const pro = await product.save();
    res.json({ pro });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

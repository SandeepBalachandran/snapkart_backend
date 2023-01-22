import User from "../models/user.model.js";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

export const signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Unable to create the user account",
      });
    }
    res.json({
      name: user.firstname,
      email: user.email,
      id: user._id,
    });
  });
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(402).json({
        error: "Invalid username and password",
      });
    }

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "2h",
    });

    // put token into cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // send response to frontend
    const { _id, firstname, email } = user;
    return res.json({ token, user: { _id, firstname, email } });
  });
};

export const validateToken = (req, res,next) => {
  const jwtSecretKey = process.env.SECRET;
  try {
    const auth = req.header('Authorization');
    const [,token] = auth.split(' ')
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      next()
    } else {
      // Access Denied
      return res.status(403).json({
        error: "Access Denied",
      });
    }
  } catch (error) {
    // Access Denied
    return res.status(401).json({
      error: "Access Denieddddd",
    });;
  }
};

// export const isSignedIn = expressJwt.({
//   secret: process.env.SECRET,
//   userProperty: "Authorization",
// });

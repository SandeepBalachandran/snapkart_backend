// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import productsRoute from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import cartRoutes from './routes/cart.route.js'
import cors from "cors";
import bodyParser from "body-parser";
import path from 'path';
import {fileURLToPath} from 'url';
dotenv.config();

const app = express();

//DB Connections

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("DATABASE OOPS: " + err.message);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Setting static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/public", express.static(__dirname + '/public'));

//Routes
app.use("/api", productsRoute);
app.use("/api", authRoutes);
app.use("/api", cartRoutes);

//PORT
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});

export default app;

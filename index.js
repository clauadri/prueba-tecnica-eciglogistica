const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const server = express();
const connectDb = require('./src/utils/db')
const indexRoutes = require('./src/api/index/index.routes')
const userRoutes = require('./src/api/user/user.routes')
const productRoutes = require('./src/api/products/products.routes')
connectDb();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/', indexRoutes);
server.use('/user', userRoutes);
server.use('/product', productRoutes);

server.use((error, req, res, next) => {
  return res
      .status(error.status || 500)
      .json(error.message || "Unexpected error");
});

server.listen(PORT, () => {
  console.log(`El servidor se ha iniciado en http://localhost:${PORT}`);
});
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productschema = new Schema(
  {
    name: { type: String, required: true },
    variaciones: { type: String, required: true },
    observaciones: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('products', productschema)

module.exports = Product

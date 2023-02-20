const express = require('express')
const router = express.Router()
const Product = require('./products.model')
const { isAuth } = require('../../middleware/auth')

router.get('/', async (req, res) => {
  try {
    const allProducts = await Product.find().populate('variaciones')
    return res.status(200).json(allProducts)
  } catch (error) {
    return res.status(500).json('Error getting products', error)
  }
})
router.get('/id/:id', async (req, res) => {
  try {
    const id = req.params.id
    const productById = await Product.findById(id)
    return res.status(200).json(productById)
  } catch (error) {
    return res.status(500).json('No se a podido encontrar el producto por id', error)
  }
})
router.post('/create', async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    const createdProduct = await newProduct.save()
    return res.status(201).json(createdProduct)
  } catch (error) {
    return 'Error al crear el producto', error
  }
})
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Product.findByIdAndDelete(id)
    return res.status(200).json('Se ha borrado correctamente el producto')
  } catch (error) {
    return res.status(500).json('Error al borrar el producto')
  }
})

router.put('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id
    const product = req.body
    const editProduct = new Product(product)
    editProduct._id = id
    const productUpdated = await Product.findByIdAndUpdate(
      id,
      editProduct
    )
    return res
      .status(200)
      .json({
        mensaje: 'Se ha conseguido editar el producto',
        productModified: productUpdated
      })
  } catch (error) {
    return res.status(500).json('Error al editar el producto')
  }
})

module.exports = router

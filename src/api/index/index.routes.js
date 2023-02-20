const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  return res.status(200).json('SERVIDOR OK, RUTA INDEX PRINCIPAL')
})

module.exports = router

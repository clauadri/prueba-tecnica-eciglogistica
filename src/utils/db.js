const mongoose = require('mongoose')
require('dotenv').config()

const DB_URL = process.env.DB_URL

const connectDb = async () => {
  try {
    const db = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const { name, host } = db.connection
    console.log(`Todo ha ido bien y estoy conectado a la base de datos ${name} en el host ${host}`)
  } catch (error) {
    console.log('No he podido conectarme a la base de datos', error)
  }
}

module.exports = connectDb

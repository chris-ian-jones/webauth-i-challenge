const express = require('express')

const Auth = require('./auth-model.js')

const router = express.Router()

router.get('/register', (req, res) => {
  res.status(200).json('endpoint for register')
})

module.exports = router
// lib/routes/hello.js
const express = require('express')
const router = express.Router()
const { getMessage, setMessage } = require('../controller/hello')

// Middleware to log requests (optional but recommended)
router.use((req, res, next) => {
  console.log(`Hello Route ${Date.now()} ${req.method} ${req.url}`)
  next()
})

// Define routes
router.get('/message', getMessage)
router.post('/message', setMessage)

module.exports = router

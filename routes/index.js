const path = require('path')
const router = require('express').Router()
const apiRoutes = require('./api')
const testRoutes = require('./test')
const authRoutes = require('./auth')

// // API Routes
router.use('/api', apiRoutes)
router.use('/auth', authRoutes)
router.use('/test', testRoutes)

// If no API routes are hit, send the React app
router.get('*', function (req, res) {
  console.log(req.path, 'Serving React...')
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

module.exports = router

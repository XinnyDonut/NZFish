const fishRouter = require('express').Router()

fishRouter.get('/', (req, res) => {
  res.json({ message: 'Get all fish' })
})

fishRouter.get('/:id', (req, res) => {
  res.json({ message: `Get fish ${req.params.id}` })
})

fishRouter.post('/', (req, res) => {
  res.json({ message: 'Create fish', data: req.body })
})

module.exports = fishRouter
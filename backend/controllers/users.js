const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body

  if (!username || !password) {
    res.status(400).send({ error: 'missing username or password' })
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const returnedUser = await user.save()

  res.json(returnedUser)
})

usersRouter.get('/', async (req, res) => {
  const userList = await User.find({})

  res.json(userList)
})

module.exports = usersRouter
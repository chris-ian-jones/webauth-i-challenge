const express = require('express')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const Users = require('./auth-model.js')
const restricted = require('./../middleware')
const dbConnection = require('./../data/db-config')

const sessionConfig = {
  name: 'chocochip', // 'sid' is default (change it) 
  secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 60 * 60, // in milliseconds
    secure: false, // true means only send cookie over https (should be true in production)
    httpOnly: true, // true means JS has no access to the cookie
  },
  resave: false,
  saveUninitialized: true, // GDPR compliance
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: 'knexsessions',
    sidfieldname: 'sessionid',
    createtable: true,
    clearInterval: 1000 * 60 * 30, // (in ms) clean out expired session data
  })
}

const router = express.Router()
router.use(session(sessionConfig))

router.post('/register', (req, res) => {
  let {username, password} = req.body;
  const hash = bcrypt.hashSync(password, 8)

  Users.add({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user.id
        console.log(req.session)
        res.status(200).json({ message: `Logged in` })
      } else {
        res.status(401).json({ message: 'You shall not pass!' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.get('/users', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err))
})

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(error => {
      if(error) {
        res
          .status(500)
          .json({
            message:
              'Unable to logout'
          })
      } else {
        res.status(200).json({ message: 'Logged Out' })
      }
    })
  } else {
    res.status(200).json({ message: 'You are already logged out'})
  }
})

module.exports = router
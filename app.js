const express = require('express')
const app = express()
const port = 3000
const db = require('./models')

const exphbsHelper = require('./handlebars-helpers.js')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(flash())

// 設定 bodyparser
app.use(bodyParser.urlencoded({ extended: true }))

// 使用 session and passport
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/record', require('./routes/record'))
app.use('/auth', require('./routes/auth.js'))

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`app is running on ${port}`)
})
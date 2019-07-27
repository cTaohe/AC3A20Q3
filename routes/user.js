const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2} = req.body
  let errors = []
  
  if (!email || !password || !password2) {
    errors.push({ message: '信箱、密碼為必要資訊'})
  }
  if (password !== password2) {
    errors.push({ message: '密碼不一致'})
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ where: {email: email}}).then(user => {
      if (user) {
        errors.push({ message: '信箱已經註冊'})
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        })
      } else {
        const newUser = new User({
          name: name,
          email,
          password
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save().then(user => {
              res.redirect('/')
            })
            .catch(err => console.log(err))
          })
        })
      }
    })
  }
})

// 登出
router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '你已經成功登出了!')
  res.redirect('/users/login')
})

module.exports = router
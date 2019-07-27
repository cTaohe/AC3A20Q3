const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
const { validationResult } = require('express-validator')
const { recordCheck } = require('../valid/valid')
const { authenticated } = require('../config/auth.js')


// 新支出頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

// 檢查 新支出
router.post('/new', authenticated, recordCheck, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) throw new Error("The field must be fill out")

  Record.create({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
    UserId: req.user.id
  })
  .then(record => { return res.redirect('/') })
  .catch(err => res.status(422).json(err))
})

// 編輯頁面
router.get('/:id/edit', authenticated, (req, res) => {

  User.findByPk(req.user.id)
  .then((user) => {
    if (!user) throw new Error("user not found")
    return Record.findOne({
      where: {
        Id: req.params.id,
        UserId: req.user.id,
      }
    })
  })
  .then((record) => { return res.render('edit', { record: record }) }) 
  .catch(err => res.status(422).json(err))
})

// 檢查 編輯
router.put('/:id', authenticated, recordCheck, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) throw new Error("The field must be fill out")
  
  Record.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
  .then( record => {
    record.name = req.body.name,
    record.date = req.body.date,
    record.category = req.body.category,
    record.amount = req.body.amount
    return record.save()
  })
  .then(record => { return res.redirect('/')})
  .catch(error => { return res.status(422).json(error) })
})

// 刪除
router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
  .then(user => {
    if (!user) throw new Error('user not found')

    return Record.destroy({
      where: {
        Id: req.params.id,
        UserId: req.user.id
      }
    })
  })
  .then(record => { return res.redirect('/')})
  .catch(error => { return res.status(422).json(error)})
})

module.exports = router
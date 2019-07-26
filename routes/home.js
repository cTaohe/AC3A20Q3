const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User

const { authenticated } = require('../config/auth.js')

router.get('/', authenticated, (req, res) => {
  // 月份選單
  const monthsHash = {
    '':'全部',
    '1':'一月',
    '2':'二月',
    '3':'三月',
    '4':'四月',
    '5':'五月',
    '6':'六月',
    '7':'七月',
    '8':'八月',
    '9':'九月',
    '10':'十月',
    '11':'十一月',
    '12':'十二月'
  }
  // 分類選單
  const categorysHash = {
    '':'全部',
    'living': '家居物業',
    'traffic': '交通出行',
    'recreation': '休閒娛樂',
    'food': '餐飲食品',
    'other': '其他',
  }
  
  User.findByPk(req.user.id)
  .then(user => {
    if (!user) throw new Error('user not found')

    return Record.findAll({
      where: {userId: req.user.id}
    })
  })
  .then(records => { return res.render('index',{records, monthsHash, categorysHash}) })
  .catch(err => { return res.status(422).json(err) })
})

module.exports = router
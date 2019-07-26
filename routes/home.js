const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
const months = require('../data/date.json').results
const categorys = require('../data/category.json').results
const { authenticated } = require('../config/auth.js')
const sequelize = require('sequelize')
const Op = sequelize.Op

router.get('/', authenticated, (req, res) => {
  const month = req.query.months || ''
  const category = req.query.categorys || ''
  let filter = {}

  if (month === '' && category === '') {
    filter = {
      UserId: req.user.id
    }
  } else if (month === '') {
    filter = {
      UserId: req.user.id,
      category: category
    }
  } else if (category === '') {
    filter = {
      UserId: req.user.id,
      [Op.and]: [
        sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), parseInt(month))
      ]
    }
  } else {
    filter = {
      UserId: req.user.id,
      category: category,
      [Op.and]: [
        sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), parseInt(month))
      ]
    }
  }

  User.findByPk(req.user.id)
  .then(user => {
    if (!user) throw new Error('user not found')

    return Record.findAll({
      where: filter
    })
  })
  .then(records => {
    
    let totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return res.render('index',{records, months, month, categorys, category, totalAmount})
  })
  .catch(err => { return res.status(422).json(err) })
})

module.exports = router
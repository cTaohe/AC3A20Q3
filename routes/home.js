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
  const userName = req.user.name
  let filtermonth = (month === '') ? 
    {} : 
    {date: {[Op.and]: [sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), parseInt(month))]}}
  let filtercategory = (category === '') ? {} : {category: category}

  User.findByPk(req.user.id)
  .then(user => {
    if (!user) throw new Error('user not found')

    return Record.findAll({
      where: {
        UserId: req.user.id,
        ...filtermonth,
        ...filtercategory
      }
    })
  })
  .then(records => {
    
    let totalAmount = records.map(record => record.amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return res.render('index',{userName, records, months, month, categorys, category, totalAmount})
  })
  .catch(err => { return res.status(422).json(err) })
})

module.exports = router
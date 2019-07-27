const { check } = require('express-validator')

let recordCheck = [
  check('name')
    .not().isEmpty().withMessage('名稱需要填寫才知道花在哪唷!'),
  check('date')
    .not().isEmpty().withMessage('請輸入日期!')
    .isISO8601().withMessage('要用西元年唷'),
  check('category')
    .not().isEmpty().withMessage('分類選擇好，錢才能花在刀口上!'),
  check('amount')
    .not().isEmpty().withMessage('沒有支出就沒有花費!')
    .isInt({ min: 1}).withMessage('請填寫金額!')
]

module.exports = {recordCheck}
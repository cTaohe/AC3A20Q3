const Handlebars = require('handlebars')

Handlebars.registerHelper('categoryIcon', (category) => {
  // category icon
  const categoryImage = {
    'living': '<i class="fas fa-home"></i>',
    'traffic': '<i class="fas fa-shuttle-van"></i>',
    'recreation': '<i class="fas fa-grin-beam"></i>',
    'food': '<i class="fas fa-utensils"></i>',
    'other': '<i class="fas fa-pen"></i>'
  }
  // gategory match categoryImage key return value
  return categoryImage[category]
})

Handlebars.registerHelper('pickedOption', (value1, value2, option) => {
  return (value1 === value2)? option : ''
})

Handlebars.registerHelper('pickedDate', (date) => {	
  const MM = (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth()}`)	
  const DD = (date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`)	
  return `${date.getFullYear()}-${MM}-${DD}`	
})
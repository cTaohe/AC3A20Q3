const bcrypt = require('bcryptjs')

const useBcrypt = new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (salt) return resolve(salt)
    return reject(err)
  })
})

const saltPassword = (salt, user) => {
  return new Promise( (resolve, reject) => {
    bcrypt.hash(user, salt, (err, hash) => {
      if (hash) return resolve(hash)
      return reject(err)
    })
  })
}

module.exports = {
   salt: async (user) => {
    const salt = await useBcrypt
    const password = await saltPassword(salt, user)
    return password
  }
}
const joi = require('joi')

const userSchema = joi.object({
name: joi.string().min(3).required(),
email: joi.string().email().required(),
age: joi.number().min(10).max(100).required(),
password: joi.string().min(6).required(),
})

module.exports = userSchema
const Joi = require("joi");
  
  const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
  })

  const addPutSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string()
  })

const addPatchSchema = Joi.object({
    favorite: Joi.boolean().required()
  })

  module.exports = {
    addSchema,
    addPutSchema,
    addPatchSchema
  }
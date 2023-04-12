
const {HttpError} = require('../helpers')

const validateBody = schema => {
    const func = (req, res, next) => {
        const {error} = schema.validate(req.body)

      if(error){
        const errorDetails = error.details[0]
        const errorName = errorDetails.context.label;
        next(HttpError(400, res.json({message: `missing required ${errorName} field`})))
      }
      next()
    }
    return func;
}

module.exports = { 
    validateBody
}
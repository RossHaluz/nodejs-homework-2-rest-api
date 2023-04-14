
const {HttpError} = require('../helpers')

const validateBody = schema => {
    const func = (req, res, next) => {
        const {error} = schema.validate(req.body)
        console.log(req.body)

      if(error){
        const errorDetails = error.details[0]
        const errorName = errorDetails.context.label;
        throw HttpError(400, `missing required ${errorName} field`)
      }
      next()
    }
    return func;
}

module.exports = validateBody;
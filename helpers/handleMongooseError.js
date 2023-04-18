const handleMongooseError = (error, data, naxt) => {
    error.status = 400,
        next()
}

module.exports = handleMongooseError
const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'AxiosError') {
    console.log('AxiosError occured')
    return
  }

  next(error)
}

module.exports = { unknownEndpoint, errorHandler }

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response) => {
  //next) => {
  console.error(error.message)

  if (error.name === 'AxiosError') {
    console.log('AxiosError occured')
    return
  }
  // } else if (error.name === 'ValidationError') {
  //   return response.status(400).json({ error: error.message })
  // }

  // Application Error?

  //next(error)
}

module.exports = { unknownEndpoint, errorHandler }

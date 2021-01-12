const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const authenticationMiddleware = require('./middlewares/authenticationMiddleware');
const schema = require('./graphql')

const app = express()
const port = 3000

app.use('/graphql', authenticationMiddleware, graphqlHTTP({
  schema
}))

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
import { ApolloServer } from 'apollo-server'
import { connect as mongoConnect } from 'mongoose'
import { config as dotEnvConfig } from 'dotenv'
import fs from 'fs'
import User from './models/User'
import Post from './models/Post'
import { resolvers } from './resolvers'

const path = require('path')
const filePath = path.join(__dirname, '../src', './typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')

dotEnvConfig({ path: path.join(__dirname, '../src', 'variables.env') })

mongoConnect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(() => console.log(`DB Connected`))
  .catch(err => console.error('error:', err))

// console.log('Users', User)
// console.log('Posts', Post)
// console.log('Resolvers', resolvers)

var server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
})

server
  .listen(process.env.PORT)
  .then(({ url }) => {
    console.log(`server listening on port ${process.env.PORT}`)
    console.log(`server listening on ${url}`)
  })
  .catch(err => console.error('error:', err))

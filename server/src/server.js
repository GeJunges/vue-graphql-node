import { ApolloServer, AuthenticationError } from 'apollo-server'
import { connect as mongoConnect } from 'mongoose'
import { config as dotEnvConfig } from 'dotenv'
import fs from 'fs'
import User from './models/User'
import Post from './models/Post'
import { resolvers } from './resolvers'
const jwt = require('jsonwebtoken')

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

const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (err) {
      throw new AuthenticationError(
        'Your session has ended. Please sign in again'
      )
    }
  }
}

var server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers['authorization']
    const currentUser = await await getUser(token)
    return { User, Post, currentUser: currentUser }
  }
})

server
  .listen(process.env.PORT)
  .then(({ url }) => {
    console.log(`server listening on port ${process.env.PORT}`)
    console.log(`server listening on ${url}`)
  })
  .catch(err => console.error('error:', err))

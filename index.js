const express = require('express')
const http = require('http')
const cors = require('cors')
// const { createApolloServer } = require('./lib/apollo')
const { transaction, hello } = require('./lib/routes')

const config = require('./config')

if (config.SENTRY_DSN) {
  const Sentry = require('@sentry/node')
  Sentry.init({
    dsn: config.SENTRY_DSN,
    release: require('./package.json').version
  })
}

async function main() {
  const app = express()
  const httpServer = http.createServer(app)

  app.use(express.json())
  app.use(config.transactionPath, cors(), transaction)

  app.use('/hello', cors(), hello)

  // const apolloServer = await createApolloServer(httpServer)
  // app.use(
  //   apolloServer.getMiddleware({ app, path: config.queryPath, cors: true })
  // )

  httpServer.listen({ port: config.port }, () => {
    // console.log(`GraphQL Queries ready at ${apolloServer.graphqlPath}`)
    // console.log(
    //   `GraphQL Subscriptions ready at ${apolloServer.subscriptionsPath}`
    // )
    console.log(`Transaction service ready at ${config.transactionPath}`)
    console.log(`Hello service ready at /hello`)
  })
}

main()

require('dotenv').config()
const secrets = require('./secrets')

const env = process.env.NODE_ENV || 'development'

module.exports = {
  env: env,
  port: process.env.PORT || '4000',
  queryPath: '/',
  frontendURL: 'https://app.lunie.io',
  transactionPath: '/transaction',
  subscriptionPath: '/graphql',
  apollo_engine_api_key: process.env.ENGINE_API_KEY || '',
  enable_cache: process.env.ENABLE_CACHE || false,
  redis_url: process.env.REDIS_URL || '',
  hasura_admin_key:
    secrets.read('HASURA_ADMIN_KEY') || process.env.HASURA_ADMIN_KEY || '',
  hasura_url: process.env.HASURA_URL || 'http://localhost:8080/v1/graphql',
  enableTestnet: process.env.TESTNET === 'true',
  testnetRPC: process.env.TESTNET_RPC_URL || 'ws://localhost:26657/websocket',
  testnetAPI: process.env.TESTNET_API_URL || 'http://localhost:9071',
  SENTRY_DSN: process.env.SENTRY_DSN || '',
  scriptRunnerEndpoint:
    process.env.SCRIPT_RUNNER_ENDPOINT || 'http://localhost:9000',
  scriptRunnerAuthenticationToken:
    process.env.AUTHENTICATION_TOKEN || secrets.read('AUTHENTICATION_TOKEN'),
  pepipostAPIKey:
    process.env.PEPIPOST_API_KEY || secrets.read('PEPIPOST_API_KEY'),
  ethereum: {
    providerURL: process.env.ETH_PROVIDER_URL || 'http://127.0.0.1:8545/', // localhost hardhat node
    contractAddress:
      process.env.HELLO_CONTRACT_ADDRESS ||
      '0x5fbdb2315678afecb367f032d93f642f64180aa3', // taken from `npx hardhat node`
    contractABI: require('./artifacts/contracts/HelloWorld.sol/HelloWorld.json')
      .abi, // Ensure you have the ABI JSON file
    privateKey:
      process.env.ETH_PRIVATE_KEY ||
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' // For transactions - taken from `npx hardhat node`
  }
}

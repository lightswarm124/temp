const hre = require('hardhat')

async function main() {
  const HelloWorld = await hre.ethers.getContractFactory('HelloWorld')
  const hello = await HelloWorld.deploy('Hello, World!')

  await hello.deployed()

  console.log('HelloWorld deployed to:', hello.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

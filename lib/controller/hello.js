// lib/controller/hello.js
const { ethers } = require('ethers')
const config = require('../../config')

// Initialize Ethereum provider and wallet
const provider = new ethers.JsonRpcProvider(config.ethereum.providerURL)
const wallet = new ethers.Wallet(config.ethereum.privateKey, provider)

// Initialize contract instance
const contract = new ethers.Contract(
  config.ethereum.contractAddress,
  config.ethereum.contractABI,
  wallet
)

/**
 * Get the current message from the contract
 */
const getMessage = async (req, res) => {
  try {
    const message = await contract.getMessage()
    res.json({ message })
  } catch (error) {
    console.error('Error fetching message:', error)
    res.status(500).json({ error: 'Failed to fetch message' })
  }
}

/**
 * Set a new message in the contract
 */
const setMessage = async (req, res) => {
  const { newMessage } = req.body

  if (!newMessage) {
    return res.status(400).json({ error: 'newMessage is required' })
  }

  try {
    const tx = await contract.setMessage(newMessage)
    await tx.wait() // Wait for transaction to be mined
    res.json({ status: 'Message updated', transactionHash: tx.hash })
  } catch (error) {
    console.error('Error setting message:', error)
    res.status(500).json({ error: 'Failed to set message' })
  }
}

module.exports = {
  getMessage,
  setMessage
}

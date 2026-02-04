import { ethers } from 'ethers'

// Contract ABI (simplified - you'll need to compile the full contract)
const CONTRACT_ABI = [
  "function createPost(string memory _contentHash, bool _isAnonymous) public returns (uint256)",
  "function validatePost(uint256 _postId, bool _supportsTruth) public",
  "function getPost(uint256 _postId) public view returns (uint256, address, string, uint256, uint256, bool, bool)",
  "function postCount() public view returns (uint256)",
  "event PostCreated(uint256 indexed postId, address indexed author, bool isAnonymous)",
  "event PostValidated(uint256 indexed postId, address indexed validator, bool supportsTruth)",
  "event PostCrystallized(uint256 indexed postId, uint256 validations)"
]

// Polygon Mumbai Testnet
const POLYGON_TESTNET_CONFIG = {
  chainId: '0x13881',
  chainName: 'Polygon Mumbai',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/']
}

// Your deployed contract address (update after deployment)
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_HERE'

export async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('Please install MetaMask to use this feature')
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    })
    
    // Switch to Polygon network
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: POLYGON_TESTNET_CONFIG.chainId }],
      })
    } catch (switchError) {
      // Network not added, let's add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [POLYGON_TESTNET_CONFIG],
        })
      }
    }

    return accounts[0]
  } catch (error) {
    console.error('Error connecting wallet:', error)
    throw error
  }
}

export async function getContract() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('Please install MetaMask')
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
  
  return contract
}

export async function createBlockchainPost(contentHash, isAnonymous) {
  try {
    const contract = await getContract()
    const tx = await contract.createPost(contentHash, isAnonymous)
    const receipt = await tx.wait()
    
    // Get the post ID from the event
    const event = receipt.logs.find(log => log.eventName === 'PostCreated')
    const postId = event.args.postId
    
    return {
      success: true,
      postId: postId.toString(),
      transactionHash: receipt.hash
    }
  } catch (error) {
    console.error('Error creating blockchain post:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export async function validateBlockchainPost(postId, supportsTruth) {
  try {
    const contract = await getContract()
    const tx = await contract.validatePost(postId, supportsTruth)
    const receipt = await tx.wait()
    
    return {
      success: true,
      transactionHash: receipt.hash
    }
  } catch (error) {
    console.error('Error validating post:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export async function getBlockchainPost(postId) {
  try {
    const contract = await getContract()
    const post = await contract.getPost(postId)
    
    return {
      id: post[0].toString(),
      author: post[1],
      contentHash: post[2],
      timestamp: new Date(Number(post[3]) * 1000),
      validations: Number(post[4]),
      isAnonymous: post[5],
      crystallized: post[6]
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}

export async function getTotalPosts() {
  try {
    const contract = await getContract()
    const count = await contract.postCount()
    return Number(count)
  } catch (error) {
    console.error('Error fetching post count:', error)
    return 0
  }
}

// IPFS helper (you'll need to set up Pinata or similar)
export async function uploadToIPFS(content) {
  // This is a placeholder - you'll need to implement actual IPFS upload
  // Using Pinata, Web3.Storage, or similar service
  
  const data = {
    content: content,
    timestamp: new Date().toISOString()
  }
  
  // For now, return a mock hash
  // In production, upload to IPFS and return the real hash
  return 'Qm' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

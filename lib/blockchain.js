import { ethers } from 'ethers'

// Simplified ABI matching your CrystallineGroups.sol
export const CONTRACT_ABI = [
  "function createPost(string memory _contentHash, bool _isAnonymous) public returns (uint256)",
  "function validatePost(uint256 _postId, bool _supportsTruth) public",
  "function getPost(uint256 _postId) public view returns (uint256, address, string, uint256, uint256, bool, bool)",
  "function postCount() public view returns (uint256)",
  "event PostCreated(uint256 indexed postId, address indexed author, bool isAnonymous)"
]

// Polygon Amoy (formerly Mumbai) Config
export const CHAIN_CONFIG = {
  chainId: '0x13882',
  chainName: 'Polygon Amoy',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: ['https://rpc-amoy.maticvigil.com/'],
  blockExplorerUrls: ['https://amoy.polygonscan.com/']
}

// Replace with your actual contract address from Vercel env
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'

export async function connectWallet() {
  if (typeof window.ethereum === 'undefined') throw new Error('MetaMask not found')
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CHAIN_CONFIG.chainId }],
    })
  } catch (err) {
    if (err.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [CHAIN_CONFIG],
      })
    }
  }
  return accounts[0]
}

export async function getContract() {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
}

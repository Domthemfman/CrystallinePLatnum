/**
 * Web3 Connection for Crystalline Groups
 * 
 * SETUP INSTRUCTIONS:
 * 1. Deploy CrystallineGroups.sol using Remix
 * 2. Copy your contract address and paste it below
 * 3. Get the ABI from Remix and save as CrystallineGroupsABI.json
 * 4. Install ethers: npm install ethers
 */





0x5e17b14ADd6c386305A32928F985b29bbA34Eff5
import { ethers } from 'ethers';
import CrystallineGroupsABI from './CrystallineGroupsABI.json';

// 🔧 PASTE YOUR CONTRACT ADDRESS HERE (from Remix after deploying)
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_HERE'; // Example: '0x1234567890abcdef...'

// 🌐 Network Configuration
const POLYGON_MAINNET = {
  chainId: '0x89', // 137 in decimal
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/']
};

const POLYGON_MUMBAI = {
  chainId: '0x13881', // 80001 in decimal
  chainName: 'Polygon Mumbai Testnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/']
};

// 🎯 Change this to POLYGON_MUMBAI for testing
const CURRENT_NETWORK = POLYGON_MAINNET;

/**
 * Connect user's wallet
 */
export async function connectWallet() {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask to use this feature');
    }

    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Get provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // Check if on correct network
    const network = await provider.getNetwork();
    if (network.chainId !== parseInt(CURRENT_NETWORK.chainId, 16)) {
      await switchNetwork();
    }

    return { provider, signer, address };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
}

/**
 * Switch to Polygon network
 */
export async function switchNetwork() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CURRENT_NETWORK.chainId }],
    });
  } catch (switchError) {
    // Network not added yet, add it
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [CURRENT_NETWORK],
        });
      } catch (addError) {
        throw addError;
      }
    } else {
      throw switchError;
    }
  }
}

/**
 * Get the contract instance
 */
export async function getContract() {
  try {
    const { signer } = await connectWallet();
    
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CrystallineGroupsABI,
      signer
    );

    return contract;
  } catch (error) {
    console.error('Error getting contract:', error);
    throw error;
  }
}

/**
 * Get contract in read-only mode (no wallet needed)
 */
export async function getContractReadOnly() {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      CURRENT_NETWORK.rpcUrls[0]
    );

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CrystallineGroupsABI,
      provider
    );

    return contract;
  } catch (error) {
    console.error('Error getting read-only contract:', error);
    throw error;
  }
}

/**
 * Check if user is connected
 */
export async function isWalletConnected() {
  try {
    if (typeof window.ethereum === 'undefined') {
      return false;
    }

    const accounts = await window.ethereum.request({ 
      method: 'eth_accounts' 
    });

    return accounts.length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Get current user's address
 */
export async function getCurrentAddress() {
  try {
    const { address } = await connectWallet();
    return address;
  } catch (error) {
    return null;
  }
}

/**
 * Listen for account changes
 */
export function onAccountsChanged(callback) {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', callback);
  }
}

/**
 * Listen for network changes
 */
export function onChainChanged(callback) {
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('chainChanged', callback);
  }
}

/**
 * Format address for display (0x1234...5678)
 */
export function formatAddress(address) {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

/**
 * Parse error messages from contract calls
 */
export function parseError(error) {
  if (error.reason) return error.reason;
  if (error.message) return error.message;
  return 'Transaction failed';
}

// Example usage in your components:
/*
import { getContract, connectWallet } from '@/utils/web3';

// In your component:
const handleJoinGroup = async () => {
  try {
    const contract = await getContract();
    const tx = await contract.joinGroup(groupId);
    await tx.wait();
    alert('Successfully joined group!');
  } catch (error) {
    alert('Error: ' + parseError(error));
  }
};
*/

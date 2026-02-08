/**
 * User Status Utilities
 * Functions to check user tier, group creation eligibility, and status
 */

// Check if user meets auto-qualification criteria
export function checkAutoQualified(userData) {
  const {
    accountCreatedAt,
    tier,
    contributionScore,
    flagCount = 0
  } = userData;

  // Must have clean record
  if (flagCount > 0) return false;

  // Calculate account age in days
  const accountAge = Date.now() - new Date(accountCreatedAt).getTime();
  const ageInDays = accountAge / (1000 * 60 * 60 * 24);

  // Check all criteria
  const meetsAgeCriteria = ageInDays >= 90; // 3 months
  const meetsTierCriteria = tier >= 2; // Silver or higher
  const meetsContributionCriteria = contributionScore >= 100;

  return meetsAgeCriteria && meetsTierCriteria && meetsContributionCriteria;
}

// Check if user has been nominated
export async function checkNominations(userAddress, contract) {
  try {
    // TODO: Query blockchain for nominations
    // This is a placeholder
    const nominations = [];
    return nominations.length > 0;
  } catch (error) {
    console.error('Error checking nominations:', error);
    return false;
  }
}

// Check if user can create groups (either path)
export async function canUserCreateGroups(userData, contract) {
  // Path 1: Check for nominations
  const hasNomination = await checkNominations(userData.address, contract);
  
  // Path 2: Check auto-qualification
  const isAutoQualified = checkAutoQualified(userData);

  return hasNomination || isAutoQualified;
}

// Calculate user tier based on contribution score
export function calculateUserTier(contributionScore) {
  if (contributionScore >= 500) return 3; // Gold
  if (contributionScore >= 200) return 2; // Silver
  if (contributionScore >= 50) return 1; // Bronze
  return 0; // New
}

// Get tier name and color
export function getTierInfo(tier) {
  switch (tier) {
    case 3:
      return { 
        name: 'Gold', 
        color: '#FFD700', 
        emoji: '👑',
        description: 'Elite contributor'
      };
    case 2:
      return { 
        name: 'Silver', 
        color: '#C0C0C0', 
        emoji: '⭐',
        description: 'Valued member'
      };
    case 1:
      return { 
        name: 'Bronze', 
        color: '#CD7F32', 
        emoji: '🥉',
        description: 'Growing contributor'
      };
    default:
      return { 
        name: 'New', 
        color: '#999', 
        emoji: '🌱',
        description: 'New member'
      };
  }
}

// Calculate progress to next tier
export function getProgressToNextTier(contributionScore) {
  if (contributionScore >= 500) {
    return { 
      currentTier: 3, 
      nextTier: null, 
      progress: 100,
      pointsNeeded: 0
    };
  }
  
  let nextTierThreshold;
  let currentTier;
  
  if (contributionScore >= 200) {
    currentTier = 2;
    nextTierThreshold = 500;
  } else if (contributionScore >= 50) {
    currentTier = 1;
    nextTierThreshold = 200;
  } else {
    currentTier = 0;
    nextTierThreshold = 50;
  }

  const progress = (contributionScore / nextTierThreshold) * 100;
  const pointsNeeded = nextTierThreshold - contributionScore;

  return {
    currentTier,
    nextTier: currentTier + 1,
    progress: Math.min(progress, 100),
    pointsNeeded
  };
}

// Check if user meets minimum requirements to join groups
export function canJoinGroups(userData) {
  // Basic verification required
  return userData.isVerified === true;
}

// Get user's groups
export async function getUserGroups(userAddress, contract) {
  try {
    // TODO: Query blockchain for user's groups
    return [];
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return [];
  }
}

// Example usage:
/*
const userData = {
  address: '0x123...',
  accountCreatedAt: '2025-11-01',
  tier: 2,
  contributionScore: 250,
  flagCount: 0,
  isVerified: true
};

const canCreate = await canUserCreateGroups(userData, contract);
const tierInfo = getTierInfo(userData.tier);
const progress = getProgressToNextTier(userData.contributionScore);

console.log('Can create groups:', canCreate);
console.log('Tier:', tierInfo.name);
console.log('Progress to next tier:', progress.progress + '%');
*/

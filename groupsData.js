/**
 * Groups Data Management
 * Utilities for managing group data, posts, and interactions
 */

// Official groups configuration
export const OFFICIAL_GROUPS = [
  {
    id: 1,
    name: 'Human Trafficking Survivors',
    description: 'Safe space for human trafficking survivors to share and heal',
    icon: '🕊️',
    isOfficial: true,
    useBlockchain: true
  },
  {
    id: 2,
    name: 'Government Experimentation',
    description: 'For survivors of government experiments, MKUltra, and institutional abuse',
    icon: '🔬',
    isOfficial: true,
    useBlockchain: true
  },
  {
    id: 3,
    name: 'Ritual Abuse Survivors',
    description: 'Support for those who experienced ritual or organized abuse',
    icon: '🕯️',
    isOfficial: true,
    useBlockchain: true
  },
  {
    id: 4,
    name: 'CSA Survivors',
    description: 'Safe community for child sexual abuse survivors',
    icon: '🛡️',
    isOfficial: true,
    useBlockchain: true
  },
  {
    id: 5,
    name: 'Domestic Abuse Survivors',
    description: 'Support for domestic violence and family abuse survivors',
    icon: '🏠',
    isOfficial: true,
    useBlockchain: true
  }
];

// Fetch group data from blockchain
export async function getGroupData(groupId, contract) {
  try {
    if (!contract) {
      // Fallback to official groups if no contract
      return OFFICIAL_GROUPS.find(g => g.id === parseInt(groupId));
    }

    const group = await contract.getGroup(groupId);
    return {
      id: groupId,
      name: group.name,
      description: group.description,
      creator: group.creator,
      isOfficial: group.isOfficial,
      useBlockchain: group.useBlockchain,
      memberCount: group.memberCount.toNumber(),
      createdAt: new Date(group.createdAt.toNumber() * 1000).toISOString(),
      isActive: group.isActive
    };
  } catch (error) {
    console.error('Error fetching group:', error);
    return null;
  }
}

// Fetch all groups (official + user-created)
export async function getAllGroups(contract) {
  try {
    if (!contract) {
      return OFFICIAL_GROUPS;
    }

    const groupCounter = await contract.groupCounter();
    const groups = [];

    for (let i = 1; i <= groupCounter; i++) {
      const group = await getGroupData(i, contract);
      if (group && group.isActive) {
        groups.push(group);
      }
    }

    return groups;
  } catch (error) {
    console.error('Error fetching all groups:', error);
    return OFFICIAL_GROUPS;
  }
}

// Check if user is a member of a group
export async function isUserMember(groupId, userAddress, contract) {
  try {
    if (!contract) return false;
    return await contract.isMember(groupId, userAddress);
  } catch (error) {
    console.error('Error checking membership:', error);
    return false;
  }
}

// Join a group
export async function joinGroup(groupId, contract, signer) {
  try {
    const tx = await contract.connect(signer).joinGroup(groupId);
    await tx.wait();
    return { success: true, tx };
  } catch (error) {
    console.error('Error joining group:', error);
    return { success: false, error: error.message };
  }
}

// Leave a group
export async function leaveGroup(groupId, contract, signer) {
  try {
    const tx = await contract.connect(signer).leaveGroup(groupId);
    await tx.wait();
    return { success: true, tx };
  } catch (error) {
    console.error('Error leaving group:', error);
    return { success: false, error: error.message };
  }
}

// Create a new group
export async function createGroup(groupData, contract, signer) {
  try {
    const { name, description, useBlockchain } = groupData;
    const tx = await contract.connect(signer).createGroup(
      name,
      description,
      useBlockchain
    );
    const receipt = await tx.wait();
    
    // Get the group ID from the event
    const event = receipt.events.find(e => e.event === 'GroupCreated');
    const groupId = event.args.groupId.toNumber();

    return { success: true, groupId, tx };
  } catch (error) {
    console.error('Error creating group:', error);
    return { success: false, error: error.message };
  }
}

// Get group members
export async function getGroupMembers(groupId, contract) {
  try {
    if (!contract) return [];
    const members = await contract.getGroupMembers(groupId);
    return members;
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
}

// Start removal vote
export async function startRemovalVote(groupId, memberAddress, contract, signer) {
  try {
    const tx = await contract.connect(signer).startRemovalVote(groupId, memberAddress);
    await tx.wait();
    return { success: true, tx };
  } catch (error) {
    console.error('Error starting removal vote:', error);
    return { success: false, error: error.message };
  }
}

// Vote on removal
export async function voteOnRemoval(groupId, support, contract, signer) {
  try {
    const tx = await contract.connect(signer).voteOnRemoval(groupId, support);
    await tx.wait();
    return { success: true, tx };
  } catch (error) {
    console.error('Error voting:', error);
    return { success: false, error: error.message };
  }
}

// Execute removal vote
export async function executeRemovalVote(groupId, contract, signer) {
  try {
    const tx = await contract.connect(signer).executeRemovalVote(groupId);
    await tx.wait();
    return { success: true, tx };
  } catch (error) {
    console.error('Error executing vote:', error);
    return { success: false, error: error.message };
  }
}

// Get removal vote status
export async function getRemovalVoteStatus(groupId, contract) {
  try {
    const vote = await contract.getRemovalVoteStatus(groupId);
    return {
      targetMember: vote.targetMember,
      votesFor: vote.votesFor.toNumber(),
      votesAgainst: vote.votesAgainst.toNumber(),
      startTime: new Date(vote.startTime.toNumber() * 1000),
      executed: vote.executed
    };
  } catch (error) {
    console.error('Error fetching vote status:', error);
    return null;
  }
}

// Nominate user for group creation
export async function nominateUser(nomineeAddress, contract, signer) {
  try {
    const tx = await contract.connect(signer).nominateUser(nomineeAddress);
    await tx.wait();
    return { success: true, tx };
  } catch (error) {
    console.error('Error nominating user:', error);
    return { success: false, error: error.message };
  }
}

// Helper: Format group for display
export function formatGroupForDisplay(group) {
  return {
    ...group,
    memberCountDisplay: group.memberCount === 1 
      ? '1 member' 
      : `${group.memberCount} members`,
    createdAtDisplay: new Date(group.createdAt).toLocaleDateString(),
    badge: group.isOfficial ? 'Official' : 'Community'
  };
}

// Helper: Filter groups by category
export function filterGroups(groups, filter) {
  switch (filter) {
    case 'official':
      return groups.filter(g => g.isOfficial);
    case 'user-created':
      return groups.filter(g => !g.isOfficial);
    case 'blockchain':
      return groups.filter(g => g.useBlockchain);
    default:
      return groups;
  }
}

// Helper: Sort groups
export function sortGroups(groups, sortBy) {
  switch (sortBy) {
    case 'members':
      return [...groups].sort((a, b) => b.memberCount - a.memberCount);
    case 'newest':
      return [...groups].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    case 'oldest':
      return [...groups].sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
    default:
      return groups;
  }
}

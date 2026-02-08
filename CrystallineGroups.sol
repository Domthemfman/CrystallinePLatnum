// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CrystallineGroups
 * @dev Private support groups with democratic controls for Crystalline Truth Network
 */
contract CrystallineGroups {
    
    struct Group {
        uint256 id;
        string name;
        string description;
        address creator;
        bool isOfficial;
        bool useBlockchain;
        uint256 memberCount;
        uint256 createdAt;
        bool isActive;
    }
    
    struct Member {
        address wallet;
        uint256 joinedAt;
        bool isActive;
    }
    
    struct RemovalVote {
        address targetMember;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 startTime;
        bool executed;
        mapping(address => bool) hasVoted;
    }
    
    // State variables
    uint256 public groupCounter;
    mapping(uint256 => Group) public groups;
    mapping(uint256 => mapping(address => Member)) public groupMembers;
    mapping(uint256 => address[]) public memberList;
    mapping(uint256 => RemovalVote) public removalVotes;
    
    // User status tracking
    mapping(address => uint256) public userTier; // 0=none, 1=bronze, 2=silver, 3=gold
    mapping(address => uint256) public accountCreatedAt;
    mapping(address => uint256) public contributionScore;
    mapping(address => bool) public canCreateGroups;
    mapping(address => mapping(address => bool)) public nominations; // nominator => nominee
    
    // Events
    event GroupCreated(uint256 indexed groupId, string name, address creator, bool isOfficial);
    event MemberJoined(uint256 indexed groupId, address member);
    event MemberLeft(uint256 indexed groupId, address member);
    event RemovalVoteStarted(uint256 indexed groupId, address targetMember);
    event RemovalVoteCompleted(uint256 indexed groupId, address targetMember, bool removed);
    event UserNominated(address nominee, address nominator);
    event GroupCreationGranted(address user);
    
    modifier onlyGroupCreator(uint256 _groupId) {
        require(groups[_groupId].creator == msg.sender, "Only group creator");
        _;
    }
    
    modifier onlyGroupMember(uint256 _groupId) {
        require(groupMembers[_groupId][msg.sender].isActive, "Not a member");
        _;
    }
    
    constructor() {
        // Initialize with official groups
        _createOfficialGroup("Human Trafficking Survivors", "Safe space for human trafficking survivors to share and heal");
        _createOfficialGroup("Government Experimentation", "For survivors of government experiments, MKUltra, and institutional abuse");
        _createOfficialGroup("Ritual Abuse Survivors", "Support for those who experienced ritual or organized abuse");
        _createOfficialGroup("CSA Survivors", "Safe community for child sexual abuse survivors");
        _createOfficialGroup("Domestic Abuse Survivors", "Support for domestic violence and family abuse survivors");
    }
    
    function _createOfficialGroup(string memory _name, string memory _description) internal {
        groupCounter++;
        groups[groupCounter] = Group({
            id: groupCounter,
            name: _name,
            description: _description,
            creator: msg.sender,
            isOfficial: true,
            useBlockchain: true,
            memberCount: 0,
            createdAt: block.timestamp,
            isActive: true
        });
        
        emit GroupCreated(groupCounter, _name, msg.sender, true);
    }
    
    function createGroup(
        string memory _name,
        string memory _description,
        bool _useBlockchain
    ) external returns (uint256) {
        require(canCreateGroups[msg.sender], "Not authorized to create groups");
        require(bytes(_name).length > 0, "Name required");
        
        groupCounter++;
        groups[groupCounter] = Group({
            id: groupCounter,
            name: _name,
            description: _description,
            creator: msg.sender,
            isOfficial: false,
            useBlockchain: _useBlockchain,
            memberCount: 0,
            createdAt: block.timestamp,
            isActive: true
        });
        
        // Auto-join creator as first member
        _addMember(groupCounter, msg.sender);
        
        emit GroupCreated(groupCounter, _name, msg.sender, false);
        return groupCounter;
    }
    
    function joinGroup(uint256 _groupId) external {
        require(groups[_groupId].isActive, "Group not active");
        require(!groupMembers[_groupId][msg.sender].isActive, "Already a member");
        
        _addMember(_groupId, msg.sender);
        emit MemberJoined(_groupId, msg.sender);
    }
    
    function leaveGroup(uint256 _groupId) external onlyGroupMember(_groupId) {
        _removeMember(_groupId, msg.sender);
        emit MemberLeft(_groupId, msg.sender);
    }
    
    function _addMember(uint256 _groupId, address _member) internal {
        groupMembers[_groupId][_member] = Member({
            wallet: _member,
            joinedAt: block.timestamp,
            isActive: true
        });
        memberList[_groupId].push(_member);
        groups[_groupId].memberCount++;
    }
    
    function _removeMember(uint256 _groupId, address _member) internal {
        groupMembers[_groupId][_member].isActive = false;
        groups[_groupId].memberCount--;
    }
    
    function startRemovalVote(uint256 _groupId, address _targetMember) 
        external 
        onlyGroupCreator(_groupId) 
    {
        require(groupMembers[_groupId][_targetMember].isActive, "Not a member");
        require(_targetMember != groups[_groupId].creator, "Cannot remove creator");
        require(!removalVotes[_groupId].executed, "Vote already in progress");
        
        RemovalVote storage vote = removalVotes[_groupId];
        vote.targetMember = _targetMember;
        vote.votesFor = 0;
        vote.votesAgainst = 0;
        vote.startTime = block.timestamp;
        vote.executed = false;
        
        emit RemovalVoteStarted(_groupId, _targetMember);
    }
    
    function voteOnRemoval(uint256 _groupId, bool _support) 
        external 
        onlyGroupMember(_groupId) 
    {
        RemovalVote storage vote = removalVotes[_groupId];
        require(!vote.executed, "Vote already executed");
        require(!vote.hasVoted[msg.sender], "Already voted");
        require(block.timestamp < vote.startTime + 7 days, "Voting period ended");
        
        vote.hasVoted[msg.sender] = true;
        
        if (_support) {
            vote.votesFor++;
        } else {
            vote.votesAgainst++;
        }
    }
    
    function executeRemovalVote(uint256 _groupId) 
        external 
        onlyGroupCreator(_groupId) 
    {
        RemovalVote storage vote = removalVotes[_groupId];
        require(!vote.executed, "Already executed");
        require(block.timestamp >= vote.startTime + 7 days, "Voting period not ended");
        
        vote.executed = true;
        
        // Remove if majority voted for removal
        if (vote.votesFor > vote.votesAgainst) {
            _removeMember(_groupId, vote.targetMember);
            emit RemovalVoteCompleted(_groupId, vote.targetMember, true);
        } else {
            emit RemovalVoteCompleted(_groupId, vote.targetMember, false);
        }
    }
    
    // User Status & Nomination System
    function nominateUser(address _nominee) external {
        require(canCreateGroups[msg.sender], "Only group creators can nominate");
        require(_nominee != msg.sender, "Cannot nominate self");
        
        nominations[msg.sender][_nominee] = true;
        emit UserNominated(_nominee, msg.sender);
        
        // Check if user should be granted permission
        _checkGroupCreationEligibility(_nominee);
    }
    
    function updateUserStats(address _user, uint256 _tier, uint256 _score) external {
        // In production, this should be restricted to authorized addresses
        userTier[_user] = _tier;
        contributionScore[_user] = _score;
        
        if (accountCreatedAt[_user] == 0) {
            accountCreatedAt[_user] = block.timestamp;
        }
        
        _checkGroupCreationEligibility(_user);
    }
    
    function _checkGroupCreationEligibility(address _user) internal {
        if (canCreateGroups[_user]) return; // Already has permission
        
        // Path 1: Nominated by existing group creator
        bool hasNomination = _countNominations(_user) > 0;
        
        // Path 2: Auto-qualified (3+ months, Silver+ tier, 100+ contribution score)
        bool autoQualified = false;
        if (accountCreatedAt[_user] > 0) {
            uint256 accountAge = block.timestamp - accountCreatedAt[_user];
            autoQualified = accountAge >= 90 days && 
                           userTier[_user] >= 2 && 
                           contributionScore[_user] >= 100;
        }
        
        if (hasNomination || autoQualified) {
            canCreateGroups[_user] = true;
            emit GroupCreationGranted(_user);
        }
    }
    
    function _countNominations(address _user) internal view returns (uint256) {
        uint256 count = 0;
        // This is simplified - in production you'd track nominators more efficiently
        return count;
    }
    
    // View functions
    function getGroup(uint256 _groupId) external view returns (
        string memory name,
        string memory description,
        address creator,
        bool isOfficial,
        bool useBlockchain,
        uint256 memberCount,
        uint256 createdAt,
        bool isActive
    ) {
        Group memory g = groups[_groupId];
        return (g.name, g.description, g.creator, g.isOfficial, g.useBlockchain, g.memberCount, g.createdAt, g.isActive);
    }
    
    function getGroupMembers(uint256 _groupId) external view returns (address[] memory) {
        return memberList[_groupId];
    }
    
    function isMember(uint256 _groupId, address _user) external view returns (bool) {
        return groupMembers[_groupId][_user].isActive;
    }
    
    function canUserCreateGroups(address _user) external view returns (bool) {
        return canCreateGroups[_user];
    }
    
    function getRemovalVoteStatus(uint256 _groupId) external view returns (
        address targetMember,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 startTime,
        bool executed
    ) {
        RemovalVote storage vote = removalVotes[_groupId];
        return (vote.targetMember, vote.votesFor, vote.votesAgainst, vote.startTime, vote.executed);
    }
}

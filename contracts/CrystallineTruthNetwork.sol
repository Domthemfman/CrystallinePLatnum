// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrystallineTruthNetwork {
    struct Post {
        uint256 id;
        address author;
        string contentHash; // IPFS hash
        uint256 timestamp;
        uint256 validations;
        bool isAnonymous;
        bool crystallized;
    }

    struct Validation {
        address validator;
        uint256 postId;
        uint256 timestamp;
        bool supportsTruth;
    }

    mapping(uint256 => Post) public posts;
    mapping(uint256 => Validation[]) public postValidations;
    mapping(address => uint256[]) public userPosts;
    
    uint256 public postCount;
    uint256 public constant CRYSTALLIZATION_THRESHOLD = 50;

    event PostCreated(uint256 indexed postId, address indexed author, bool isAnonymous);
    event PostValidated(uint256 indexed postId, address indexed validator, bool supportsTruth);
    event PostCrystallized(uint256 indexed postId, uint256 validations);

    function createPost(string memory _contentHash, bool _isAnonymous) public returns (uint256) {
        postCount++;
        
        posts[postCount] = Post({
            id: postCount,
            author: msg.sender,
            contentHash: _contentHash,
            timestamp: block.timestamp,
            validations: 0,
            isAnonymous: _isAnonymous,
            crystallized: false
        });

        userPosts[msg.sender].push(postCount);
        
        emit PostCreated(postCount, msg.sender, _isAnonymous);
        return postCount;
    }

    function validatePost(uint256 _postId, bool _supportsTruth) public {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        require(posts[_postId].author != msg.sender, "Cannot validate own post");

        Validation memory newValidation = Validation({
            validator: msg.sender,
            postId: _postId,
            timestamp: block.timestamp,
            supportsTruth: _supportsTruth
        });

        postValidations[_postId].push(newValidation);
        
        if (_supportsTruth) {
            posts[_postId].validations++;
            
            if (posts[_postId].validations >= CRYSTALLIZATION_THRESHOLD && !posts[_postId].crystallized) {
                posts[_postId].crystallized = true;
                emit PostCrystallized(_postId, posts[_postId].validations);
            }
        }

        emit PostValidated(_postId, msg.sender, _supportsTruth);
    }

    function getPost(uint256 _postId) public view returns (
        uint256 id,
        address author,
        string memory contentHash,
        uint256 timestamp,
        uint256 validations,
        bool isAnonymous,
        bool crystallized
    ) {
        Post memory post = posts[_postId];
        return (
            post.id,
            post.isAnonymous ? address(0) : post.author,
            post.contentHash,
            post.timestamp,
            post.validations,
            post.isAnonymous,
            post.crystallized
        );
    }

    function getUserPosts(address _user) public view returns (uint256[] memory) {
        return userPosts[_user];
    }

    function getPostValidations(uint256 _postId) public view returns (uint256) {
        return postValidations[_postId].length;
    }
}

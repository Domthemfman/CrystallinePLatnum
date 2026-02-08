'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import '../groups.css';

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId;

  const [group, setGroup] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadGroupData();
  }, [groupId]);

  const loadGroupData = async () => {
    // TODO: Load from blockchain/backend
    // Simulated data
    const mockGroup = {
      id: groupId,
      name: groupId === '1' ? 'Human Trafficking Survivors' : 'Recovery Warriors',
      description: groupId === '1' 
        ? 'Safe space for human trafficking survivors to share and heal'
        : 'Daily check-ins and accountability partners',
      memberCount: 15,
      isOfficial: groupId <= 5,
      creator: 'Anonymous User',
      useBlockchain: true,
      icon: groupId === '1' ? '🕊️' : '⚔️',
      createdAt: '2026-01-15'
    };

    const mockPosts = [
      {
        id: 1,
        author: 'Anonymous',
        content: 'Welcome everyone. This is a safe space to share your experiences and find support. Remember, you are not alone. 💜',
        timestamp: '2 hours ago',
        replies: 3
      },
      {
        id: 2,
        author: 'TruthSeeker',
        content: 'Thank you for creating this space. Finding this community has been life-changing.',
        timestamp: '1 hour ago',
        replies: 1
      }
    ];

    const mockMembers = [
      { name: 'Anonymous', role: 'Creator', joinedAt: '2026-01-15' },
      { name: 'TruthSeeker', role: 'Member', joinedAt: '2026-01-20' },
      { name: 'HopeWarrior', role: 'Member', joinedAt: '2026-01-22' },
      { name: 'SilentVoice', role: 'Member', joinedAt: '2026-01-25' }
    ];

    setGroup(mockGroup);
    setPosts(mockPosts);
    setMembers(mockMembers);
    setIsMember(true); // Simulated
    setIsCreator(false); // Simulated
  };

  const handleJoinGroup = async () => {
    // TODO: Blockchain transaction to join
    alert('Joining group...');
    setIsMember(true);
  };

  const handleLeaveGroup = async () => {
    if (confirm('Are you sure you want to leave this group?')) {
      // TODO: Blockchain transaction
      setIsMember(false);
      router.push('/groups');
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      author: 'You',
      content: newPost,
      timestamp: 'Just now',
      replies: 0
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  if (!group) {
    return <div className="groups-container">Loading...</div>;
  }

  return (
    <div className="group-page">
      <div className="group-banner">
        <div className="group-banner-content">
          <div className="group-title-row">
            <h1 className="group-title">
              <span className="group-icon">{group.icon}</span>
              {group.name}
              {group.isOfficial && <span className="official-badge">Official</span>}
            </h1>
            {!isMember ? (
              <button className="join-btn" onClick={handleJoinGroup}>
                Join Group
              </button>
            ) : (
              <>
                {isCreator && (
                  <Link href={`/groups/${groupId}/settings`} className="settings-btn">
                    ⚙️ Settings
                  </Link>
                )}
              </>
            )}
          </div>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{group.description}</p>
          <div className="group-stats">
            <div className="stat">
              <span>👥</span>
              <span>{group.memberCount} Members</span>
            </div>
            <div className="stat">
              <span>📅</span>
              <span>Created {group.createdAt}</span>
            </div>
            {group.useBlockchain && (
              <div className="stat">
                <span>⛓️</span>
                <span>Blockchain Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isMember ? (
        <div className="group-main" style={{ textAlign: 'center', padding: '60px' }}>
          <h2>Join this group to participate</h2>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Click the "Join Group" button above to become a member
          </p>
        </div>
      ) : (
        <div className="group-content">
          <div className="group-main">
            <h2>Group Discussion</h2>
            <div className="chat-area">
              {/* Post Form */}
              <form className="post-form" onSubmit={handlePostSubmit}>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your thoughts with the group..."
                  maxLength={1000}
                />
                <button type="submit" className="post-btn">
                  Post Message
                </button>
              </form>

              {/* Posts List */}
              <div className="posts-list">
                {posts.map(post => (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      <span className="post-author">{post.author}</span>
                      <span className="post-time">{post.timestamp}</span>
                    </div>
                    <div className="post-content">{post.content}</div>
                    <div className="post-actions">
                      <button className="action-btn">
                        💜 Support ({Math.floor(Math.random() * 10)})
                      </button>
                      <button className="action-btn">
                        💬 Reply ({post.replies})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="group-sidebar">
            {/* Members Card */}
            <div className="sidebar-card">
              <h3>Members ({members.length})</h3>
              <ul className="member-list">
                {members.map((member, idx) => (
                  <li key={idx} className="member-item">
                    <span>{member.name}</span>
                    {member.role === 'Creator' && (
                      <span className="member-badge">Creator</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Group Info Card */}
            <div className="sidebar-card">
              <h3>About</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                {group.description}
              </p>
              {!group.isOfficial && (
                <p style={{ marginTop: '15px', fontSize: '0.85rem', color: '#999' }}>
                  Created by {group.creator}
                </p>
              )}
            </div>

            {/* Actions Card */}
            {isMember && (
              <div className="sidebar-card">
                <h3>Actions</h3>
                <button 
                  className="action-btn" 
                  style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                >
                  🔔 Notifications
                </button>
                <button 
                  className="action-btn" 
                  style={{ width: '100%', justifyContent: 'center', padding: '10px', marginTop: '10px', color: '#e74c3c' }}
                  onClick={handleLeaveGroup}
                >
                  🚪 Leave Group
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

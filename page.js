'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './groups.css';

const OFFICIAL_GROUPS = [
  {
    id: 1,
    name: 'Human Trafficking Survivors',
    description: 'Safe space for human trafficking survivors to share and heal',
    memberCount: 0,
    isOfficial: true,
    icon: '🕊️'
  },
  {
    id: 2,
    name: 'Government Experimentation',
    description: 'For survivors of government experiments, MKUltra, and institutional abuse',
    memberCount: 0,
    isOfficial: true,
    icon: '🔬'
  },
  {
    id: 3,
    name: 'Ritual Abuse Survivors',
    description: 'Support for those who experienced ritual or organized abuse',
    memberCount: 0,
    isOfficial: true,
    icon: '🕯️'
  },
  {
    id: 4,
    name: 'CSA Survivors',
    description: 'Safe community for child sexual abuse survivors',
    memberCount: 0,
    isOfficial: true,
    icon: '🛡️'
  },
  {
    id: 5,
    name: 'Domestic Abuse Survivors',
    description: 'Support for domestic violence and family abuse survivors',
    memberCount: 0,
    isOfficial: true,
    icon: '🏠'
  }
];

export default function GroupsPage() {
  const [userGroups, setUserGroups] = useState([]);
  const [canCreate, setCanCreate] = useState(false);
  const [activeTab, setActiveTab] = useState('official'); // official, user-created, my-groups

  useEffect(() => {
    // Check if user can create groups
    checkUserStatus();
    loadUserGroups();
  }, []);

  const checkUserStatus = async () => {
    // TODO: Check blockchain or backend for user status
    // For now, simulate
    const userCanCreate = true; // Replace with actual check
    setCanCreate(userCanCreate);
  };

  const loadUserGroups = async () => {
    // TODO: Load user-created groups from blockchain/backend
    // Simulated data
    const groups = [
      {
        id: 101,
        name: 'Recovery Warriors',
        description: 'Daily check-ins and accountability partners',
        memberCount: 12,
        isOfficial: false,
        creator: 'Anonymous User',
        useBlockchain: true,
        icon: '⚔️'
      },
      {
        id: 102,
        name: 'Night Owls Support',
        description: 'For those who struggle at night',
        memberCount: 8,
        isOfficial: false,
        creator: 'TruthSeeker',
        useBlockchain: false,
        icon: '🦉'
      }
    ];
    setUserGroups(groups);
  };

  const GroupCard = ({ group }) => (
    <Link href={`/groups/${group.id}`} className="group-card">
      <div className="group-icon">{group.icon}</div>
      <div className="group-info">
        <h3>
          {group.name}
          {group.isOfficial && <span className="official-badge">Official</span>}
        </h3>
        <p className="group-description">{group.description}</p>
        <div className="group-meta">
          <span className="member-count">👥 {group.memberCount} members</span>
          {!group.isOfficial && (
            <>
              <span className="creator">by {group.creator}</span>
              {group.useBlockchain && <span className="blockchain-badge">⛓️</span>}
            </>
          )}
        </div>
      </div>
      <div className="join-arrow">→</div>
    </Link>
  );

  return (
    <div className="groups-container">
      <div className="groups-header">
        <h1>Private Support Groups</h1>
        <p className="groups-subtitle">Safe spaces for shared experiences</p>
        {canCreate && (
          <Link href="/groups/create" className="create-group-btn">
            + Create Group
          </Link>
        )}
      </div>

      <div className="groups-tabs">
        <button 
          className={`tab ${activeTab === 'official' ? 'active' : ''}`}
          onClick={() => setActiveTab('official')}
        >
          Official Groups
        </button>
        <button 
          className={`tab ${activeTab === 'user-created' ? 'active' : ''}`}
          onClick={() => setActiveTab('user-created')}
        >
          Community Groups
        </button>
        <button 
          className={`tab ${activeTab === 'my-groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-groups')}
        >
          My Groups
        </button>
      </div>

      <div className="groups-grid">
        {activeTab === 'official' && (
          <>
            {OFFICIAL_GROUPS.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </>
        )}

        {activeTab === 'user-created' && (
          <>
            {userGroups.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
            {userGroups.length === 0 && (
              <div className="empty-state">
                <p>No community groups yet. Be the first to create one! 💎</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'my-groups' && (
          <div className="empty-state">
            <p>You haven't joined any groups yet.</p>
            <p>Join an official group or create your own!</p>
          </div>
        )}
      </div>

      {!canCreate && (
        <div className="status-info">
          <h3>Want to create your own group?</h3>
          <p>Earn group creation privileges through:</p>
          <ul>
            <li>✨ Be active for 3+ months</li>
            <li>🏆 Reach Silver tier or higher</li>
            <li>💎 Maintain positive contributions</li>
            <li>👥 Get nominated by existing group creators</li>
          </ul>
        </div>
      )}
    </div>
  );
}

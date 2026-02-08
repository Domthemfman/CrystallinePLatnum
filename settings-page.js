'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import '../../groups.css';

export default function GroupSettingsPage() {
  const params = useParams();
  const groupId = params.groupId;

  const [members, setMembers] = useState([]);
  const [pendingVote, setPendingVote] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    loadGroupSettings();
  }, [groupId]);

  const loadGroupSettings = async () => {
    // TODO: Load from blockchain
    const mockMembers = [
      { 
        address: '0x123...abc',
        name: 'TruthSeeker', 
        joinedAt: '2026-01-20',
        posts: 15,
        support: 45
      },
      { 
        address: '0x456...def',
        name: 'HopeWarrior', 
        joinedAt: '2026-01-22',
        posts: 8,
        support: 23
      },
      { 
        address: '0x789...ghi',
        name: 'SilentVoice', 
        joinedAt: '2026-01-25',
        posts: 12,
        support: 38
      }
    ];

    setMembers(mockMembers);
  };

  const handleStartRemovalVote = async (member) => {
    if (confirm(`Start a removal vote for ${member.name}? The group will vote on this decision.`)) {
      // TODO: Blockchain transaction
      setPendingVote({
        targetMember: member,
        votesFor: 0,
        votesAgainst: 0,
        startTime: new Date(),
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });
      alert('Removal vote started! Group members have 7 days to vote.');
    }
  };

  return (
    <div className="groups-container">
      <div className="settings-container">
        <h1>⚙️ Group Settings</h1>
        <p className="subtitle">Manage your group members and settings</p>

        {/* Pending Vote Alert */}
        {pendingVote && (
          <div className="alert-box">
            <h3>🗳️ Active Removal Vote</h3>
            <p>Vote to remove: <strong>{pendingVote.targetMember.name}</strong></p>
            <div className="vote-status">
              <div className="vote-bar">
                <div className="vote-for" style={{ width: '40%' }}>
                  👍 {pendingVote.votesFor} For
                </div>
                <div className="vote-against" style={{ width: '60%' }}>
                  👎 {pendingVote.votesAgainst} Against
                </div>
              </div>
              <p className="vote-time">
                Ends: {pendingVote.endTime.toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Members Management */}
        <div className="settings-section">
          <h2>👥 Manage Members ({members.length})</h2>
          
          <div className="members-table">
            {members.map((member, idx) => (
              <div key={idx} className="member-row">
                <div className="member-info-col">
                  <div className="member-name">{member.name}</div>
                  <div className="member-meta">
                    <span>Joined {member.joinedAt}</span>
                    <span>•</span>
                    <span>{member.posts} posts</span>
                    <span>•</span>
                    <span>💜 {member.support}</span>
                  </div>
                </div>
                <div className="member-actions">
                  <button 
                    className="action-btn-small"
                    onClick={() => setSelectedMember(member)}
                  >
                    View Profile
                  </button>
                  <button 
                    className="action-btn-small danger"
                    onClick={() => handleStartRemovalVote(member)}
                    disabled={!!pendingVote}
                  >
                    Start Removal Vote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="info-box" style={{ marginTop: '30px' }}>
          <h3>ℹ️ Important Reminders</h3>
          <ul>
            <li>🗳️ Member removal requires a democratic vote from the group</li>
            <li>⏱️ Voting periods last 7 days</li>
            <li>👥 Majority vote (more "for" than "against") needed to remove</li>
            <li>🚫 You cannot remove yourself or bypass the voting process</li>
            <li>💬 Communicate reasons clearly before starting a vote</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .settings-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        h1 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 10px;
          color: #333;
        }

        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 40px;
          font-size: 1.1rem;
        }

        .alert-box {
          background: #fff3cd;
          border: 2px solid #ffc107;
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .alert-box h3 {
          margin-bottom: 10px;
          color: #856404;
        }

        .vote-status {
          margin-top: 15px;
        }

        .vote-bar {
          display: flex;
          height: 40px;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .vote-for {
          background: #28a745;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .vote-against {
          background: #dc3545;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .vote-time {
          text-align: center;
          color: #856404;
          font-size: 0.9rem;
        }

        .settings-section {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .settings-section h2 {
          margin-bottom: 20px;
          color: #667eea;
        }

        .members-table {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .member-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
          transition: background 0.2s;
        }

        .member-row:hover {
          background: #e9ecef;
        }

        .member-info-col {
          flex: 1;
        }

        .member-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 5px;
        }

        .member-meta {
          display: flex;
          gap: 8px;
          font-size: 0.85rem;
          color: #666;
        }

        .member-actions {
          display: flex;
          gap: 10px;
        }

        .action-btn-small {
          padding: 8px 16px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .action-btn-small:hover {
          background: #764ba2;
          transform: translateY(-2px);
        }

        .action-btn-small:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-btn-small.danger {
          background: #dc3545;
        }

        .action-btn-small.danger:hover {
          background: #c82333;
        }

        .info-box {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 25px;
          border-radius: 15px;
        }

        .info-box h3 {
          margin-bottom: 15px;
        }

        .info-box ul {
          list-style: none;
          padding: 0;
        }

        .info-box li {
          padding: 8px 0;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .member-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .member-actions {
            width: 100%;
          }

          .action-btn-small {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}

'use client';

export default function UserStatusBadge({ tier, canCreateGroups }) {
  const getTierInfo = () => {
    switch (tier) {
      case 3:
        return { name: 'Gold', color: '#FFD700', emoji: '👑' };
      case 2:
        return { name: 'Silver', color: '#C0C0C0', emoji: '⭐' };
      case 1:
        return { name: 'Bronze', color: '#CD7F32', emoji: '🥉' };
      default:
        return { name: 'New', color: '#999', emoji: '🌱' };
    }
  };

  const tierInfo = getTierInfo();

  return (
    <div className="status-badge-container">
      <div 
        className="tier-badge"
        style={{ background: tierInfo.color }}
      >
        {tierInfo.emoji} {tierInfo.name}
      </div>
      {canCreateGroups && (
        <div className="creator-badge">
          ✨ Can Create Groups
        </div>
      )}

      <style jsx>{`
        .status-badge-container {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .tier-badge {
          padding: 5px 12px;
          border-radius: 15px;
          color: white;
          font-weight: 600;
          font-size: 0.85rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .creator-badge {
          padding: 5px 12px;
          border-radius: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 600;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}

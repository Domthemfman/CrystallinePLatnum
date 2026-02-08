'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../groups.css';

export default function CreateGroupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    useBlockchain: true,
    isPrivate: true
  });
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      // TODO: Create group on blockchain or backend
      console.log('Creating group:', formData);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Group created successfully! 🎉');
      router.push('/groups');
    } catch (error) {
      alert('Error creating group: ' + error.message);
      setCreating(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="groups-container">
      <div className="create-group-container">
        <h1>Create a Support Group</h1>
        <p className="subtitle">Build a safe space for your community</p>

        <form className="create-group-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Group Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Night Owls Support"
              maxLength={50}
              required
            />
            <span className="char-count">{formData.name.length}/50</span>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the purpose of this group and who it's for..."
              maxLength={200}
              rows={4}
              required
            />
            <span className="char-count">{formData.description.length}/200</span>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="useBlockchain"
                checked={formData.useBlockchain}
                onChange={handleChange}
              />
              <span>Use blockchain validation</span>
            </label>
            <p className="help-text">
              {formData.useBlockchain 
                ? '⛓️ Posts and votes will be recorded on-chain for transparency'
                : '📝 Group will use off-chain storage (more private, less transparent)'
              }
            </p>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
              />
              <span>Private group (invite-only)</span>
            </label>
            <p className="help-text">
              {formData.isPrivate
                ? '🔒 Only members you approve can join'
                : '🌍 Anyone can request to join'
              }
            </p>
          </div>

          <div className="info-box">
            <h3>👥 As Group Creator, You Can:</h3>
            <ul>
              <li>✅ Invite new members</li>
              <li>✅ Start removal votes (requires group agreement)</li>
              <li>✅ Moderate discussions</li>
              <li>❌ Cannot remove members without group vote</li>
            </ul>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={creating}
          >
            {creating ? '⏳ Creating Group...' : '🚀 Create Group'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .create-group-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        h1 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 40px;
          font-size: 1.1rem;
        }

        .create-group-form {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 25px;
          position: relative;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.3s;
        }

        input[type="text"]:focus,
        textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .char-count {
          position: absolute;
          right: 10px;
          bottom: -20px;
          font-size: 0.85rem;
          color: #999;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-weight: 500;
        }

        input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .help-text {
          margin-top: 8px;
          font-size: 0.9rem;
          color: #666;
          padding-left: 30px;
        }

        .info-box {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 15px;
          margin: 30px 0;
        }

        .info-box h3 {
          margin-bottom: 15px;
          font-size: 1.2rem;
        }

        .info-box ul {
          list-style: none;
          padding: 0;
        }

        .info-box li {
          padding: 5px 0;
          font-size: 1rem;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

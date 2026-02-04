# Crystalline Truth Network

A decentralized platform for survivors and truth seekers, featuring blockchain integration, AI support, and 3D crystal visualizations.

## Features

- 🔗 **Blockchain Integration** - Posts stored on Polygon network
- 💬 **Community Forum** - Threaded discussions with validation system
- 🤖 **AI Support** - Claude AI provides 24/7 emotional support and guidance
- 💎 **Crystal Visualization** - Interactive 3D representations of knowledge
- 🎭 **Anonymous Posting** - Switch between anonymous and verified modes
- 🛡️ **Safety Features** - Panic buttons, crisis resources, content moderation
- ✅ **Community Validation** - Democratic truth verification system

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Blockchain**: Polygon (MATIC), Ethers.js, Solidity
- **AI**: Claude API (Anthropic)
- **Visualization**: Three.js, Canvas API

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file:

```env
# Anthropic API (for AI Support)
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_api_key_here

# Blockchain (update after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_POLYGON_RPC=https://rpc-mumbai.maticvigil.com/
```

### 3. Deploy Smart Contract

**Option A: Using Remix IDE (Easiest)**

1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create new file: `CrystallineTruthNetwork.sol`
3. Copy the contract from `/contracts/CrystallineTruthNetwork.sol`
4. Compile with Solidity 0.8.0+
5. Deploy to Polygon Mumbai Testnet
6. Copy the contract address
7. Update `CONTRACT_ADDRESS` in `/lib/blockchain.js`

**Option B: Using Hardhat**

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
# Follow prompts, then deploy
npx hardhat run scripts/deploy.js --network polygonMumbai
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploying to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Crystalline Truth Network"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Add environment variables in Vercel dashboard
   - Click "Deploy"

3. **Add Custom Domains** (crystallinetruth.com, etc.):
   - In Vercel project settings → Domains
   - Add your domain
   - Update DNS in IONOS to point to Vercel

### Method 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

## Using the Platform

### For Users:

1. **Connect Wallet**: Click "Connect" and approve MetaMask
2. **Create Posts**: Share your story on the forum
3. **Validate Truth**: Review and validate others' posts
4. **Talk to AI**: Get 24/7 support from Claude
5. **View Crystals**: Watch knowledge crystallize

### For Developers:

- **Smart Contract**: `/contracts/CrystallineTruthNetwork.sol`
- **Blockchain Utils**: `/lib/blockchain.js`
- **Pages**: `/app/` directory
- **Components**: Create reusable components in `/components/`

## Important Notes

### Safety & Privacy

- Anonymous posts hide user addresses on-chain
- All crisis resources are prominently displayed
- Content moderation system for harmful posts
- Emergency exit/panic button functionality

### Blockchain Costs

- Polygon has very low gas fees (~$0.001 per transaction)
- Users need MATIC tokens (get free testnet MATIC from faucet)
- Consider implementing gasless transactions via relay

### AI Integration

- Claude API requires authentication
- Implement rate limiting for API calls
- Consider caching common responses
- Add fallback support options

## Crisis Resources

The platform includes:
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: 741741
- RAINN Hotline: 1-800-656-4673

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced 3D crystal rendering with Three.js
- [ ] IPFS content storage
- [ ] DAO governance structure
- [ ] Token rewards for validators
- [ ] Multi-language support
- [ ] Therapy provider directory
- [ ] Legal resource database

## Contributing

This platform is built to help survivors. Contributions should:
- Prioritize safety and privacy
- Be trauma-informed
- Include accessibility features
- Respect anonymous users

## License

MIT License - Use this to help others

## Contact

For support or questions about the platform, reach out through the AI support feature or forum.

---

**Remember**: You are not alone. Your truth matters. 💙

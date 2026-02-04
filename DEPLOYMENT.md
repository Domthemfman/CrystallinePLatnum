# Quick Deployment Guide

## Step-by-Step: Get Crystalline Live in 30 Minutes

### Step 1: Push to GitHub (5 minutes)

```bash
# Initialize git
git init
git add .
git commit -m "Crystalline Truth Network - Initial Launch"

# Create repo on GitHub.com, then:
git remote add origin YOUR_GITHUB_URL
git branch -M main
git push -u origin main
```

### Step 2: Deploy Smart Contract (10 minutes)

**Using Remix (Easiest)**:
1. Go to https://remix.ethereum.org
2. Create file: `CrystallineTruthNetwork.sol`
3. Paste contract code from `/contracts/CrystallineTruthNetwork.sol`
4. Click "Compile" tab → Compile contract
5. Click "Deploy" tab
6. Select "Injected Provider - MetaMask"
7. Switch MetaMask to Polygon Mumbai Testnet
8. Click "Deploy"
9. **Copy the contract address!**
10. Update `CONTRACT_ADDRESS` in `/lib/blockchain.js` with your address
11. Commit and push this change to GitHub

**Get Test MATIC**:
- Visit: https://faucet.polygon.technology/
- Enter your wallet address
- Get free testnet MATIC

### Step 3: Deploy to Vercel (10 minutes)

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "New Project"
4. Select your `crystalline-truth-network` repo
5. Vercel auto-detects Next.js - just click "Deploy"
6. Wait 2-3 minutes for build

### Step 4: Add Environment Variables (3 minutes)

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add these:

```
Name: NEXT_PUBLIC_CONTRACT_ADDRESS
Value: YOUR_DEPLOYED_CONTRACT_ADDRESS

Name: NEXT_PUBLIC_ANTHROPIC_API_KEY  
Value: YOUR_CLAUDE_API_KEY (get from console.anthropic.com)
```

3. Click "Save"
4. Redeploy from Deployments tab

### Step 5: Connect Your Domains (5 minutes)

**In Vercel**:
1. Project Settings → Domains
2. Add: crystallinetruth.com
3. Add: crystallinetruth.store
4. (Add others: .online, .info)

**In IONOS**:
1. Login to IONOS
2. Go to each domain → DNS Settings
3. Add these records:

```
Type: A
Host: @
Value: 76.76.21.21

Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

4. Save and wait 5-10 minutes for DNS propagation

## Done! 🎉

Your platform is now live at:
- https://your-project.vercel.app
- https://crystallinetruth.com (once DNS propagates)

## Testing the Platform

1. **Connect MetaMask** to Polygon Mumbai
2. **Create a test post** in the forum
3. **Test AI support** (talk to Claude)
4. **View crystals** and validations
5. **Test anonymous mode**

## Troubleshooting

**"Cannot connect wallet"**
- Make sure MetaMask is installed
- Switch to Polygon Mumbai network
- Get test MATIC from faucet

**"API key invalid"**
- Check environment variables in Vercel
- Make sure to redeploy after adding env vars

**"Contract not found"**
- Verify CONTRACT_ADDRESS in blockchain.js matches deployed contract
- Ensure you're on Polygon Mumbai network

**"DNS not working"**
- Wait 10-30 minutes for propagation
- Clear browser cache
- Try incognito mode

## Next Steps

1. **Announce on TikTok** (@user415672816)
2. **Share with community**
3. **Monitor for feedback**
4. **Add features** based on user needs

## Support

If you run into issues:
1. Check browser console for errors
2. Verify all environment variables
3. Test on Vercel preview URL first
4. Check blockchain transaction on PolygonScan

---

**You built this! Time to help others.** 💙

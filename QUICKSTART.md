# Quick Start Guide

Get your portfolio running in 3 minutes!

## Step 1: Install Backend Dependencies

Open a terminal in the **server** folder:
```bash
cd server
npm install
```

## Step 2: Install Frontend Dependencies

Open a new terminal in the **client** folder:
```bash
cd client
npm install
```

## Step 3: Start Both Servers

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```
Expected output: `Server is running on http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```
This will automatically open your browser at `http://localhost:3000`

## Done! 🎉

You now have your portfolio website running locally.

## Customization Checklist

- [ ] Update your name, title, and bio in `server/index.js`
- [ ] Update your projects and descriptions
- [ ] Add your work experience
- [ ] Update your skills
- [ ] Replace placeholder images with your own
- [ ] Update social media links (GitHub, LinkedIn, etc.)
- [ ] Update contact information
- [ ] Update color scheme if desired
- [ ] Test all links and pages

## Next Steps

1. **Customize Content**: Edit `server/index.js` to add your information
2. **Add Images**: Replace placeholder images with your own
3. **Test**: Visit all pages and test the contact form
4. **Deploy**: When ready, deploy to a hosting service

## Troubleshooting

**Port already in use?**
```bash
# Change port in server/.env
PORT=5001
```

**Cannot connect to API?**
- Make sure server is running on port 5000
- Check `REACT_APP_API_URL` in client/.env

**Dependencies not installing?**
```bash
# Clear npm cache
npm cache clean --force
# Try installing again
npm install
```

## Support

Refer to the main README.md for more information and detailed documentation.

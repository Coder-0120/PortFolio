# Professional Portfolio Website

A modern, responsive portfolio website built with React and Node.js/Express.

## Features

✨ **Modern Design**
- Clean, professional UI with gradient backgrounds
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Dark mode ready

📱 **Pages**
- **Home** - Hero section with bio, featured projects, and skills
- **Projects** - Showcase your best work with descriptions and links
- **About** - Professional background, experience timeline, detailed skills
- **Contact** - Contact form with validation and social media links

🔧 **Technologies**
- Frontend: React, React Router, CSS3
- Backend: Node.js, Express
- Features: RESTful API, Form validation, Error handling

## Project Structure

```
Portfolio/
├── client/                 # React Frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navigation.js
│   │   │   └── Footer.js
│   │   ├── pages/         # Page components
│   │   │   ├── Home.js
│   │   │   ├── Projects.js
│   │   │   ├── About.js
│   │   │   └── Contact.js
│   │   ├── styles/        # Component styles
│   │   │   ├── Navigation.css
│   │   │   ├── Footer.css
│   │   │   ├── Home.css
│   │   │   ├── Projects.css
│   │   │   ├── About.css
│   │   │   └── Contact.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                # Express Backend
│   ├── index.js           # Main server file
│   ├── package.json
│   └── .env
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (if not already created):
```
PORT=5000
NODE_ENV=development
```

4. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (if not already created):
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

The client will run on `http://localhost:3000` and open automatically.

## Customization

### Update Portfolio Data

Edit the portfolio data in **server/index.js**. Change the `portfolioData` object to include:

```javascript
const portfolioData = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, State",
  bio: "Your bio text...",
  skills: { /* ... */ },
  projects: [ /* ... */ ],
  experience: [ /* ... */ ]
};
```

### Update Styling

- **Global styles**: `client/src/App.css` and `client/src/index.css`
- **Component styles**: Individual CSS files in `client/src/styles/`
- **Color scheme**: Modify CSS variables in `:root` section

### Update Images

Replace placeholder images:
- Profile photo: Update image URL in `Home.js` and `About.js`
- Project images: Update image URLs in `server/index.js` projects data
- Avatar: Update in `About.js`

## API Endpoints

### GET /api/portfolio
Returns complete portfolio data

### GET /api/projects
Returns all projects

### GET /api/experience
Returns work experience

### GET /api/skills
Returns skills by category

### POST /api/contact
Submit contact form
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

## Social Links

Update your social media links in:
- **Footer.js**: Social media icons
- **Contact.js**: Contact information section

Replace placeholder URLs with your actual profiles:
- GitHub
- LinkedIn
- Twitter
- Email

## Performance Tips

- Optimize project images (use compressed formats)
- Lazy load images for faster rendering
- Use production build for deployment
- Enable gzip compression on server
- Cache static assets

## Deployment

### Deploy Backend (Server)

Popular options:
- **Heroku**: Free tier available
- **Railway**: Easy deployment
- **Render**: Good free tier
- **AWS EC2**: Full control

Example for Heroku:
```bash
cd server
heroku create your-app-name
git push heroku main
```

### Deploy Frontend (Client)

Popular options:
- **Vercel**: Optimized for React/Next.js
- **Netlify**: Easy GitHub integration
- **GitHub Pages**: Free static hosting
- **Firebase Hosting**: Google's solution

Example for Vercel:
```bash
cd client
npm install -g vercel
vercel
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, create an issue in your repository or reach out through the contact page.

---

**Made with ❤️ | Build your awesome portfolio today!**

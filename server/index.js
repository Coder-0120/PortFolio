const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../client/public'));

// Portfolio Data
const portfolioData = {
  name: "Your Name",
  title: "Full Stack Developer",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "I'm a passionate full-stack developer with expertise in React, Node.js, and modern web technologies. I love creating beautiful and functional web applications.",
  
  skills: {
    frontend: ["React", "JavaScript", "CSS", "HTML", "React Router", "REST APIs"],
    backend: ["Node.js", "Express", "MongoDB", "RESTful APIs", "Authentication"],
    tools: ["Git", "VS Code", "Webpack", "npm", "Postman", "Docker"]
  },

  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application with payment integration, user authentication, and product management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      github: "https://github.com/yourprofile/ecommerce",
      live: "https://ecommerce-demo.com",
      image: "https://via.placeholder.com/400x300?text=E-Commerce+Platform"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
      github: "https://github.com/yourprofile/task-manager",
      live: "https://task-manager-demo.com",
      image: "https://via.placeholder.com/400x300?text=Task+Manager"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "An interactive weather dashboard displaying real-time weather data with beautiful visualizations.",
      technologies: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
      github: "https://github.com/yourprofile/weather-app",
      live: "https://weather-dashboard-demo.com",
      image: "https://via.placeholder.com/400x300?text=Weather+Dashboard"
    }
  ],

  experience: [
    {
      id: 1,
      company: "Tech Company Inc.",
      position: "Senior Developer",
      duration: "2022 - Present",
      description: "Led development of multiple full-stack projects, mentored junior developers, and improved system performance by 40%."
    },
    {
      id: 2,
      company: "Startup ABC",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      description: "Built and maintained web applications, implemented new features, and optimized database queries."
    },
    {
      id: 3,
      company: "Web Agency XYZ",
      position: "Junior Developer",
      duration: "2019 - 2020",
      description: "Developed responsive websites and maintained client projects using modern web technologies."
    }
  ]
};

// Routes
app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

app.get('/api/projects', (req, res) => {
  res.json({
    projects: portfolioData.projects,
    total: portfolioData.projects.length
  });
});

app.get('/api/experience', (req, res) => {
  res.json({
    experience: portfolioData.experience,
    total: portfolioData.experience.length
  });
});

app.get('/api/skills', (req, res) => {
  res.json(portfolioData.skills);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // In production, you would save this to a database or send an email
  console.log('New contact message:', { name, email, message });

  res.status(201).json({
    success: true,
    message: 'Your message has been received. I will get back to you soon!'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

# 🎄 Christmas Calendar Poll

A beautiful, responsive web application for organizing family advent calendar gift exchanges. Automatically assigns receiving and giving days to ensure a fair and fun Christmas calendar experience!

![Christmas Calendar Poll](https://img.shields.io/badge/React-18.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Smart Random Assignment**: Automatically distributes 24 days among 2-6 family members
- **Two-Stage System**:
  - **Stage 1**: Each person receives gifts on randomly assigned days (openly displayed)
  - **Stage 2**: Each person prepares gifts on different days (hidden by default, toggle to view)
- **Conflict Prevention**: Ensures no one prepares gifts on days they receive gifts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Material Design Inspired**: Clean, modern UI with Christmas-themed colors
- **Privacy-Friendly**: Stage 2 days remain hidden until you choose to view them

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/christmas-calendar-poll.git
   cd christmas-calendar-poll
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 📦 Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

To preview the production build locally:
```bash
npm run preview
```

## 🎮 How to Use

1. **Add Family Members**: Enter names of 2-6 family members using the input field
2. **Start Poll**: Click the "Start Poll" button to automatically assign days
3. **View Stage 1**: See when each person receives gifts (openly displayed)
4. **View Stage 2**: Click "View" buttons to reveal when each person gives gifts (hidden by default)
5. **Restart**: Click "Restart Poll" anytime to generate a new random assignment

## 🏗️ Project Structure

```
christmas-calendar-poll/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component
│   ├── App.css         # Component styles
│   ├── index.css       # Global styles with Tailwind directives
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **JavaScript ES6+**: Modern JavaScript features

## 🎨 Customization

### Changing Colors

Edit the color classes in `src/App.jsx`:
- Primary color: `red-600`, `red-700` (buttons, accents)
- Secondary color: `green-600`, `green-700` (receiving days)
- Background: `bg-gradient-to-br from-red-50 via-green-50 to-red-50`

### Adjusting Family Size

The app currently supports 2-6 family members. To change this limit, modify:
```javascript
if (familyMembers.length < 2 || familyMembers.length > 6)
```

### Modifying Days

To change from 24 days to a different number, update:
```javascript
const days = Array.from({ length: 24 }, (_, i) => i + 1);
```

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/christmas-calendar-poll",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## 🧪 Development with Claude Code

This project is optimized for development with Claude Code:

```bash
# Start Claude Code in the project directory
claude code
```

Example prompts:
- "Add a feature to export the results as PDF"
- "Implement local storage to save the poll results"
- "Add dark mode support"
- "Create unit tests for the assignment algorithm"
- "Add animations when revealing Stage 2 days"

## 📝 Algorithm Details

### Stage 1: Receiving Days
- Shuffles all 24 days randomly
- Distributes evenly among all family members
- Each member gets `24 / numMembers` days

### Stage 2: Giving Days
- Each member can only give on days they don't receive
- Uses random drawing **without replacement** (each day assigned only once)
- Prioritizes balanced distribution to ensure everyone gets equal days
- Validates that all members receive their full allocation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎅 Acknowledgments

- Inspired by personal family Christmas calendar traditions
- Built with modern React best practices
- Icons by [Lucide](https://lucide.dev/)

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/YOUR_USERNAME/christmas-calendar-poll](https://github.com/YOUR_USERNAME/christmas-calendar-poll)

---

Made with ❤️ for family Christmas traditions 🎄
# Client - MERN Auth App Frontend

A modern React-based authentication and profile management application built with Vite, React Router, TailwindCSS, and Framer Motion.

##  Features

- **Authentication Pages**: Signup, Login, OTP Verification
- **Password Management**: Forgot Password, Reset Password
- **User Profile**: View and Edit Profile
- **Modern UI**: Built with TailwindCSS and Framer Motion animations
- **Responsive Design**: Mobile-first approach

##  Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)

##  Setup Instructions

### 1. Navigate to Client Directory

```bash
cd c:\interview\assignment\mern-auth-app\client
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- React Router DOM
- TailwindCSS
- Framer Motion
- Lucide React (icons)
- Vite (build tool)

### 3. Configure API Endpoint (Optional)

If your backend server is running on a different port or host, update the API base URL in your source files. By default, the app expects the backend at `http://localhost:5000`.

##  Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:5173`
- **Network**: Check terminal output for network URL

### Production Build

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

##  Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   │   ├── Signup.jsx
│   │   ├── Login.jsx
│   │   ├── OTPVerification.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── Profile.jsx
│   │   └── EditProfile.jsx
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # TailwindCSS configuration
```

##  Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

## API Integration

The frontend communicates with the backend API at `http://localhost:5000`. Ensure the backend server is running before using the application.

### Key API Endpoints Used:
- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

##  Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

##  Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual port.

### API Connection Issues
- Ensure the backend server is running on `http://localhost:5000`
- Check browser console for CORS errors
- Verify network connectivity

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

##  Notes

- The application uses JWT tokens stored in localStorage for authentication
- All forms include client-side validation
- Protected routes redirect to login if user is not authenticated
- Modern browser support (ES6+)

##  Related

- [Backend Server README](../server/README.md)
- [Main Project Documentation](../README.md)

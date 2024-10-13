# CareerSync - Find Your Future Today!

**CareerSync** is a user-friendly job application platform built on the MERN stack, designed for both job seekers and recruiters. It allows users to easily manage job applications, search for jobs, and post new job listings. The platform features real-time notifications, profile management, and advanced job filtering to help users find the right opportunities quickly. With a focus on security and responsiveness, CareerSync ensures a smooth experience on any device, making it an ideal solution for today’s job search and recruitment needs.


## Features
 **For Job Seekers:**
- **User Registration & Login**: Secure authentication with cookie-based sessions.
- **Profile Management**: Update education, experience, skills, and upload resumes/CVs.
- **Job Search & Filter**: Advanced job search and filter options.
- **Application History**: View and track the status of past applications.
- **Company Profiles**: Explore detailed company profiles with job listings.
- **Job Detail Pages**: View detailed job descriptions with required qualifications and benefits.
- **Saved Jobs & Bookmarks**: Bookmark jobs to apply later.
- **Real-Time Notifications**: Get notified instantly about application updates or new jobs.

**For Employers (Recruiters):**
  - **Job Posting**: Easily create, update, and manage job listings.
  - **Applicant Management**: View and manage job applications, including updating statuses.
  - **Application Status Updates**: Notify applicants of their application status (e.g., accepted, rejected).
  - **Company Profiles**: Display detailed company information and current job openings.
    
**Common Features:**
  - **Responsive Design**: Optimized for mobile, tablet, and desktop use.
  - **Real-Time Notifications**: Stay updated with important alerts instantly.
  - **Modern UI**: Clean and intuitive UI using ShadCN UI.
  - **Animations**: Smooth transitions and interactive animations powered by Framer Motion.

## Deployment

The application is deployed on Netlify and can be accessed at [CareerSync](https://career-syncs.netlify.app/).

## Tech Stack
 **Frontend:**
   - **React:** Frontend library for building interactive user interfaces.
   - **Redux Toolkit:** State management to handle user authentication, job postings, and application statuses.
   - **ShadCN UI:** Component library for building modern and accessible UI.
   - **Framer Motion:** Used for adding animations to components and interactions.
   - **Axios:** For API calls to the backend.
   - **Tailwind CSS:** Utility-first CSS framework for styling.
     
 **Backend:**
   - **Node.js & Express:** Backend framework for handling API requests and routing.
   - **MongoDB & Mongoose:** NoSQL database for storing user profiles, job postings, and applications.
   - **CORS:** Middleware for enabling cross-origin resource sharing.
   - **Cookie-Parser:** Middleware for parsing cookies and managing sessions.

## Installation

### Backend

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/CareerSync.git
   cd CareerSync
   
2. Navigate to the server directory
   ```bash
   cd server
   
3. Install backend dependencies
   ```bash
   npm install

4. Create a .env file in the server directory and add the following environment variables
   ```bash
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   DEV_MODE=development
   FRONTEND_URL=http://localhost:5173

5. Start the backend server
   ```bash
   nodemon || node app.js

### Frontend

1. Navigate to the client directory

   ```bash
   cd ../client
2. Install frontend dependencies

   ```bash
   npm install

3. Create a .env file in the client directory and add the following

   ```bash
   VITE_APP_BASE_URL=http://localhost:8080/api/v1
   VITE_APP_CLOUD_NAME_CLOUDINARY=your_cloudinary_name
   VITE_APP_UPLOAD_PRESET_CLOUDINARY=your_cloudinary_preset_name
   
4. Start the frontend development server

   ```bash
   npm start


## Contributing

Contributions are welcome! If you'd like to contribute to ApexBooking Health, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)

## Contact

For any inquiries or support, please contact me at [harismohanty8658@gmail.com](mailto:harismohanty8658@gmail.com).

Thank you for using CareerSync!

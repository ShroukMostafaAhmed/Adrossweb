import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import AppLayout from "./AppLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import SkillDetails from "./pages/SkillDetails/SkillDetails.jsx";
import Downloads from "./pages/Downloads/Downloads.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import StageDetails from "./pages/StageDetails/StageDetails.jsx";
import LevelDetails from "./pages/LevelDetails/LevelDetails.jsx";
import Lessons from "./pages/Lessons/Lessons.jsx";
import LessonDetails from "./pages/Lessons/LessonDetails.jsx";
import VideoDetails from "./pages/Lessons/VideoDetails.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Calendar from "./pages/Calendar/Calendar.jsx";
import Exam from "./pages/Exam/Exam.jsx";
import ExamReviews from "./pages/Exam/ExamReviews.jsx";
import ExamResults from "./pages/Exam/ExamResults.jsx";
import Units from './pages/Units/Units.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem("Token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("Token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: token ? <AppLayout /> : <Navigate to="/login" replace />,
      children: [
        { index: true, element: <Home /> },
        { path: 'skill_details/:id', element: <SkillDetails /> },
        { path: 'downloads', element: <Downloads /> },
        { path: 'stage_details/:id', element: <StageDetails /> },
        { path: 'level_details/:id', element: <LevelDetails /> },
        { path: 'lessons', element: <Lessons /> },
        { path: 'lesson_details/:id', element: <LessonDetails /> },
        { path: 'video_details', element: <VideoDetails /> },
        { path: 'settings', element: <Settings /> },
        { path: 'profile', element: <Profile /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'Units', element: <Units /> },
        {
          path: 'exam',
          children: [
            { index: true, element: <Exam /> },
            { path: 'reviews', element: <ExamReviews /> },
            { path: 'review_solutions', element: <ExamResults /> },
          ]
        },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/login",
      element: token ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: "/register",
      element: token ? <Navigate to="/" replace /> : <Register />,
    }
  ]);

  return (
    <>
      <RouterProvider router={routes}>
        <AppLayout />
      </RouterProvider>
    </>
  )
}

export default App;

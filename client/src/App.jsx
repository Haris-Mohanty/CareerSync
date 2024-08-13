import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import Job from "./Pages/Job";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job" element={<Job />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

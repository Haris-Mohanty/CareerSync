import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" />
      </Routes>
      <NotFound/>
    </>
  );
}

export default App;

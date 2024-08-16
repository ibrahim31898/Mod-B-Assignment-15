import { Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import CreateUser from "./Components/CreateUser";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
    </Routes>
  );
}

export default App;

import { useEffect, useState } from "react";
import Tables from "../Components/Table";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCreateUser = () => {
    navigate('/create-user');
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleCreateUser}>Create New User</button>
      <Tables data={userData} setUserData={setUserData} />
    </div>
  );
}

export default Home;

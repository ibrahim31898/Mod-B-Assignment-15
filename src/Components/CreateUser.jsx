import { useState } from "react";
import { Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const CreateUser = () => {
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/users", newUser)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5">Create User</Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </Paper>
    </form>
  );
}

export default CreateUser;

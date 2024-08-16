import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import axios from 'axios';

export default function Tables({ data, setUserData }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        setUserData((prevData) => prevData.filter(user => user.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditData(user);
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:3000/users/${editId}`, editData)
      .then((res) => {
        setUserData((prevData) => prevData.map(user => user.id === editId ? res.data : user));
        setEditId(null);
        setEditData({});
      })
      .catch((err) => console.log(err));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {editId === user.id ? (
                <>
                  <TableCell component="th" scope="row">
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="text"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={handleSaveEdit}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDelete(user.id)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

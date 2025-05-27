import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const Bikes = () => {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({ modelo: '', descripcion: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const fetchMotos = async () => {
    try {
      const usuarioData = sessionStorage.getItem('usuario');
      const token = sessionStorage.getItem('token');

      if (!usuarioData || !token) {
        throw new Error('Usuario no autenticado o falta el token.');
      }

      const usuario = JSON.parse(usuarioData);
      const idUsuario = usuario.id;

      const response = await fetch('http://localhost:8080/api/v1/motos', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Error al obtener las motos.');

      const data = await response.json();
      const motosUsuario = data.filter(m => m.idUsuario === idUsuario);
      setMotos(motosUsuario);
    } catch (err) {
      setAlert({ open: true, message: err.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMotos();
  }, []);

  const handleDelete = async (idMoto) => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar esta moto?');
    if (!confirm) return;

    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/v1/motos/${idMoto}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Error al eliminar la moto.');

      setAlert({ open: true, message: 'Moto eliminada correctamente', severity: 'success' });
      fetchMotos();
    } catch (err) {
      setAlert({ open: true, message: err.message, severity: 'error' });
    }
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem('token');
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    const body = {
      ...formData,
      idUsuario: usuario.id,
      idParqueadero: usuario.parqueadero,
    };

    const url = editIndex === null
      ? 'http://localhost:8080/api/v1/motos'
      : `http://localhost:8080/api/v1/motos/${motos[editIndex].idMoto}`;

    const method = editIndex === null ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Error al guardar la moto.');

      setAlert({ open: true, message: 'Moto guardada correctamente', severity: 'success' });
      fetchMotos();
      handleCloseForm();
    } catch (err) {
      setAlert({ open: true, message: err.message, severity: 'error' });
    }
  };

  const handleOpenForm = (index = null) => {
    if (index !== null) {
      const moto = motos[index];
      setFormData({ modelo: moto.modelo, descripcion: moto.descripcion });
      setEditIndex(index);
    } else {
      setFormData({ modelo: '', descripcion: '' });
      setEditIndex(null);
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setFormData({ modelo: '', descripcion: '' });
    setEditIndex(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Mis Motos</Typography>

      <Button
      
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpenForm()}
        sx={{ mb: 2, color: '#222', backgroundColor: '#fde480'}}
      >
        Agregar Moto
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {motos.map((moto, index) => (
              <TableRow key={moto.idMoto}>
                <TableCell>{moto.idMoto}</TableCell>
                <TableCell>{moto.modelo}</TableCell>
                <TableCell>{moto.descripcion}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenForm(index)} sx={{ color: '#8f8f8f' }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(moto.idMoto)} sx={{ color: '#dc3545' }}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {motos.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No tienes motos registradas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>{editIndex !== null ? 'Editar Moto' : 'Agregar Moto'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Modelo"
            fullWidth
            value={formData.modelo}
            onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Bikes;

import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
  IconButton, Select, MenuItem
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const Spaces = () => {
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const fetchEspacios = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/v1/espacios', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('No se pudieron obtener los espacios.');
      const data = await response.json();
      setEspacios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEspacios();
  }, []);

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await fetch(`http://localhost:8080/api/v1/espacios/${toDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEspacios(prev => prev.filter(e => e.id !== toDelete));
      setOpenDeleteDialog(false);
    } catch (err) {
      console.error('Error al eliminar espacio:', err);
    }
  };

  const handleFormSubmit = async () => {
    const token = sessionStorage.getItem('token');
    const method = editData?.id ? 'PUT' : 'POST';
    const url = editData?.id
      ? `http://localhost:8080/api/v1/espacios/${editData.id}`
      : 'http://localhost:8080/api/v1/espacios';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
      if (!response.ok) throw new Error('Error al guardar el espacio');
      fetchEspacios(); // recargar
      setOpenForm(false);
      setEditData(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEdit = (espacio) => {
    setEditData(espacio);
    setOpenForm(true);
  };

  if (loading) return <p>Cargando espacios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-layout">
      <h2>Gestión de Espacios</h2>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => {
          setEditData({ id: '', parqueadero: 1, estado: 1 });
          setOpenForm(true);
        }}
        sx={{ mb: 2 }}
      >
        Agregar Espacio
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Parqueadero</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {espacios.map((espacio) => (
              <TableRow key={espacio.id}>
                <TableCell>{espacio.id}</TableCell>
                <TableCell>{espacio.parqueadero}</TableCell>
                <TableCell>{estadoNombre(espacio.estado)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(espacio)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => {
                    setToDelete(espacio.id);
                    setOpenDeleteDialog(true);
                  }}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogo para crear/editar */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{editData?.id ? 'Editar Espacio' : 'Nuevo Espacio'}</DialogTitle>
        <DialogContent>
          <TextField
            label="ID del espacio"
            fullWidth
            margin="normal"
            value={editData?.id || ''}
            onChange={(e) => setEditData({ ...editData, id: e.target.value })}
            disabled={!!editData?.id}
          />
          <Select
            fullWidth
            margin="normal"
            value={editData?.estado || 1}
            onChange={(e) => setEditData({ ...editData, estado: e.target.value })}
          >
            <MenuItem value={1}>Disponible</MenuItem>
            <MenuItem value={2}>Ocupado</MenuItem>
            <MenuItem value={3}>Reservado</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleFormSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmación de eliminación */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>¿Eliminar espacio?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Función auxiliar para mostrar el nombre del estado
const estadoNombre = (estado) => {
  switch (estado) {
    case 1: return 'Disponible';
    case 2: return 'Ocupado';
    case 3: return 'Reservado';
    default: return 'Desconocido';
  }
};

export default Spaces;

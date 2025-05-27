import React, { useEffect, useState } from 'react';
import {
  TextField, Button, Typography, Paper
} from '@mui/material';
import Loading from '../components/Loading'

const Profile = () => {
    const [usuario, setUsuario] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [passwordSaving, setPasswordSaving] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const getToken = () => sessionStorage.getItem('token');

    useEffect(() => {
        const token = getToken();
        const usuarioData = sessionStorage.getItem('usuario');

        if (!usuarioData || !token) {
            setError('Usuario no autenticado o falta el token.');
            setLoading(false);
            return;
        }

        setUsuario(JSON.parse(usuarioData));
        setLoading(false);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const startEdit = () => {
        setFormData({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            parqueadero: 1
        });
        setSuccessMessage('');
        setError(null);
        setEditMode(true);
    };


    const handleSave = async () => {
      const token = getToken();
      setSaving(true);
      setSuccessMessage('');
      setError(null);

      try {
          const response = await fetch(`http://localhost:8080/api/v1/usuarios/${usuario.id}`, {
              method: 'PUT',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          if (!response.ok) {
              const errorBody = await response.json();
              throw new Error(errorBody.message || 'Error al actualizar el perfil');
          }

          const updated = await response.json();
          setUsuario(updated);
          sessionStorage.setItem("usuario", JSON.stringify(updated));
          setEditMode(false);
          setSuccessMessage('Perfil actualizado correctamente');
      } catch (err) {
          setError(err.message);
      } finally {
          setSaving(false);
      }
    };


    const handlePasswordUpdate = async () => {
        const token = getToken();
        if (!newPassword.trim()) {
            setError('La nueva contraseña no puede estar vacía.');
            return;
        }

        setPasswordSaving(true);
        setError(null);
        setSuccessMessage('');

        fetch(`http://localhost:8080/api/v1/usuarios/${usuario.id}/contrasenia`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contraseniaActual: currentPassword,
                nuevaContrasenia: newPassword
            })
        })
        .then(response => {
            if (response.ok) {
                setSuccessMessage("Contraseña cambiada correctamente");
                setCurrentPassword('');
                setNewPassword('');
            } else if (response.status === 400) {
                setError("Contraseña actual incorrecta.");
            } else {
                setError("Error desconocido al cambiar la contraseña.");
            }
        })
        .catch(error => {
            console.error("Error al cambiar contraseña:", error);
        })
        .finally(() => {
            setPasswordSaving(false); 
        });
    };


  
    if (loading) return <Loading />;
    if (error) return <Typography color="error">Error: {error}</Typography>;
    if (!usuario) return <Typography>No hay datos disponibles</Typography>;

    return (
        <Paper className="container-layout" elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Mi Perfil</Typography>

        {editMode ? (
            <>
            <TextField
                label="Nombre"
                name="nombre"
                value={formData.nombre || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Apellido"
                name="apellido"
                value={formData.apellido || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Correo"
                name="correo"
                value={formData.correo || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            <div style={{ marginTop: 16 }}>
                <Button onClick={() => setEditMode(false)} sx={{ mr: 2 }}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave} disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
            </>
        ) : (
            <>
            <Typography><strong>Nombre:</strong> {usuario.nombre}</Typography>
            <Typography><strong>Apellido:</strong> {usuario.apellido}</Typography>
            <Typography><strong>Correo:</strong> {usuario.correo}</Typography>
            <Typography><strong>Parqueadero:</strong> {usuario.parqueadero}</Typography>
            <Typography><strong>Roles:</strong> {usuario.roles?.join(', ')}</Typography>

            <div style={{ marginTop: 16, display: 'flex', gap: 20}}>
                <button className='button1' onClick={startEdit}>
                    Editar Perfil
                </button>
                <button className="button2" 
                    onClick={() => setShowPasswordForm(prev => !prev)}
                >
                    Cambiar Contraseña
                </button>
            </div>
            </>
        )}

        {/* Formulario de cambio de contraseña */}
        {showPasswordForm && (
            <div style={{ marginTop: 20 }}>
            <Typography variant="h6" gutterBottom>Cambiar Contraseña</Typography>
            <TextField
                label="Contraseña Actual"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Nueva contraseña"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handlePasswordUpdate}
                disabled={passwordSaving}
            >
                {passwordSaving ? 'Guardando...' : 'Actualizar Contraseña'}
            </Button>
            </div>
        )}

        {successMessage && (
            <Typography color="success.main" sx={{ mt: 2 }}>{successMessage}</Typography>
        )}
        </Paper>
    );
};

export default Profile;

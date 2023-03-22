import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { CrearLugares } from '../api';


function CrearLugar() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDes] = useState("");
    const [tipo, setTipo] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [imagen_url, setImagen_url] = useState("");
    const [user_creador, setUser_creador] = useState("");

    let token = localStorage.getItem("token");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        CrearLugares(nombre, descripcion, tipo, ubicacion, imagen_url, user_creador, token);

        setNombre("");
        setDes("");
        setTipo("");
        setUbicacion("");
        setImagen_url("");
        setUser_creador("");
    };

    return(
        <>
        <h1 id='form-title'>Crear nuevo lugar</h1>

        <form
            className="root"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <br></br>
            <br></br>
            <div className='fields'>
            <TextField
                    label="Nombre"
                    type="string"
                    autoComplete="false"
                    helperText='El nombre debe ser unico'
                    value={nombre}
                    onChange={(e: any) => setNombre(e.target.value)}
                />
                <br></br>
                <br></br>
            <TextField
                    label="Descripcion"
                    type="string"
                    autoComplete="false"
                    value={descripcion}
                    onChange={(e: any) => setDes(e.target.value)}
                />
                <br></br>
                <br></br>
            <TextField
                    label="Tipo"
                    type="string"
                    autoComplete="false"
                    value={tipo}
                    onChange={(e: any) => setTipo(e.target.value)}
                />
                <br></br>
                <br></br>
                <TextField
                    label="URL ubicacion"
                    type="string"
                    autoComplete="false"
                    value={ubicacion}
                    onChange={(e: any) => setUbicacion(e.target.value)}
                />
                <br></br>
                <br></br>
                <TextField
                    label="URL de la imagen"
                    type="string"
                    autoComplete="false"
                    value={imagen_url}
                    onChange={(e: any) => setImagen_url(e.target.value)}
                />   
                <br></br>
                <br></br>
                <TextField
                    label="Usuario Creador"
                    type="string"
                    autoComplete="false"
                    value={user_creador}
                    onChange={(e: any) => setUser_creador(e.target.value)}
                />
                </div>      
            
            <br></br>
            <Button variant='contained' color="primary" type="submit">Crear Lugar
            </Button>    
        </form></>
    );

}

export default CrearLugar;
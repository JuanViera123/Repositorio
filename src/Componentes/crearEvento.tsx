/* eslint-disable react-hooks/rules-of-hooks */
import { TextField, TextFieldProps } from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { CrearEventos } from '../api';

import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Form, Row } from 'react-bootstrap';

function crearEvento() {
    const [nombre, setNombre] = useState("");
    const [lugar, setLugar] = useState("");
    const [fecha, setFecha] = useState("");
    const [user_creador, setUser_creador] = useState("");
    
  
    let token = localStorage.getItem("token");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        CrearEventos(nombre, lugar, fecha, user_creador, token);

        setNombre("");
        setLugar("");
        setFecha("");
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
                    label="Lugar"
                    type="string"
                    autoComplete="false"
                    value={lugar}
                    onChange={(e: any) => setLugar(e.target.value)}
                />
                <br></br>
                <br></br>
                <div>
                   
             <div className="col-md-4">
              <Form.Group controlId="dob" onChange={(e)=>{
               const target = e.target as HTMLTextAreaElement;
              console.log(target?.value)
            }}>
               <Form.Label>Elegir Fecha de Evento</Form.Label>
                <Form.Control
                type="date"
                name="dob"
                placeholder="Date of Birth"
               />
             </Form.Group>
           </div>
        
           </div>
          

                <br></br>
                /* <div className="wrapper">  
      <div className="filtro-fecha">
        <div className="datePicker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
              label="Fecha hasta"
           
             
            />
        </LocalizationProvider>
        </div>
      </div>
      </div>*/
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
            <Button variant='contained' color="primary" type="submit">Crear Evento
            </Button>    
        </form></>
    );

}

export default crearEvento;
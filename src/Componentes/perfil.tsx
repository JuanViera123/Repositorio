import React, { useEffect, useState } from 'react';
import './perfil.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { fetchLugares, fetchUser, fetchUserById } from '../api';
import { checkHasToken } from '../utils';
import { CardContent, Grid, Input, TextField, Typography } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
function Perfil() {
  const [state, setState] = useState<any>({});
  const user_id = localStorage.getItem('user_id');
  useEffect(() => {
    fetchUserById(user_id).then(async (data: any) => {
        setState({user: data});
    });
}, []);
   
  if(!checkHasToken()){
      window.location.replace("/Login");
      return null;
      }

      const token = localStorage.getItem('token');

    const onLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

      return (
        <>
            <Card>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                Usuario: {state?.user?.username}
                </Typography>
                <Typography gutterBottom variant='h5' component='div'>
                Email: {state?.user?.email}
                </Typography><br></br>
                <div ><Button className='botoniz' href='/CrearLugar'> Crear Lugar </Button></div><br></br>
                <div ><Button className='botoniz'> Crear Evento </Button></div><br></br>
                <div ><Button className='botoniz' href='/LugaresGuardados'> Lugares Guardados </Button></div><br></br>
                <div ><Button className='botoniz'> Eventos Guardados </Button></div><br></br>
                {(Boolean(token) && <Button className="botoniz" onClick={onLogout}> Cerrar Sesión </Button>)}
            </CardContent>
            </Card>
            
        </>
      )
}

export default Perfil;
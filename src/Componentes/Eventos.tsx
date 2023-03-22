import React, { useEffect, useState } from 'react';
import './Eventos.css';
import Card from 'react-bootstrap/Card';
import { checkHasToken, redirectToLugares } from '../utils';
import { fetchEventos } from '../api';
import Home from './Home';
import { CardGroup, Col, Form, Row } from 'react-bootstrap';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Eventos(props?: any) {
const [eventos, setEventos] = useState<any>();

useEffect(() => {
  if(!props.evento){fetchEventos().then((data: any) => setEventos(data));}
  else{
    setEventos(props.evento);
  }
}, []);

const [selectedDateHasta, setSelectedDateHasta] = useState<Date | null>(
  new Date('2020-09-11T12:00:00')
)

const handleDateChangeHasta = (dateHasta: React.SetStateAction<Date | null>) => {
  setSelectedDateHasta(dateHasta)
}

if(!checkHasToken()){
  window.location.replace("/Login");
  return null;
  }
  const redirectToEvento = (id : any) => {
    window.location.assign(`/evento/${id}`);
  }
  return (
    
    <>
    {/* <div className="wrapper">  
      <div className="filtro-fecha">
        <div className="datePicker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
              label="Fecha hasta"
              inputFormat="DD/MM/YYYY"
              value={selectedDateHasta}
              onChange={handleDateChangeHasta}
             
            />
        </LocalizationProvider>
        </div>
      </div>
      </div>*/}
      <div className='App container'>
            {eventos?.map((evento: any) => (
              <>
                <Card  onClick={() => redirectToEvento(evento?.id)} key={evento.attributes.nombre} style={{ width: '18rem', margin: '15px' }}>
                  <Card.Body>
                    <Card.Title>{evento?.attributes?.nombre}</Card.Title>
                    <Card.Text>
                      {evento?.attributes?.fecha}
                    </Card.Text>
                  </Card.Body>
                </Card><br />
              </>
            ))}
        </div>
   
      </>
  );
}

export default Eventos;

//  <Card onClick={() => redirectToEvento(evento?.id)} key={evento?.id} style={{ width: 'auto' }}>
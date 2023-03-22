import React, { useEffect, useState } from 'react';
import './lugares.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { fetchLugares, fetchLugarPorTipoAguas, Filtro } from '../api';
import Home from './Home';
import { checkHasToken } from '../utils';
import { Button } from 'react-bootstrap';
import { RadioGroup } from '@mui/material';


function Lugares(props?: any) {

const [lugares, setLugares] = useState<any>();
const buscarLugar = (e: { target: { value: any; }; })=> {
  Filtro(e.target.value).then((data: any) => setLugares(data))
  }

const redirectToLugar = (id : any) => {
  window.location.assign(`/lugar/${id}`);
}
useEffect(() => {
  if(!props.lugares){fetchLugares().then((data: any) => setLugares(data));}
  else{
    setLugares(props.lugares);
  }
}, []);

const handleChangeRadioButton = (event: { target: {value: any; }; }) => {

  let subs = event.target.value.split(' ');

  fetchLugarPorTipoAguas(subs[1]).then((data: any) => setLugares(data));
};

const handleResetearFiltro = () => {
  fetchLugares().then((data: any) => setLugares(data));
};

if(!checkHasToken()){
  window.location.replace("/Login");
  return null;
  };

  return (
    <><div className='body'>
      <div className='Busqueda'>      
      <input className='search' onChange={buscarLugar} type="text" placeholder='Search' />
      <br></br>
      <div onChange={() => handleChangeRadioButton}>
        <input type="radio" value="Aguas tranquilas" name="Tipo" />Aguas Tranquilas
        <input type="radio" value="Aguas bravas" name="Tipo" />Aguas Bravas
      </div>     
      <Button className='btn-filtro' onClick={handleResetearFiltro} variant='primary'>
        Resetear Filtro
      </Button>
      </div>
      <br></br>   
      <CardGroup> 
      <Row xs={1} md={4} className="g-4">        
      {lugares?.map((lugar: any) => (
        <Col>
          <Card  style={{ width: 'auto' }}>
            <Card.Img variant="top" src={lugar?.attributes?.imagen_url} onClick={() => redirectToLugar(lugar?.id)} key={lugar?.id}/>
            <Card.Body>
            <Card.Title>{lugar?.attributes?.nombre}</Card.Title>
              <Card.Text>
              {lugar?.attributes?.descripcion}
              </Card.Text>
            </Card.Body>          
          </Card>
        </Col>
      ))}
    </Row>
    </CardGroup>
      
      
    </div>
    </>
  );
}

export default Lugares;
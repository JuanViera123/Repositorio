import React, { useEffect, useState } from 'react';
import './lugar.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { crearReviewLugar, fetchLugar, fetchReviewPorLugar, GuardarLugar, reviewLugar} from '../api';
import { checkHasToken } from '../utils';
import { useParams } from 'react-router-dom';
import { CardActions, CardContent, TextField, Typography } from '@mui/material';

function Lugar() {
    const [lugar, setLugar] = useState<any>(null);
    const [rating, setRating] = useState("");
    const [comentario, setComentario] = useState("");
    const [reviews, setReviews] = useState([]);

    let token = localStorage.getItem('token');
    let userId = lugar?.attributes?.user_creador.data.id;
    let{id} = useParams();
    
    useEffect(() => {
      fetchLugar(id).then((data: any) => setLugar(data));
      fetchReviewPorLugar(id).then((data: any) => setReviews(data));
    }, []);
    
    const redirectToUser = (username: string) => {
      window.location.assign(`/user/${username}`)
    }
    if(!checkHasToken()){
      window.location.replace("/Login");
      return null;
      }

    const handleCargarReview = async (e: any) => {
      e.preventDefault();
      crearReviewLugar(comentario, rating, id, userId, token);
      fetchReviewPorLugar(id).then((data: any) => setReviews(data));
      alert("Creado correctamente");
      setRating("");
      setComentario("");
    };

    const handleSubmit = async (lugar: any) => {
      let user = localStorage.getItem('user_id');
      let token = localStorage.getItem('token');
      GuardarLugar(lugar, user, token);
      alert('Lugar guardado');
    }
      return (
        <div>        
          <br></br>   
          <CardGroup> 
          <Row xs={1} md={3} className="g-4"> 
            <Col>
              <Card  key={lugar?.attributes?.id} style={{ width: '50rem' }}>
                <Card.Img variant="top" src={lugar?.attributes?.imagen_url} />
                <Card.Body>
                  <Card.Title>{lugar?.attributes?.nombre}</Card.Title>
                  <Card.Text>
                  {lugar?.attributes?.descripcion}
                  </Card.Text>
                  <Button href={lugar?.attributes?.ubicacion} variant="primary" style={{justifyContent: 'left'}}>
                  Ver en google maps
                </Button><br></br>
                <Button id='btSave' onClick={(e:any) => handleSubmit(lugar?.id)} variant="primary">Guardar</Button>
                <br></br>
                <br></br>
                
                <br></br>
                <Button onClick={() => redirectToUser(lugar?.attributes?.user_creador.data.attributes.username)}>{lugar?.attributes?.user_creador.data.attributes.username}</Button>
                </Card.Body>          
              </Card>
            </Col>
        </Row>     
        </CardGroup>
        <Form 
          className="root"
          noValidate
          autoComplete="off"
          onSubmit={handleCargarReview}>
        <div className='fields'>
            <TextField
                    label="Rating"
                    type="string"
                    autoComplete="false"
                    value={rating}
                    onChange={(e: any) => setRating(e.target.value)}
                />
                <br></br>
                <br></br>
            <TextField
                    label="Comentario"
                    type="string"
                    autoComplete="false"
                    value={comentario}
                    onChange={(e: any) => setComentario(e.target.value)}
                />
                <br></br>
                <br></br>
            
                </div>      
            <Button variant='contained' color="primary" type='submit'>Enviar</Button>
            </Form>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className='reviews'>
            {reviews?.map((review: any) => (
              <>
              <Row xs={1} md={3} className="g-4"> 
            <Col>
              <Card className='card'>
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  {review?.attributes?.rating}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {review?.attributes?.comentario}
                </Typography>
              </CardContent>
              </Card>
              <Card>
              <br></br>
              <CardActions>
              <Typography variant='body2' color='text.secondary'>
                  Usuario Creador: {review?.user?.data?.attributes?.username}
                </Typography>
              <Button onClick={() => redirectToUser(lugar?.attributes?.user_creador.data.attributes.username)}>
              {lugar?.attributes?.user_creador.data.attributes.username}
              </Button>
              </CardActions>
              </Card>
              </Col>
              </Row>
              </>
            ))}
          </div>
          
        </div>
        
        );
    }
    
    export default Lugar;
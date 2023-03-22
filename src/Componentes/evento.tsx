import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { crearReviewEvento, fetchEvento, fetchReviewPorEvento, GuardarEvento} from '../api';
import { checkHasToken } from '../utils';
import { Form, useParams } from 'react-router-dom';
import { CardActions, CardContent, TextField, Typography } from '@mui/material';


function Evento() {
    const [evento, setEvento] = useState<any>(null);
    const [rating, setRating] = useState("");
    const [comentario, setComentario] = useState("");
    const [reviews, setReviews] = useState([]);
    let{id} = useParams();
    let token = localStorage.getItem('token');
    let userId = evento?.attributes?.user_creador.data.id;
    
    useEffect(() => {
      fetchEvento(id).then((data: any) => setEvento(data));
    }, []);
    
    const redirectToUser = (username: string) => {
      window.location.assign(`/user/${username}`)
    };

    const handleCargarReview = async (e: any) => {
      e.preventDefault();
      crearReviewEvento(comentario, rating, id, userId, token);
      fetchReviewPorEvento(id).then((data: any) => setReviews(data));
      alert("Creado correctamente");
      setRating("");
      setComentario("");
    };

    const handleSubmit = async (lugar: any) => {
      let user = localStorage.getItem('user_id');
      let token = localStorage.getItem('token');
      GuardarEvento(evento, user, token);
      alert('Lugar guardado');
    };

    if(!checkHasToken()){
      window.location.replace("/Login");
      return null;
      }
    
      return (
        <div>         
          <CardGroup> 
          <Row xs={1} md={3} className="g-4"> 
            <Col>
              <Card  key={evento?.attributes?.id} style={{ width: '50rem' }}>
                <Card.Body>
                  <Card.Title>{evento?.attributes?.nombre}</Card.Title>
                  <Card.Text>
                  {evento?.attributes?.fecha}
                  </Card.Text>
                <br></br>
                <br></br>
                <br></br>
                <Button onClick={() => redirectToUser(evento?.attributes?.user_creador.data.attributes.username)}>{evento?.attributes?.user_creador.data.attributes.username}</Button><br></br>
                <Button id='btSave' onClick={(e:any) => handleSubmit(evento?.id)} variant="primary">Guardar</Button>
                </Card.Body>          
              </Card>
            </Col>
        </Row>     
        </CardGroup>
        <br></br>
        <div 
          className="root"
          
          
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
          </div>
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
              <Button onClick={() => redirectToUser(evento?.attributes?.user_creador.data.attributes.username)}>
              {evento?.attributes?.user_creador.data.attributes.username}
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
    
    export default Evento;
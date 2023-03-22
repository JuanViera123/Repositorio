import { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { eliminarlugar, fetchLugaresGuardados } from "../api";
import { checkHasToken } from "../utils";
import './LugaresGuardados.css';

function LugaresGuardados() {
    const[lugares, setLugares] = useState([]);
    let user = localStorage.getItem('user_id');
    let token = localStorage.getItem("token");
    
    useEffect(() => { 
        fetchLugaresGuardados(user).then((data: any) => setLugares(data));
    }, []);

    const redirectToLugar = (id : any) => {
        window.location.assign(`/lugar/${id}`);
      };

    const handleSubmit = async (lugar: any) => {
        eliminarlugar(lugar, token);
        alert("se elimió correctamente");
        fetchLugaresGuardados(user).then((data:any) => setLugares(data));
    }

      if(!checkHasToken()){
        window.location.replace("/Login");
        return null;
        };
    return(
        <>
            <div className="App container">
            {lugares?.map((lugar: any) => (
        <Col>
          <Card onClick={() => redirectToLugar(lugar?.id)} key={lugar?.id} style={{ width: 'auto' }}>
            <Card.Img variant="top" src={lugar?.attributes?.imagen_url} />
            <Card.Body>
            <Card.Title>{lugar?.attributes?.nombre}</Card.Title>
              <Card.Text>
              {lugar?.attributes?.descripcion}
              </Card.Text>
              <div className="contolBtns">
              <Button href={lugar?.attributes?.ubicacion} variant="primary" style={{justifyContent: 'left'}}>
                  Ver en google maps
                </Button>
                <Button id="btnDelete" onClick={(e:any) => handleSubmit(lugar?.id)} variant="primary">
                    Eliminar
                </Button>
              </div>
            </Card.Body>          
          </Card>
        </Col>
      ))}
            </div>
        </>
    )
}
export default LugaresGuardados;
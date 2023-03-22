import './inicio.css';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import Carousel from 'react-bootstrap/Carousel';
import { checkHasToken } from '../utils';



function Inicio(){ 

  if(!checkHasToken()){
    window.location.replace("/Login");
    return null;
    }

    return(

      <>
      <p>Bienvenidos</p>
      <p>Aqui encontaras los lugares perfectos para practicar canotaje, ademas de <br></br>unirte u organizar competencias.</p>
      <div id='carousel'>
      <Carousel >
      <Carousel.Item >
        <img
          className="d-block w-100"
          src="https://pbs.twimg.com/media/FeyoixsWQAEXs3T?format=jpg&name=900x900"
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mejorconsalud.as.com/fitness/wp-content/uploads/2019/04/mujeres-realizando-canotaje.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.rionegro.com.ar/wp-content/uploads/2021/09/240435515_2605513206422381_133521585139958360_n.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
      </>
)}
  
  export default Inicio;
  
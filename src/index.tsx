import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Lugares from './Componentes/lugares';
import Eventos from './Componentes/Eventos';
import Home from './Componentes/Home';
import Inicio from './Componentes/inicio';
import Login from './Componentes/Login';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Lugar from './Componentes/lugar';
import Perfil from './Componentes/perfil';
import User from './Componentes/User';
import Evento from './Componentes/evento';
import CrearLugar from './Componentes/CrearLugar';
import Registro from './Componentes/registro';
import LugaresGuardados from './Componentes/LugaresGuardados';
import crearEvento from './Componentes/crearEvento';
import CrearEvento from './Componentes/crearEvento';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <React.StrictMode>
    <Fragment>
      <Home/>
      <Router>
        <Routes>
         <Route path="/" element={<Inicio />}/>
          <Route path="/Eventos" element={<Eventos />}/>
          <Route path="/lugares" element={<Lugares />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/inicio" element={<Inicio />}/> 
          <Route path='/lugar/:id' element={<Lugar/>}/>      
          <Route path='/perfil' element={<Perfil/>}/> 
          <Route path='/user/:username' element={<User/>}/>  
          <Route path='/evento/:id' element={<Evento/>}/>    
          <Route path='/CrearLugar' element={<CrearLugar/>}/>
          <Route path='/crearEvento' element={<CrearEvento/>}/>
          <Route path='/Registro' element={<Registro/>}/> 
          <Route path='/LugaresGuardados' element={<LugaresGuardados/>}/> 
        </Routes>
      </Router>
    </Fragment>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

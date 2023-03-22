export const fetchEventos = (user_id?: string) => {
    if(user_id){
      return fetch(`http://localhost:1337/api/eventos?populate=deep&filters[user_creador][id][$eq]=${user_id}`)
        .then(response => response.json())
        .then(
          (resultadoApi) => {
            return resultadoApi.data;
          }
        )}
        else{
          return fetch("http://localhost:1337/api/eventos?populate=deep")
          .then(response => response.json())
        .then(
          (resultadoApi) => {
            return resultadoApi.data;
          }
        )
        }
};

export const login = (user: string, password: string) => {
    fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        identifier: user,
        password: password
    })
      }).then((respo) => respo.json())
      .then((res) => {
            if(res?.jwt){
              localStorage.setItem("token", res?.jwt);
              localStorage.setItem("user_id", res?.user?.id);
              window.location.reload();
            }else{
              alert("Usuario invalido, revise sus credenciales");
            }
      });
}

export const registro = (user: string, email: string, password: string) => {
    fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      username: user,
      email: email,
      password: password
  })
    }).then((respo) => respo.json())
    .then((res) => {
          if(res?.jwt){
            sessionStorage.setItem("token", res?.jwt);
            sessionStorage.setItem("user_id", res?.user?.id);
            window.location.reload();
          }else{
            alert("Datos invalidos");
          }
    });
};

export const fetchLugares = (user_id?: string) => {
  if(user_id){
    return fetch(`http://localhost:1337/api/lugares?populate=deep&filters[user_creador][id][$eq]=${user_id}`)
      .then(response => response.json())
      .then(
        (resultadoApi) => {
          return resultadoApi.data;
        }
      )}
      else{
        return fetch("http://localhost:1337/api/lugares?populate=deep")
        .then(response => response.json())
      .then(
        (resultadoApi) => {
          return resultadoApi.data;
        }
      )
      }
};

export const fetchLugar = (id?: string) => {
  return fetch(`http://localhost:1337/api/lugares/${id}?populate=deep`
  )
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const reviewLugar = () => {
  return fetch("http://localhost:1337/api/review-lugares?populate=deep")
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const perfil = () => {
  return fetch("http://localhost:1337/api/auth/local/register")
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const Filtro= (nombre? : string) => {
  return fetch(`http://localhost:1337/api/lugares?populate=deep&filters[nombre][$contains]=${nombre}`)
  .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const fetchUser = (username?: string) => {
  return fetch(`http://localhost:1337/api/users?filters[username][$eq]=${username}`)
  .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi[0];
      }
    )
};

export const fetchEvento = (id?: string) => {
  return fetch(`http://localhost:1337/api/eventos/${id}?populate=deep`
  )
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};
export const fetchUserById = (id: any) => {
  return fetch(`http://localhost:1337/api/users/${id}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi;
      }
    )
};
export const CrearLugares = (nombre: string, descripcion: string, tipo: string, ubicacion: string, imagen_url: string, user_creador: string, token: any) => {
  return fetch("http://localhost:1337/api/lugares?populate=deep", {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + token
  },
  body: JSON.stringify({
  "data":{
  "nombre": nombre,
  "descripcion": descripcion,
  "tipo": tipo,
  "ubicacion": ubicacion,
  "imagen_url": imagen_url,
  "user_creador": user_creador
  }
})
  }).then((respo) => respo.json())
  .then((res) => {
    if(res?.data){
      console.log(token);
      alert("Creado correctamente");
      window.location.reload();
    }else{
      console.log(token);
      alert("Error al crear lugar - revise los campos");
    }
    
  })
};

export const eliminarlugar = (idLugar: string, token: any) => {
  return fetch(`http://localhost:1337/api/lugares-guardados/${idLugar}`, {
    method: "DEL",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + token
  }})
  .then(response => response.json())
};

export const fetchLugaresGuardados = (user_id?: any, token?: any) => {
  return fetch(`http://localhost:1337/api/lugares-guardados?populate=deep&filters[user][id][$eq]=${user_id}`, {
    method: "GET",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + token
  },
})
.then(response => response.json())
.then(
  (resultadoApi) => {
    console.log(token);
    return resultadoApi.data;
  }
)
};

export const GuardarLugar = (user: string, lugar: any, token: any) => {
  return fetch(`http://localhost:1337/api/lugares-guardados?populate=deep`, {
    method: "POST",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + token
  },
  body: JSON.stringify({
    'user': user,
    'lugar': lugar
    
})
})
};

export const fetchLugarPorTipoAguas = (tipo?: string) => {
  return fetch(`http://localhost:1337/api/lugares?populate=deep&filters[tipo][$contains]=${tipo}`)
  
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        console.log(tipo);
        return resultadoApi.data;
      }
    )
};

export const fetchReviewPorLugar = (idLugar?: string) => {
  return fetch(`http://localhost:1337/api/review-lugares?populate=deep&filters[lugar][id][$eq]=${idLugar}`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
};

export const crearReviewLugar = (comentario: string, rating: string, lugar: any, user: number, token: any) => {
  return fetch(`http://localhost:1337/api/review-lugares?populate=deep`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + token
    },
    body: JSON.stringify({
    "data":{
    "comntario": comentario,
    "rating": rating,
    "Lugar": lugar,
    "user": user
    }})}
  )};

  export const fetchReviewPorEvento = (idEvento?: string) => {
    return fetch(`http://localhost:1337/api/review-eventos?populate=deep&filters[evento][id][$eq]=${idEvento}`)
      .then(response => response.json())
      .then(
        (resultadoApi) => {
          return resultadoApi.data;
        }
      )
  };
  
  export const crearReviewEvento = (comentario: string, rating: string, lugar: any, user: number, token: any) => {
    return fetch(`http://localhost:1337/api/review-eventos?populate=deep`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token
      },
      body: JSON.stringify({
      "data":{
      "comntario": comentario,
      "rating": rating,
      "Lugar": lugar,
      "user": user
      }})}
    )};

    export const GuardarEvento = (user: string, evento: any, token: any) => {
      return fetch(`http://localhost:1337/api/eventos-guardados?populate=deep`, {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token
      },
      body: JSON.stringify({
        'user': user,
        'evento': evento
    })
    })
    };

    
export const CrearEventos = (nombre: string, idLugar: string, fecha: string, user_creador: string, token: any) => {
    return fetch("http://localhost:1337/api/eventos?populate=deep", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + token
    },
    body: JSON.stringify({
    "data":{
    "nombre": nombre,
    "idLugar": idLugar,
    "fecha": fecha,
    "user_creador": user_creador
    }
  })
    }).then((respo) => respo.json())
    .then((res) => {
      if(res?.jwt){
        localStorage.setItem("token", res?.jwt);
        localStorage.setItem("user_id", res?.user?.id);
        window.location.reload();
      }else{
        alert("Error al crear evento - revise los campos");
      }
      
    })
  };

  export const fetchEventoEntreFechas = (fechaDesde?: string, fechaHasta?: string) => {
    return fetch(`${URL}/eventos?populate=deep&filters[fecha][$gte]=${fechaDesde}&fiters[fecha][$lte=${fechaHasta}]`)
    .then(response => response.json())
    .then(
      (resultadoApi) => {
        return resultadoApi.data;
      }
    )
  };



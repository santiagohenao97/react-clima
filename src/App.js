import React, { useState, useEffect } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Clima from './componentes/Clima';
import Error from './componentes/Error';


function App() {
  // state del formulario
  const [busqueda, setBusqueda]= useState({
    ciudad: '',
    pais: ''
  })
  const [consultar, setConsultar] = useState(false) //Para no hacer la consulta a la API si no hasta que se oprima el botón
  const [resultado, setResultado] = useState({})
  const [error, setError] = useState(false)
 
  const {ciudad, pais} = busqueda

  useEffect(() => {

    
      const consultarAPI= async () =>{

        if(consultar){
          const appId= '080d4325599c17f7bd4986fe158499bf'
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&id=524901&appid=${appId}`

          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          setResultado(resultado)
          setConsultar(false)

            // Detecta si hubo resultados correctos en la consulta
            if(resultado.cod === "404") {
              setError(true);
          } else {
              setError(false);
          }

        }
        console.log(consultar)     
    }
    consultarAPI()
    // eslint-disable-next-line
  }, [consultar])


  let componente;
  if(error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima 
                    resultado={resultado}
                />
  }


  return (
    <div className="App">
      <header className="App-header">
        
          <Header titulo="Clima React App"/>
          <div className="contenedor-form">
            <div className="container">
              <div className="row">
                <div className="col m6 s12">
                  <Formulario busqueda={busqueda} setBusqueda={setBusqueda} setConsultar={setConsultar}/>
                </div>
                <div className="col m6 s12">
                    {componente}
                </div>
              </div>
            </div>
          </div>
       
      </header>
    </div>
  );
}

export default App;

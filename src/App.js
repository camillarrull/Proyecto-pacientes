import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario.js'
import Cita from './components/Cita.js';



function App() {

    //Citas en LOCALSTORAGE
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (!citasIniciales) {
        citasIniciales = [];
    }

    //Arreglo de citas
    const [citas, guardarCitas] = useState([citasIniciales]);

    //UseEffect para realizar ciertas operaciones cuando el state cambia. Siempre es arrow function y se utiliza cuando el componente esta listo o cuando algo cambia. Para decirle que solo se ejecute una vez, hay que pasarle un [] vacio.
    useEffect(() => {
        let citasIniciales = JSON.parse(localStorage.getItem('citas'));
        if (citasIniciales) {
            localStorage.setItem('citas', JSON.stringify(citas))
        } else {
            localStorage.setItem('citas', JSON.stringify([]))
        }
    }, [citas]);

    //Funcion que tome las citas actuales y agregue la nueva
    const crearCita = cita => {
        guardarCitas([
            ...citas,
            cita
        ]);
        //citas.push(cita) PODRIA SER PERO EN REACT HAY QUE USAR LAS FUNCIONES QUE MODIFICAN EL STATE
    }

    //Funcion que elimina una cita por su ID
    const eliminarCita = id => {
        const nuevasCitas = citas.filter(cita => cita.id !== id);
        guardarCitas(nuevasCitas)
    }

    //Mensaje condicional
    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';


    return (
        <Fragment>
            <h1>administrador de pacientes</h1>
            <div className='container'>
                <div className='row'>
                    <div className='one-half column'>
                        <Formulario
                            crearCita={crearCita} />
                    </div>
                    <div className='one-half column'>
                        <h2>{titulo}</h2>
                        {citas.map(cita => (
                            <Cita
                                key={cita.id}
                                cita={cita}
                                eliminarCita={eliminarCita}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </Fragment>
    );
}

export default App;

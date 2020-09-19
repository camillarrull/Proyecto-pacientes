import React, { Fragment, useState } from 'react';
import shortid from 'shortid';
import PropType from 'prop-types';

const Formulario = ({ crearCita }) => {
    //crear State de citas

    const [cita, actualizarCita] = useState({
        mascota: '',
        dueno: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //CREAMOS UN SEGUNDO STATE PARA CUANDO HAY UN ERROR (empieza en false pues al principio del formulario no haye rrores)
    const [error, actualizarError] = useState(false)

    // funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })

    }
    //lo de arriba es una forma sencilla de leer el contenido de lo que el usuario escribe y ponerlo en el state al mismo tiempo


    //Extraer los valores: aplicamos destructuring al state para tener las variables, sino deberiamos poner ej: console.log(cita.mascota)
    const { mascota, dueno, fecha, hora, sintomas } = cita;

    //Cuando el usuario apreta agregar cita
    const submitCita = e => {
        e.preventDefault();

        //Validar formulario
        if (mascota.trim() === '' || dueno.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true)
            //en la validacion siempre que hay un problema hay que poner un return para que no se continue ejecutando el codigo
            return;
        }
        //Eliminar mensaje previo si se soluciona el error
        actualizarError(false)


        //Asignar un ID : instalamos una libreria que se llama uuid o shortid
        cita.id = shortid();


        // Crear una cita : hay que ponerlas en el componente principal (app) para que se vayan mostrando
        crearCita(cita)

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            dueno: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }
    return (
        <Fragment>
            <h2>Crear cita</h2>
            {
                //pasamos el error aca
                error ? <p className='alerta-error'>Todos los campos son obligatorios</p>
                    : null
            }

            <form
                onSubmit={submitCita}>
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='nombre mascota'
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueno</label>
                <input
                    type='text'
                    name='dueno'
                    className='u-full-width'
                    placeholder='nombre dueno de mascota'
                    onChange={actualizarState}
                    value={dueno}
                />
                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    name='sintomas'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={sintomas}>

                </textarea>
                <button type='submit'
                    className='u-full-width button-primary'>Agregar cita</button>
            </form>
        </Fragment>
    );
}
Formulario.prototype = {
    crearCita: PropType.func.isRequired
}
export default Formulario;
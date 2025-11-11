import React from 'react'
import '../css/Error.css'
import {Button} from 'react-bootstrap'

const Error = () => {
    return (
        <div className='error'>
            <br />
            <h3>Pagina no encontrada</h3>
            <br />
            <img src={"https://http.cat/images/404.jpg"} alt="" />
            <br /><br /><br />
            <Button><a href="/">Volver al Inicio</a></Button>
        </div>
    )
}

export default Error
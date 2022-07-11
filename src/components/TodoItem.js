import React from "react";
import './estiloNotas.css';

export function TodoItem(props) {

    return (
        <li className="list-group-item Title style-list ul-1 cuadro-sombra margin transicion inclinacion inclinacion2 inclinacion3 resaltar resaltar2"> 
        <h2>{props.nombre}</h2> <p className="texto-parrafo">{props.descripcion}</p> 
        </li>
    )
}
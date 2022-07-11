import React, { Fragment, useRef, useState, useEffect} from "react";
import { TodoItem } from "./TodoItem";
import { CheckNota } from "./CheckNota";
import {v4 as uuid} from "uuid";
import './estiloNotas.css';

export function TodoList() {

  
    const [nota, setNota] = useState([]);
 

    const titulo = useRef();
    const desc = useRef();


    const KEY = "todolist-nota";


    // Obtener desde el localStorage la lista de notas, bajo el nombre
    // "todolist-nota", y las carga en el array "tareas" en el primer renderizado
    useEffect(() => {
      const notaStorage = JSON.parse(localStorage.getItem(KEY));
      console.log(notaStorage);
       setNota( (notaAnteriores) => {
          return [...notaAnteriores, ...notaStorage];
        });
    }, [] );

    // Almacena en el localStorage las notas bajo el nombre
    // clave "todolist-notas" cada vez que se produce un cambio en la lista
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(nota));
    }, [nota] );

    //Toma el valor del checkbox, si esta desmarcado es True, sino es False

    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => { 
        
        setIsChecked(!isChecked);
        };

    


         

    function agregarTarea() {
        const value = titulo.current.value;
        const value2 = desc.current.value;
        
        if (value2 === '') return;
        console.log(value);
        console.log(value2);
        console.log(uuid());

        
        
        // Objeto con 3 propiedades: id, valor, valor2
        const nuevaNota = {
                id: uuid(),
                valor: value, 
                valor2: value2
                }
   

        // Agregar nueva nota a la lista
        setNota( (notaAnterior) => {
            return [...notaAnterior, nuevaNota];
        });
    }

    
    return (
        <Fragment>
            <div className="p-4 xl-1 bg-light text-dark">
                <h1 className="container p-4 col-md-10 text-center text-black bg-info bg-opacity-10 rounded"> POST IT!</h1>

                <div className="container p-4 col-md-10 bg-white text-dark rounded  ">
                    <div className="row g-3 ">
                        <div className="col-md-4">
                            <input ref={titulo} type="text" className="form-control" placeholder="Titulo"/>
                        </div>
                        
                        <div className="col-md-5">
                            <input ref={desc} type="text" className="form-control" placeholder="Descripción"/>
                        </div>

                        <div className="form-check col-auto px-4">
                            <input type="checkbox" className="form-check-input" checked={isChecked} onChange={handleOnChange}/>
                            <label className="form-check-label" for="gridCheck"> Importante! </label>
                            
                        </div>

                        <div className="col-auto px-4">
                            <button onClick={agregarTarea} className="btn btn-success ms-2"> + Agregar </button>
                        </div>
                    </div>
                </div>

                <div className="container mt-4 col-md-10 bg-white text-dark rounded">
                    <div className="row g-3 ">
                        <ul className="ul-1" >
                            {nota.map((i)=><TodoItem key={i.id} nombre={i.valor} descripcion={i.valor2}></TodoItem>)}
                            
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

import React from 'react';
import { Link } from "react-router-dom";

export default function BoardElement(props){
    const path = `/${props.name}`;
    return (
        <div className='card bg-light'>
            <div className='card-header'>
                <h5 className='text-center m-2'>{props.name}</h5>
            </div>
            <div className='card-body'>
                <Link type='button' role='button' className='btn btn-light btn-block' to={path}>Open</Link>
            </div>
        </div>
    );
}
import React from 'react';

export default function NewCard(props){
    return (
        <div className='card bg-light p-2'>
            <textarea className='form-control' row='3'
            onChange={(e) => props.onNameChange(e.target.value)}
            placeholder='Card name'></textarea>
        </div>
    );
}
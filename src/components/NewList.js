import React, { useState } from 'react';

export default function NewList(props){
    const [name, nameChangeHandler] = useState('New list');
    const handler = name => props.handleClick(name);
    return (
        <div className='card new-list bg-light card-columns'>
            <div className='card-header'>
                <input className='form-control' onChange={(e) => nameChangeHandler(e.target.value)}
                onKeyDown={e => e.key === 'Enter' ? handler(name) : null} placeholder='List name' />
            </div>
            <div className='card-body'>
                <button className='btn btn-light btn-block' onClick={() => handler(name)}>Add new list</button>
            </div>
        </div>
    );
}
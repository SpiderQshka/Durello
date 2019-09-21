import React from 'react';

export default function Card(props){
    return (
        <div className='card bg-light' draggable="true" onDragStart={(e) => {
            e.dataTransfer.setData('text', JSON.stringify({
                card: props.cardName,
                list: props.listName
            }));
        }}>
            <div className='card-body'>
                <p>{props.cardName}</p>
            </div>
        </div>
    );
}
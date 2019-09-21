import React, { useState } from 'react';
import Card from './Card.js';
import NewCard from './NewCard.js';

const allowDrop = (e) => {
    e.preventDefault();
}

export default function List(props){
    const [cardName, cardNameChangeHandler] = useState('Hey, I am a card!');
    const drop = (e) => {
        e.preventDefault();
        const {card: droppedCard, list: listCardOwner} = JSON.parse(e.dataTransfer.getData('text'));
        props.handlers.cardChangeHandler(props.boardName, props.list.name, droppedCard, listCardOwner)
    }
    return (
        <div className='card bg-light card-columns'>
            <div className='card-header'>
                <h4 className='text-center'>{props.list.name}</h4>
            </div>
            <div className='card-body' onDrop={(e) => drop(e)}
                onDragOver={(e) => allowDrop(e)}>
                <NewCard onNameChange={name => cardNameChangeHandler(name)} />

                {props.list.cards !== [] &&
                    props.list.cards.map((element, i) =>
                        <Card cardName={element} key={i}
                        handlers={props.handlers} listName={props.list.name}/>
                    )
                }
            </div>
            <div className='card-footer'>
                <button className='btn btn-light btn-block' onClick={() => 
                    props.handlers.cardChangeHandler(props.boardName, props.list.name, cardName)
                }>Add new card</button>
            </div>
        </div>
    );
}
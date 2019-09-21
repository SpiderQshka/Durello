import React from 'react';
import NewBoard from './NewBoard.js';
import BoardElement from './BoardElement.js';
import '../styles/index.scss';

function Index(props){
    return (
        <main className='main container'>
                <div className='card-field'>
                    <NewBoard handleClick={(name) => props.handlers.boardChangeHandler(name)} />
                    {props.boards !== [] &&
                        props.boards.map((element, i) =>
                        <BoardElement name={element.name} key={i} />)
                    }
                </div>
        </main> 
    );
}

export default Index;
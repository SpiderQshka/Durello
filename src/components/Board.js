import React from 'react';
import List from './List.js';
import NewList from './NewList.js';
import NotFound from './NotFound.js';

export default function Board(props){
    const boardName = props.match.params.board;
    const isUrlRight = props.boards.some((board) => board.name === boardName);
    if(isUrlRight){
        const lists = props.boards.filter(board => board.name === boardName)[0].lists;
        return (
            <main className='main container'>
                <div className='card-field'>
                    <NewList handleClick={(listName) =>
                        props.handlers.listChangeHandler(boardName, listName)}
                    />
                    {lists !== [] &&
                        lists.map(
                            (element, i) => <List
                                list={element} boardName={boardName} key={i} handlers={props.handlers}
                            />
                        )
                    }
                </div>
            </main>
        );
    }

    return <NotFound />
}
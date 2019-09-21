import React, { useState, useEffect } from 'react';
import Index from './Index.js';
import Board from './Board.js';
import Header from './Header.js';
import NotFound from './NotFound.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const useStateWithLocalStorage = (localStorageKey) => {
  const [boards, boardsUpdateHandler] = useState(
    JSON.parse(localStorage.getItem("boards")) || []
  );

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  return [boards, boardsUpdateHandler];
}

const updateBoards = (boards, newBoardName) => {
  const isBoardNameUnic = !boards.some((board) => board.name === newBoardName);
    if(isBoardNameUnic){
      const boardObject = {
        name: newBoardName,
        lists: []
      }

      return [boardObject, ...boards];

    }

    return boards
}

const updateLists = (boards, boardName, newListName) => {
  const lists = boards.filter(board => board.name === boardName)[0].lists;
  const isNameUnic = !lists.some((list) => list.name === newListName);
  if(isNameUnic){
    const updatedLists = [
          {
              name: newListName,
              cards: []
          },
          ...lists];

    const updatedBoards = boards.map((board) => {
      if(board.name === boardName){
          return {
              name: boardName,
              lists: updatedLists
          }
      }
      return board
    });

    return updatedBoards;
    
  }

  return boards
}

const updateCards = (boards, boardName, listName, cardName) => {
  const board = boards.filter(board => board.name === boardName)[0];
  const list = board.lists.filter(list => list.name === listName)[0];
  const inNameUnic = !list.cards.some(name => name === cardName);
  const updatedCards = inNameUnic ? [ cardName, ...list.cards ] : list.cards;
  const updatedLists = board.lists.map((list) => {

      if(list.name === listName){
          return {
              name: listName,
              cards: updatedCards
          }
      }
      return list
  });
  const updatedBoards = boards.map(board => {
      if(board.name === boardName){
          return {
              name: board.name,
              lists: updatedLists
          }
      }
      return board
  });
  
  return updatedBoards;
}

const dragNDropUpdate = (boards, boardName,
                        [listNameForCard, listNameWithoutCard],
                        cardName) => 
{
  const board = boards.filter(board => board.name === boardName)[0];
  const listForCard = board.lists.filter(list => list.name === listNameForCard)[0];
  const listWithoutCard = board.lists.filter(list => list.name === listNameWithoutCard)[0];
  const inNameUnic = !listForCard.cards.some(name => name === cardName);
  const cardsWithNewCard = inNameUnic ? [ cardName, ...listForCard.cards ] : listForCard.cards;
  const cardsWithoutNewCard = listWithoutCard.cards.filter(card => card !== cardName);
  const updatedLists = board.lists.map(list => {
    if(list.name === listForCard.name){
      return {
        name: listForCard.name,
        cards: cardsWithNewCard
      }
    }
    else if(list.name === listWithoutCard.name){
      return {
        name: listWithoutCard.name,
        cards: cardsWithoutNewCard
      }
    }
    return list;
  });
  const updatedBoards = boards.map(board => {
    if(board.name === boardName){
        return {
            name: board.name,
            lists: updatedLists
        }
    }
    return board
  });

  return updatedBoards;
}

function App() {

  const [boards, boardsUpdateHandler] = useStateWithLocalStorage('boards');

  const boardChangeHandler = (boardName) => {
      const updatedBoards = updateBoards(boards, boardName)
      boardsUpdateHandler(updatedBoards);
  };

  const listChangeHandler = (boardName, listName) => {
    const updatedBoards = updateLists(boards, boardName, listName);
    boardsUpdateHandler(updatedBoards);
  };

  const cardChangeHandler = (boardName, listName, cardName, listNameForDND = null) => {
    const updatedBoards = listNameForDND ?
                        dragNDropUpdate(boards, boardName, [listName, listNameForDND], cardName) :
                        updateCards(boards, boardName, listName, cardName);

    boardsUpdateHandler(updatedBoards);
  };

  const handlers = {
    boardChangeHandler,
    listChangeHandler,
    cardChangeHandler
  }

  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" render={(props) => <Index {...props} handlers={handlers} boards={boards} />} />
        <Route exact path="/:board" render={(props) => <Board {...props} handlers={handlers} boards={boards} />} />
        <Route component={NotFound} />
      </Switch>
      
    </Router>
    
  );
}

export default App;

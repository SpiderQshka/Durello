import React, { useState } from "react";

export default function NewBoard(props) {
  const [name, nameChangeHandler] = useState("New board");
  const handler = (name) => props.handleClick(name);
  return (
    <div className="card new-list bg-light card-columns">
      <div className="card-header">
        <input
          className="form-control"
          onChange={(e) => nameChangeHandler(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handler(name) : null)}
          placeholder="Board name"
        />
      </div>
      <div className="card-body">
        <button
          className="btn btn-light btn-block"
          onClick={() => handler(name)}
        >
          Add new board
        </button>
      </div>
    </div>
  );
}

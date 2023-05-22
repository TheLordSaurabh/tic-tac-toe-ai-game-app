import React from 'react';

import "./RedoButton.css";



export const RedoButton = ({redo}) => {
    return (
        <button className="reset-btn" onClick={redo}>Redo</button>
    )
}

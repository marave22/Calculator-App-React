import React from 'react';
import './Input.css';

const Input = ( props ) => {
    return (
        <div className="number_input">
            {props.value}
        </div>
    )
};

export default Input;
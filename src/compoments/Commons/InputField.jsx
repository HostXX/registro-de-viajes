import React from 'react';

const InputField = (props) => {
    return (
        <div>
            <input 
            type={props.type ? props.type : "text"} 
            onChange={props.onChange} 
            value={props.value} 
            id={props.id} 
            name={props.name} 
            />

        </div>
    );
}

export default InputField;

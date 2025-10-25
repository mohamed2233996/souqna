import React from 'react';

const MainBtn = (props) => {
    return (
        <button
            className={`main-btn px-6 py-3 rounded-full mx-auto font-bold transition-colors duration-300 
            bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/50
            ${props.className || ''}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default MainBtn;

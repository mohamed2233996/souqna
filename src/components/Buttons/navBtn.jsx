import React from 'react';

const NavBtn = (props) => {
    return (
        <button
            onClick={props.onClick}
            className="text-white bg-primary font-bold border border-primary py-2 rounded-xl px-3 hover:bg-transparent hover:text-primary transition-colors duration-300"
        >
            {props.children}
        </button>
    );
}

export default NavBtn;

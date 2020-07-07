import React from 'react';


const Spinner = (props) =>{
    return(
        <div className = "ui active dimmer">
            <div className = " ui big text loader">
               {props.message}
            </div>
        </div>
    );
};
//will put defult properties if not given like message
Spinner.defaultProps = {
    messsage : 'Loading ...'
};

export default Spinner;
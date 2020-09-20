import React, {useContext } from 'react';
import {CSSTransition} from 'react-transition-group'
import { AlertContext } from '../context/alert/AlertContext';

const Alert = ( ) => {
    const {alert, hide}  = useContext(AlertContext);
    // if(!alert.visible){
    //     return null; 
    // }
    document.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode === 27) {
            hide();
        }
    };
    return(
        <CSSTransition
            in={alert.visible}
            timeout={{
                enter: 500,
                exit: 300
            }}
            classNames={'alert'}
            mountOnEnter
            unmountOnExit
        >

        <div className={`alert mt-4 alert-${alert.type || 'warning' } alert-dismissible `} >
            <p>{alert.text }</p>
            <button onClick={hide} className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        </CSSTransition>
    )
};

export default Alert;
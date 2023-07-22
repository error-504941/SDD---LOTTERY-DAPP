import React from 'react';
import classes from './Modal.module.css';

import  ReactDOM  from 'react-dom';

const Backdrop = props =>{
    return  <div className={classes.backdrop} onClick={props.closeModal}/>;
}


const ModalOverlay = props =>{
    let size = classes.default;
    let className = [classes['modal-centered']];
    className.push(classes.centered);
    let icon = classes['size-icon-default']
    if(props.size != null){
       switch(props.size){
            case "small":
                size = classes.small;
                icon = classes['size-icon-small']
            break;
            case "medium":
                size = classes.medium;
                icon = classes['size-icon-medium']
            break;
            case "large":
                size = classes.large;
                icon = classes['size-icon-large']
            break;
       }
    }

    className.push(size);

    if(props.type === undefined){
        className.push(classes.default);
    }
    else
    {
        className.push(classes[props.type]);
    }
  
    return( 
        <div className={`${classes.darkBG}`}>
            <div className={className.join(' ')}>
                <span className={`${classes.closeBtn} ${classes['close-centered']} ${icon}`} onClick={props.closeModal}>
                    <i className={`bx bx-x ${classes.sizeIcon} `}></i>
                </span>
                <div className={`${classes.centered} ${classes.align}`}>
                    {props.children}
                </div>
            </div>
        </div>
   );
}

const Modal = (props) => {
    return (
       <React.Fragment>
        {ReactDOM.createPortal(
            <Backdrop closeModal={props.closeModal}/>, 
            document.getElementById('backdrop-root'))
        }
        
        {ReactDOM.createPortal(
            <ModalOverlay 
                size={props.size}
                closeModal={props.closeModal}
                children={props.children}/>, 
                document.getElementById('overlay-root'))}
       </React.Fragment>
    );
};



export default Modal;
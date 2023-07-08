import React from 'react';
import Modal from '../Modal/Modal';
import classes from './Message.module.css'
const Message = (props) => {
    return (
        <Modal size='small' type={props.type} align={classes.align} closeModal={props.onClose}>
           <h2 className={classes.title}>{props.title}</h2>
            <span className={classes.label}>{props.message}</span>
        </Modal>
    );
};

export default Message;
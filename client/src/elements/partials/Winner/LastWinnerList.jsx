import React from 'react';
import classes from './LastWinnerList.module.css'
const LastWinnerList = (props) => {

    let lastWinner = props.lastWinner.map((winner, index)=>
        <li key = {'winner-' + index}>
        <span className={classes.win}>{winner.price} ETH</span>
        <span className={`${classes.ticket} ${classes.margin}`}>{winner.ticketId.substring(0, 20)}...</span>
        <span className={classes.date}>{winner.close}</span>
        </li>
    );
    return (
        <React.Fragment>
            <ul className={classes['list_content']}>
                <li  key = {'header'} className={classes['list_header']}>
                    <span className={classes.win}><i></i>Vincita</span>
                    <span className={classes.ticket}><i></i>Ticket</span>
                    <span className={classes.date}><i></i>Data</span>
               </li>
                {lastWinner}
            </ul>
        </React.Fragment>
    );
};

export default LastWinnerList;
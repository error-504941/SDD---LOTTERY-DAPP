import React from 'react';
import classes from './CurrentWinner.module.css'
const CurrentWinner = (props) => {
    let controlObj = Object.keys(props.winner);
    return (
        <React.Fragment>
            {controlObj.length === 0 && null}
            {controlObj.length > 0  && 
            <div className={classes.wrap}>
                <ul className={classes['Lottery-winner-details']}> 
                    <li key='end-date'>{props.winner.close}</li> 
                    <li key='ticket'>{`${props.winner.ticketId}`}</li>
                    <li key='price'>{`${props.winner.price} ETH`}</li>
                </ul>
            </div>
            }
        </React.Fragment>
    );
};

export default CurrentWinner;
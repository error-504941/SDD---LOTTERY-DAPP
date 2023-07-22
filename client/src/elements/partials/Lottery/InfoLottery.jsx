import React from 'react';
import classes from './InfoLottery.module.css'
import Loader from '../../../components/Loader/Loader';
const InfoLottery = (props) => {
    return (
        <React.Fragment>
           {props.info.loading && <Loader/>}
           {!props.info.loading && 
            <ul className={classes.infoList}>
                <li><span className={classes.bold}> Lotteria n°{props.info.numLotteries}</span></li>
                <li><span>Costo del biglietto: {props.info.price} ETH</span></li>
                <li><span>Durata della lotteria: {props.info.duration} min</span></li>
                <li><span className={classes.small}>è prevista una tassa sulla vincita</span></li>
                <li className={`${classes['small-alert']}`}><a>per ulteriori informazioni<i className='bx bxs-info-circle'></i></a></li>
            </ul>}
        </React.Fragment>
    );
};

export default InfoLottery;
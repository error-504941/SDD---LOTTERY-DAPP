import React from 'react';
import SimpleCard from '../../components/Cards/SimpleCard';
import classes from './Content.module.css'
import InfoLottery from '../partials/Lottery/InfoLottery'
import winLottery from '../../assets/win.jpg'
const LeftBar = (props) => {
    console.log(props);
    return (
        <div className={classes.column}>
            <div style={{order: 1}}>
                <div className={`${classes.smallImage} ${classes.item}`}>
                    <img src={winLottery}></img>
                </div>
            </div>
            <div className={classes.infoLottery} style={{order: 2}}>
               <SimpleCard className={classes.cardsWinner} title="Info e Regolamenti">
                    <InfoLottery info={props.ticketInfo}/>
               </SimpleCard>
            </div>
        </div>
    );
};

export default LeftBar;
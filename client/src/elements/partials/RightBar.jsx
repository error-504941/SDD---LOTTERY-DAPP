import React from 'react';
import classes from './Content.module.css'
import LastWinnerList from './Winner/LastWinnerList';
import SimpleCard from '../../components/Cards/SimpleCard';
import Counter from './Lottery/Counter';
import bannerLottery from '../../assets/banner.png'
const RightBar = (props) => {
    return (
        <div className={`${classes.column}`}>
            <SimpleCard className={classes.cardsCounter}>
                <Counter counter={props.counter}/>
            </SimpleCard>
           { props.lastWinner.length > 0 ?
                <SimpleCard title="Ultime Vincite" className={classes.cardsWinner}>
                        <LastWinnerList lastWinner={props.lastWinner}/>
                    </SimpleCard>  :
                     <div className={`${classes.smallBanner} ${classes.itemBanner}`}>
                        <span className={classes.bannerLabel}></span>
                        <img src={bannerLottery}></img>
                        <span className={classes.bannerLabel}></span>
                 </div>}
        </div>
    );
};

export default RightBar;
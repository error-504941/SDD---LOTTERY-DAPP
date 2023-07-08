import React from 'react';
import classes from './Content.module.css'
import LotteryBody from './Lottery/LotteryBody';
import SimpleCard from '../../components/Cards/SimpleCard';

const Center = (props) => {

    return (
        <div className={`${classes.column } ${classes.collottery}`}>
            <div>
                <SimpleCard className={classes.lotto}>
                    <LotteryBody/>
                </SimpleCard>
            </div>
        </div>
    );
};

export default Center;
import React, { useEffect, useState } from 'react';
import { useLotteryBody } from '../../../store/redux-lottery';
import moment from 'moment';
import classes from './Counter.module.css'
const _min = '00';
const _sec = '00';
const Counter = (props) => {
    const [timer, setTimer] = useState({
        minutes: _min,
        seconds: _sec
    });
    const useCounter = useLotteryBody();

    useEffect(()=>{
        const countdown = setTimeout(()=>{
            setNewTime();
        }, 1000)

        return () => clearTimeout(countdown);
    }, [timer]);

    const setNewTime = () =>{
        const currentTime = new Date();
        if(currentTime > useCounter.expiration){
            setTimer(prevTime =>{
                return(
                    {
                        minutes: _min,
                        seconds: _sec
        
                    }
                );
            });
            return;
        } 

        const time = new Date(useCounter.expiration).getTime() - new Date().getTime();
        // const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);

        // minutes = minutes.padStart(2, '0');
        // seconds = seconds.padStart(2, '0');
        setTimer(prevTime =>{
            return(
                {
                    minutes: String(minutes).padStart(2, '0'),
                    seconds: String(seconds).padStart(2, '0')
    
                }
            );
        });

    }

    return (
        <div className={classes['counter-container']}>
            <div className={classes['counter-wrap']}>
                <span className={classes['counter-min']}>{timer.minutes}</span>
                <span className={classes['double-dot']}>:</span>
                <span className={classes['counter-sec']}>{timer.seconds}</span>
            </div>
        </div>
    );
};

export default Counter;


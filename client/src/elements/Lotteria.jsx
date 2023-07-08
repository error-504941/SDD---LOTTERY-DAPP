import React, {useEffect, useState } from 'react';
import Header from './partials/Header/Header';
import LeftBar from './partials/LeftBar';
import RightBar from './partials/RightBar';
import Center from './partials/Center';
 import {lotteryService, lotteryDate, lotteryState} from '../contracts/LotteryContract'
import { useLottery } from '../store/redux-lottery';
const Lotteria = () => {
    // const [lotteryGeneric, setLotteryGeneric] = useState({
    //     'ticketInfo': {},
    //     'lastWinner':[]
    // });
    const stateLottery = useLottery();
    const updateLottery = useLottery((state) => state.updateLottery);

    const [loading, setLoading] = useState(false);

    const [lottery, setLottery] = useState({
        'numTicket': 0,
        'start': '',
        'expiration': ''
    });

    const [state, setState] = useState(1);
    useEffect(()=>{
        updateLottery();   

        // lotteryDate().then((val)=>{
        //     setLottery(val);
        //     setLoading(false);
        // });

        // lotteryState().then( val =>{
        //     setState(val);
        // })

    },[]);


    useEffect(() =>{
        if(new Date() > lottery.expiration ){
            lotteryState().then( val =>{
                setState(val);
            })
        }
    });

  
    return (
        <React.Fragment>
           {/* HEADER */} 
           <Header lotteryState={state}/>
           {/**CONTENT */}
           <div style={{
                display: "flex",
                height: "700px",
                marginTop: "20px"
           }}>
                <LeftBar ticketInfo={stateLottery.ticketInfo}/>
                <Center/>
                <RightBar lastWinner={stateLottery.lastWinner} counter={lottery}/>
            </div>
        </React.Fragment>
    );
};

export default Lotteria;

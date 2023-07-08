import React, {useEffect} from 'react';
import Header from './partials/Header/Header';
import LeftBar from './partials/LeftBar';
import RightBar from './partials/RightBar';
import Center from './partials/Center';
import { useLottery, useLotteryStatus, useLotteryBody } from '../store/redux-lottery';

const Lotteria = () => {
    const stateLottery = useLotteryStatus((state) => state.updateStatus);
    const updateLottery = useLottery((state) => state.updateLottery);
    const updateLotteryBody = useLotteryBody((state) => state.updateLottery);
   
    const lottery = useLotteryBody();
    const ticket = useLottery();
    //mount point
    useEffect(() =>{
        updateLottery();
        stateLottery();
        updateLotteryBody();
    }, []);

    //aggiorni la lotteria ogni 15 sec
    useEffect(() =>{
        const delayed = setTimeout(() =>{
        updateLotteryBody();

        }, 15000);

        return () => clearTimeout(delayed);
    });


    useEffect(() =>{
        if(new Date() >= lottery.expiration){
            stateLottery();
        }
    });
    
    return (
        <React.Fragment>
           {/* HEADER */} 
            <Header/>
           {/**CONTENT */}
           <div style={{
                display: "flex",
                height: "700px",
                marginTop: "20px"
           }}>
                <LeftBar ticketInfo={ticket.ticketInfo}/>
                <Center/>
                <RightBar lastWinner={ticket.lastWinner} counter={lottery.expiration}/>
            </div>
        </React.Fragment>
    );
};

export default Lotteria;

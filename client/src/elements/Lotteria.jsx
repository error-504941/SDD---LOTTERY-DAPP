import React, {useEffect} from 'react';
import Header from './partials/Header/Header';
import LeftBar from './partials/LeftBar';
import RightBar from './partials/RightBar';
import Center from './partials/Center';
import { useLottery, useLotteryStatus, useLotteryBody } from '../store/redux-lottery';
import { isMobile, isMobileTablet } from '../utils/checkDevice';

const Lotteria = () => {
    const stateLottery = useLotteryStatus((state) => state.updateStatus);
    const updateLottery = useLottery((state) => state.updateLottery);
    const updateLotteryBody = useLotteryBody((state) => state.updateLottery);

    let mobile = isMobile();
    let tablet = isMobileTablet();
    if(mobile){
        document.body.classList.add('mobile-device');
    }
    else if(tablet){
        document.body.classList.add('tablet-device');
    }
    else{
        document.body.classList.add('desktop-device');
    }
   
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
                marginTop: "20px",
                flexDirection: mobile ? 'column': 'none',
                overflow: mobile ? 'scroll': 'auto'
           }} >
                <LeftBar ticketInfo={ticket.ticketInfo}/>
                <Center/>
                <RightBar lastWinner={ticket.lastWinner} counter={lottery.expiration}/>
            </div>
        </React.Fragment>
    );
};

export default Lotteria;

import React, {useState} from 'react';
import SimpleCard from '../../components/Cards/SimpleCard';
import classes from './Content.module.css'
import InfoLottery from '../partials/Lottery/InfoLottery'
import winLottery from '../../assets/iconLottery.png'
import daily from '../../assets/daily.jpeg'
import { isMobile } from '../../utils/checkDevice';
const LeftBar = (props) => {
    let defaultValue = true;
    let mobile = isMobile();
    if(mobile){
        defaultValue = false;
    }
    const [openTab, setOpenTab] = useState(defaultValue);

    const openHandler = () =>{
        setOpenTab(prev => !prev);
    }
    return (
        <div className={`${classes.column} ${classes.lastElement}`}>
            <div style={{order: 1}}>
                <div className={`${classes.smallImage} ${classes.item}`}>
                    <img src={mobile ? daily :winLottery}></img>
                </div>
            </div>
            <div className={classes.infoLottery} style={{order: 2}}>
               <SimpleCard className={classes.cardsWinner} title="Info e Regolamenti" onClick={openHandler} icons={mobile && 'bx bx-info-circle'}>
               {openTab && <InfoLottery info={props.ticketInfo}/>}
               </SimpleCard>
            </div>
        </div>
    );
};

export default LeftBar;
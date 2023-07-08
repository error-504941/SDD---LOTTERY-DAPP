import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import { AuthContext } from '../../../store/auth-context';
import classes from './LotteryBody.module.css'
import Button from '../../../components/Button/Button'
import banner from '../../../assets/Banner.jpg'
import Loader from '../../../components/Loader/Loader'
import { enterLottery } from '../../../contracts/LotteryContract';
import Message from '../../../components/Message/Message'
import Wrapper from '../../../components/Helpers/Wrapper'
import { useLotteryBody, useTicketUser } from '../../../store/redux-lottery';
const LotteryBody = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [response, setResponse] = useState({
        message: '',
        code: '-1'
    });

    const stateLotteryBody = useLotteryBody();
    const updateLottery = useLotteryBody((state) => state.updateLottery);
    const updateTicket = useTicketUser((state) => state.updateTicket);

    useEffect(() =>{
        updateLottery();
    },[response]);

    const ctx = useContext(AuthContext);
    let startDate = moment(stateLotteryBody.start).format('DD/MM/YYYY hh:mm:ss');
    let endDate =  moment(stateLotteryBody.expiration).format('DD/MM/YYYY hh:mm:ss');
    let message = "La lotteria si è conclusa attendere l'inizio della prossima";

    let controlBtn = (ctx.isLoggedIn.connect &&  !ctx.isLoggedIn.owner && (stateLotteryBody.expiration > new Date()));
    let dateValid = stateLotteryBody.expiration > new Date();

    const buyTicket = () =>{
        if(!ctx.isLoggedIn.connect  || ctx.isLoggedIn.owner){
            return;
        }
        enterLottery().then(value =>{
            setOpenModal(true);
            setResponse(value);
            updateLottery();
            updateTicket();
         });
    }
    return (
        <Wrapper>
            {openModal &&  
                <Message title="Acquisto biglietto" onClose={()=>{setOpenModal(false)}} message={response.message}/> }
            <div className={classes['lottery-content']}>
            <div className={classes['lottery-header']}>
                <img src={banner}></img>
            </div>
            {stateLotteryBody.loading && <Loader/>}
            {!stateLotteryBody.loading && <div>
                <div className={classes['lottery-body']}>
                    <div className={classes['lottery-date']}>
                        <span>{startDate}</span>
                        <span>{endDate}</span>
                    </div>
                <div className={classes['flex-center']}>
                    <span className={classes.label}>Numero ticket acquistati</span>
                    <span className={classes.number}>{stateLotteryBody.numTicket}</span>
                </div>
                </div>
                <div className={classes['flex-center']}>
                {controlBtn && <Button className={classes.cta} onClick={buyTicket}>Compra</Button>}
                {!dateValid && <div className={classes['msg-container']}><span className={classes.msg}>{message}</span></div>}
                </div>
            </div>}
        </div>
        </Wrapper>
    );
};

export default LotteryBody;
import React, {useEffect, useState} from 'react';
import Button from '../../../components/Button/Button';
import { pickWinner, startLotteryService } from '../../../contracts/LotteryContract';
import { PieChart } from 'react-minimal-pie-chart';
import classes from './OwnerTab.module.css'
import Message from '../../../components/Message/Message';

import { useLotteryStatus } from '../../../store/redux-lottery';
import { useLotteryBody } from '../../../store/redux-lottery';

const OwnerTab = (props) => {
    const {data} = props;
    const [openTooltip, setOpenTooltip] = useState(true);
    const [adminResult, setAdminResult] = useState({
        code: null,
        message: 'hello world',
        type: 'warning'
    });

    const state = useLotteryStatus();
    const updateStatus = useLotteryStatus((state) => state.updateStatus);

    const stateLotteryBody = useLotteryBody();
    const updateLottery = useLotteryBody((state) => state.updateLottery); 


    let status = state.status == 1 ? "Chiuso": state.status == 0  ? "Aperto" : '--'

    const startLottery = async () =>{
        if(state.status == 0){
            return;
        }
        startLotteryService().then(value => {
            console.log(value);
            updateStatus();
            updateLottery();
        });
    }
    const closeLottery = async() =>{
        if(state.status == 1){
            return;
        }
        pickWinner().then((result) =>{
            try
            {
                if(result.code === "-32603"){
                    setAdminResult(prev =>{
                        return({
                            message: "Si è verificato un errore durante la fase di sorteggio, riprovare",
                            code: 500,
                            type: "warning"
                        });
                    });
                }else{
                    console.log(result);
                    setAdminResult(prev =>{
                        return({
                            message: "Vincitore è stato determinato, sta per iniziare una nuova lotteria",
                            code: 200,
                            type:"success"
                        });
                    });
                }
                updateStatus();
                updateLottery();
                setOpenTooltip(true);

            }catch(error)
            {
                console.log(error);
            }
        });
    }

    return (
        <div className={classes['owner-content']}>
            <h2>Administrator Center</h2>
            <div>
               <div className={classes.date}>
                    <h3 className={classes.container}>Stato Lotteria:{status}</h3>
                    <span className={classes.bold}>Data inizio: {data[0].start}</span>
                    <span className={classes.bold}>Data chiusura: {data[0].close}</span>
               </div>
                <div className={classes.label}>
                    <span>Numero totale di ticket venduti: {data[0].totalTicket}</span>
                    <span>Vincita: {data[0].currentWinningReward} ETH</span>
                    <span>Commissioni: {data[0].commission} ETH</span>
                </div>
                <div className={`${classes.small} ${classes.center}`}>
                       {data[0].currentWinningReward > 0 ?
                             <PieChart
                                data={[
                                    { title: 'Commissione', value: data[0].commission, color: '#E38627' },
                                    { title: 'Vincita', value: data[0].currentWinningReward, color: '#C13C37' }
                                ]}
                             /> : 
                            <div className={classes['container']} style={{marginBottom:"60px"}}>
                                <span className={classes.message}>Dati non disponibili per generare un grafico</span>
                            </div>
                       }

                    <div className={classes.action}>
                        <Button className={`${classes.btn}`}  disabled={state.status == 1} onClick={closeLottery}>Chiudi Lotteria</Button>
                        <Button className={`${classes.btn}`} disabled={state.status == 0} onClick={startLottery}>Avvia Lotteria</Button>
                    </div>
                </div>
                {openTooltip && <Message title="Esito operazione" type={adminResult.type} message={adminResult.message} />}
            </div>
        </div>
    );
};

export default OwnerTab;
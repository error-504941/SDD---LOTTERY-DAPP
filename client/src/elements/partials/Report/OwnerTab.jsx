import React, {useState, useEffect} from 'react';
import Button from '../../../components/Button/Button';
import Loader from '../../../components/Loader/Loader'
import { pickWinner, startLotteryService } from '../../../contracts/LotteryContract';
import { PieChart } from 'react-minimal-pie-chart';
import classes from './OwnerTab.module.css'
import Message from '../../../components/Message/Message';
import {isMobile} from '../../../utils/checkDevice'
import { useLotteryStatus } from '../../../store/redux-lottery';
import { useLotteryBody, useOwnerReport } from '../../../store/redux-lottery';

const OwnerTab = () => {
    const [openTooltip, setOpenTooltip] = useState(false);
    const [adminResult, setAdminResult] = useState({
        code: null,
        message: 'Si è verificato un problema se si ripete contattare il concessionario',
        type: 'warning'
    });

    const ownerReport = useOwnerReport();
    const updateOwner = useOwnerReport((state) => state.updateOwner);
    const state = useLotteryStatus();
    const updateStatus = useLotteryStatus((state) => state.updateStatus);
    const updateLottery = useLotteryBody((state) => state.updateLottery); 

    const mobile = isMobile();

    useEffect(() =>
    {
        updateOwner();
    },[]);
    
    let status = state.status == 1 ? "Chiuso": state.status == 0  ? "Aperto" : '--'

    const startLottery = async () =>{
        if(state.status == 0){
            return;
        }
        startLotteryService().then(value => {
            updateStatus();
            updateLottery();
        });
    }

    const closeLottery = async () =>{
        if(state.status == 1){
            return;
        }
        pickWinner().then((result) =>{
            try
            {
                if(result.status){
                    setAdminResult(prev =>{
                        return({
                            message: "Abbiamo un vincitore",
                            code: 200,
                            type:"success"
                        });
                    });
                   
                }else{
                    setAdminResult(prev =>{
                        return({
                            message: "Si è verificato un errore durante la fase di sorteggio, riprovare",
                            code: 500,
                            type: "warning"
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

    const closeMessage = () => {
        setOpenTooltip(false);
    }
    return (
        <div className={classes['owner-content']}>
            <h2>Administrator Center</h2>
            {ownerReport.loading ? <Loader/> :
            <div>
            <div className={classes.date}>
                 <h3 className={classes.container}>Stato Lotteria:{status}</h3>
                 <span className={classes.bold}>Data inizio: {ownerReport.data[0].start}</span>
                 <span className={classes.bold}>Data chiusura: {ownerReport.data[0].close}</span>
            </div>
             <div className={classes.label}>
                 <span>Numero totale di ticket venduti: {state.status == 0 ? ownerReport.data[0].totalTicket : '---'}</span>
                 <span>Vincita: {state.status == 0 ? ownerReport.data[0].currentWinningReward : '---'} ETH</span>
                 <span>Commissioni: {state.status == 0 ? ownerReport.data[0].commission : '---'} ETH</span>
             </div> 
             <div className={`${classes.small} ${classes.center}`}>
                    {(ownerReport.data[0].currentWinningReward > 0  && ownerReport.data[0].totalTicket > 20) ?
                          <PieChart
                             data={[
                                 { title: 'Commissione', value: ownerReport.data[0].commission, color: '#E38627' },
                                 { title: 'Vincita', value: ownerReport.data[0].currentWinningReward, color: '#C13C37' }
                             ]}
                          /> : 
                        !mobile && <div className={classes['container']} style={{marginBottom:"60px"}}>
                             <span className={classes.message}>Dati non sufficienti per generare un grafico</span>
                         </div>
                    }

                 <div className={classes.action}>
                     <Button className={`${classes.btn}`}  disabled={state.status == 1} onClick={closeLottery}>Chiudi Lotteria</Button>
                     <Button className={`${classes.btn}`} disabled={state.status == 0} onClick={startLottery}>Avvia Lotteria</Button>
                 </div>
             </div>
             {openTooltip && 
                 <Message 
                     title="Esito operazione" 
                     type={adminResult.type} 
                     onClose={closeMessage} 
                     message={adminResult.message}/>
             }
            </div>}
        </div>
    );
};

export default OwnerTab;
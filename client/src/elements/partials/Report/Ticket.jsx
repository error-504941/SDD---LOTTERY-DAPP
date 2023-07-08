import React, {useEffect} from 'react';
import moment from 'moment';
import { useTicket } from '../../../store/redux-lottery';
import classes from './Ticket.module.css'
import Loader from '../../../components/Loader/Loader';
const Ticket = (props) => {
    const loadTicket = useTicket((state) => state.updateTicket);
    const ticket = useTicket();


    useEffect(() =>{
        loadTicket();
    }, []);

    let item;
    
    if(!ticket.loading){
        if(props.type == "win"){
            item = [...ticket.winningTicket];
        }
        
        if(props.type == "all"){
            item = [...ticket.allTicket];
        }
    }
    let col = props.type == "win" ? 4 : 3;
    return (
        <div className={classes['table-wrap']}>
            {ticket.loading ? <Loader/> :
            <table>
                <thead>
                    <tr className={classes.header}>
                        <th className={classes.date}>
                            <span className={classes.close}>Data Chiusura</span>
                            {props.type == "all" && <span className={classes.open}>Data Apertura</span>}
                        </th>
                        <th><span>ID</span></th>
                        <th><span>Prezzo</span></th>
                        {props.type == "win" && <th><span>Vincita</span></th>}
                    </tr>
                </thead>
                <tbody>
                    {item.length > 0 ? item.map((row) =>{
                        return(
                        <tr key={"ticket-" + row.ticketId}>
                            <td className={classes.date}>
                                <span className={classes.close}>{moment(row.close).format('DD/MM/YYYY hh:mm:ss')}</span>
                                {props.type == "all" && <span className={classes.open}>{moment(row.start).format('DD/MM/YYYY hh:mm:ss')}</span>}
                            </td>
                            <td><span>{row.ticketId}</span></td>
                            <td><span>{row.price} ETH</span></td>
                            {props.type == "win" && <td><span>{row.winning} ETH</span></td>}
                        </tr>)
                    }) : 
                        <tr key={'not-found'}>
                            <td colSpan={col} className={classes['not-found']}>
                                <span className={classes['not-found-label']}>Non hai biglietti, effettua una giocata</span>
                            </td>
                        </tr>}
                </tbody>
            </table>
        }
        </div>
    );
};

export default Ticket;
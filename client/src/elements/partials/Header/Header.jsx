import React, { useState, useContext } from 'react';
import Button from '../../../components/Button/Button'
import classes from './Header.module.css'
import Modal from '../../../components/Modal/Modal'
import Wrapper from '../../../components/Helpers/Wrapper'
import Report from '../Report/Report';
import HeaderIcon from './HeaderIcon';
import { AuthContext } from '../../../store/auth-context';
import { useTicketUser } from '../../../store/redux-lottery';
const Header = (props) => {
    const ctx = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);
    const [param, setParam] = useState('');
    const ticket = useTicketUser();
    
    const openModalHandler = (param) =>{
        setOpenModal(true);
        setParam(param);
    }

    const onCloseHandler = () =>{
       setOpenModal(false);
    }
    return (
        <Wrapper>
           { openModal && 
            <Modal
                closeModal={onCloseHandler}>
                <Report param={param} onClose={onCloseHandler} state={props.lotteryState}/>
            </Modal>
            }
            <div className='app-header'>
            <div className={`${classes.innerHeader}`}>
            {!ctx.isLoggedIn.connect &&  
                <div className={`${classes.flex}`}>
                    <Button type='button' className={`${classes.btnLogin}`} onClick={ctx.onLogin}>Wallet</Button>        
                </div>}

            {ctx.isLoggedIn.connect &&  
                <div className={`${classes.userConnect}`}>
                        <div className={`${classes.leftSide}`}>
                            {ctx.isLoggedIn.owner ? 
                                <HeaderIcon icons="bx bxs-cog" className={classes.gearButton} onClick={() => openModalHandler("dash")}/>
                                :
                                <div className={`${classes['flex-row']} ${classes.group}`}>
                                    <HeaderIcon
                                        group="true" 
                                        icons="bx bxs-bell" 
                                        className={classes.gearButton}  
                                        onClick={() => openModalHandler("all")}>
                                            <sup className={classes.sup}><span>{ticket.totalTicket}</span></sup>
                                    </HeaderIcon>
                                    <HeaderIcon 
                                        group="true" 
                                        icons="bx bxs-medal" 
                                        className={classes.gearButton}  
                                        onClick={() => openModalHandler("win")}>
                                            <sup className={classes.sup}><span>{ticket.winningTicket}</span></sup>
                                    </HeaderIcon>
                                </div>
                            }
                        </div>
                        <div className={`${classes.rightSide}`}>
                            <div className={`${classes.flex}`}>
                                <HeaderIcon icons="bx bxs-user-circle" className={classes.userwrap}>
                                <span>{ctx.isLoggedIn.address}</span>
                                </HeaderIcon>
                                <HeaderIcon icons="bx bxs-wallet" className={classes.amountwrap}>
                                    <div className={classes.wallet}>
                                        <span className={`${classes.amountvalue}`}>{ctx.isLoggedIn.balance}</span>
                                        <span className={`${classes.amountlabel}`}>ETH</span>
                                    </div>
                                </HeaderIcon>
                            </div>
                            <HeaderIcon icons="bx bx-log-out-circle" className={[classes.flex, classes.btnConnect ].join(" ")} onClick={ctx.onLogout}/>
                        </div>
                </div>}
            </div>
            </div>
        </Wrapper>
    );
};

export default Header;
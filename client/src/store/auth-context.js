import React, {useState, useEffect} from "react";
import { ethers } from "ethers"; 
import { BrowserProvider } from "ethers";
import { getUserContractInfo} from "../contracts/LotteryContract";
import { useTicketUser } from './redux-lottery';
export const AuthContext = React.createContext({
    isLoggedIn: {
        address:'',    // Stores address
        balance: null,  // Stores balance
        connect: false,
        owner: false
    },
    data: {
        totalTicket: 0,
        winningTicket: 0
    },
    onLogout : () => {},
    onLogin : () => {}
});


export const AuthContexProvider = (props) =>{
    const updateTicket = useTicketUser((state) => state.updateTicket);
    const [isLoggedIn, setIsLoggedIn] = useState({
            address:'',    // Stores address
            balance: null,  // Stores balance
            connect: false,
            owner: false
    });
    
    const cb_connectWallet = async () =>{
        if (window.ethereum) {
            await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) => {
                getUserContractInfo().then((response) =>{ 
                    getbalance(res[0], response);
                }) ;
                localStorage.setItem('isLoggedIn', '1');  
            });
        }else {
            alert("install metamask extension!!");
        }
    }

    const getbalance = (address, _owner) => {
        // Requesting balance method
        window.ethereum
        .request({ 
            method: "eth_getBalance", 
            params: [address, "latest"] 
        })
        .then((balance) => {
            setIsLoggedIn(prev =>{
                return({
                    address: address,
                    balance: ethers.formatEther(balance),
                    connect: true,
                    owner: _owner
                });
            });

            if(!_owner){
                updateTicket();
            }
        });
    };


    useEffect(() => {
        const storedUserLoggedIn = localStorage.getItem('isLoggedIn');
        if(storedUserLoggedIn === '1'){
        }
    }, []);

    function handleAccountsChanged(accounts) {
        cb_connectWallet();
      }
    
      useEffect(async () => {
        window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      let connect = localStorage.getItem('isLoggedIn');
      if(connect == 1 && signer.address != undefined){
        getUserContractInfo().then((response) =>{ 
            getbalance(signer.address, response);
        });
      }
    
      }, []);

    useEffect(() => {
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      }, [])
    

    const logoutHandler = () =>{
        if (window.ethereum.isConnected()) {
            setIsLoggedIn(prev =>{
                return({
                    address: '',
                    balance: null,
                    connect: false,
                    owner: false
                });
            });
            localStorage.removeItem('isLoggedIn');
        }
    }



    return<AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: cb_connectWallet
    }}>{props.children}</AuthContext.Provider>
}

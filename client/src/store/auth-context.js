import React, {useState, useEffect} from "react";
import { ethers } from "ethers"; 
import { BrowserProvider } from "ethers";
import { getUserContractInfo} from "../contracts/LotteryContract";
import { useTicketUser } from './redux-lottery';
import { ttl } from "../utils/constanst";

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
    onLogin : () => {},
    onUpdateBalance : () =>{}
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
                const now = new Date();
                const item = {
                    value : 1,
                    expiry: now.getTime() + ttl
                }
                localStorage.setItem('isLoggedIn', JSON.stringify(item));  
            })
            .catch((err) => {
                if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
                } else if(err.code === -3202) {
                     window.location.reload();
                }else{
                    console.log(err);
                }
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



    function handleAccountsChanged(accounts) {
        cb_connectWallet();
      }

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);

            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        }
      }, []);

    const fetchData = async () =>{
        if(window.ethereum){
            let connect = localStorage.getItem('isLoggedIn');
            console.log(connect);
            if(!connect){
                return;
            }

            const item = JSON.parse(connect);
            const now = new Date();
            if(now.getTime() > item.expiry){
                localStorage.removeItem('isLoggedIn');
                return;
            }
            
            window.ethereum.request({method: "eth_accounts",});
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            
            if(signer.address != undefined &&  item.value == 1){
                getUserContractInfo().then((response) =>{ 
                    getbalance(signer.address, response);
                });

                const now = new Date();
                const item = {
                    value : 1,
                    expiry: now.getTime() + ttl
                }
                localStorage.setItem('isLoggedIn', JSON.stringify(item));  
            }
        }
    }
    
      useEffect(() => { 
        fetchData(); 
    }, []);

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
        onLogin: cb_connectWallet,
        onUpdateBalance: fetchData
    }}>{props.children}</AuthContext.Provider>
}

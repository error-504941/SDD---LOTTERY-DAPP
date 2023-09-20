import configuration from "./Lotteria.json";
import Web3 from 'web3';
import moment from 'moment'

export const web3 = new Web3(
    Web3.givenProvider || 'http://127.0.0.1:7545'
);

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI =  configuration.abi;


export const lotteryContract =  new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

/**
 * 
 * @returns balance
 */

export const lotteryState = async() =>{
   return await lotteryContract.methods.lottery_state().call();
}
export const lotteryService = async () =>{

  let response = {
    'ticketInfo': {
        'ticketPrice':0,
        'ticketCommission':0,
        'duration':0,
        'numLotteries': 0
    },
    'lastWinner':[]
  };
  try{
    // le informazioni sui ticket
    let _ticketPrice = await lotteryContract.methods.ticketPrice().call();
    let ticketPrice = web3.utils.fromWei(_ticketPrice);
    let _ticketCommission = await lotteryContract.methods.ticketCommission().call();
    let ticketCommission = web3.utils.fromWei(_ticketCommission);

    let _duration = await lotteryContract.methods.duration().call();
    let duration = Math.floor(_duration  / 60);
    let numLotteries =  await lotteryContract.methods.numLotteries().call();

    //l'elenco degli ultimi vincitori(cablato a 10)
    let last = await lotteryContract.methods.getLastWinning().call();

    let temp = [...last];
    temp.sort((a, b) => {
      return new Date(b.endDate*1000) - new Date(a.endDate*1000);
  });

    let lastWinner = [];
    let length = temp.length;
    if(temp.length > 20){
      length = 8;
    }
      for (let i = 0; i < length; i++) {
        let obj = {
          'ticketId': temp[i].ticketId,
          'close': moment(temp[i].endDate*1000).format('DD/MM/YYYY HH:mm:ss'),
          'price':web3.utils.fromWei(temp[i].price)
        }
        lastWinner.push(obj);
      }


    response = {
      'ticketInfo': {
          'ticketPrice':ticketPrice,
          'ticketCommission':ticketCommission,
          'duration':duration,
          'numLotteries': numLotteries
      },
      'lastWinner':lastWinner
    }

  }catch(error){
    console.log('service: lotteryService  error:' + error);
  }

  return response;
}

export const lotteryDate = async () =>{
  let num = await lotteryContract.methods.getTotalTicket().call();
  let start  = await lotteryContract.methods.startLottery().call()
  let expiration = await lotteryContract.methods.expiration().call();

  start = start*1000;
  expiration = expiration*1000;
  //date
  let response = {
    "numTicket" : num,
    "start": start,
    'expiration': expiration,
  }

  return response;
}

export const TicketGeneralInfo = async () =>{
  let response = {
    price: 1,
    duration : 10,
    numLotteries: '--'
  }
  let _ticketPrice = await lotteryContract.methods.ticketPrice().call();
    let ticketPrice = web3.utils.fromWei(_ticketPrice);

    let _duration = await lotteryContract.methods.duration().call();
    let duration = Math.floor(_duration  / 60);
    let num = await lotteryContract.methods.numLotteries().call();

    response = {
      price: ticketPrice,
      duration : duration,
      numLotteries: num
    }

    return response;

}
export const ownerInformationLottery = async() =>{
  let accounts = await web3.eth.getAccounts();
  const owner = await lotteryContract.methods.owner().call();
  if(accounts[0] != owner){
    return response = {
      errors:[{
        userMessage: 'Non hai i permessi per accedere'
      }],
      data: []
    }

  }
  let commission = await lotteryContract.methods.operatorTotalCommission().call();
  let start = await lotteryContract.methods.startLottery().call();
  let close = await lotteryContract.methods.expiration().call();
  let totalTicket = await lotteryContract.methods.getTotalTicket().call();
  let currentWinningReward = await lotteryContract.methods.CurrentWinningReward().call();
  const response = {
    errors:[],
    data:[
      {
        commission: web3.utils.fromWei(commission),
        start:  moment(start*1000).format('DD/MM/YYYY HH:mm:ss'),
        close:  moment(close*1000).format('DD/MM/YYYY HH:mm:ss'),
        totalTicket: totalTicket,
        currentWinningReward: web3.utils.fromWei(currentWinningReward)
      }
    ]
  }
  return response;
}

export const getBalance = async (address) => {
    const accounts = await web3.eth.getAccounts();
    const balanceWei =  await lotteryContract.methods.getBalance(accounts[0]).call();
    return web3.utils.fromWei(balanceWei);
  }

/**
 * 
 * @returns contract address
 */
export const getContractAddress = () => {
    return CONTRACT_ADDRESS;
}

/**
 * 
 * @returns balance relativo al contratto 
 */
export const getContractBalance = () => {
    return getBalance(CONTRACT_ADDRESS)
}

export const getUserContractInfo = async () =>{
  const accounts = await web3.eth.getAccounts();
  const owner = await lotteryContract.methods.owner().call();
  const regex = new RegExp(owner, "i");
  return regex.test(accounts[0]);
}

  /**INFORMAZIONI RELATIVE ALLA LOTTERIA CORRENTE */

  export const getTotalTicket = async() =>{
    return await lotteryContract.methods.getTotalTicket().call();
  }

  export const CurrentWinningReward = async() =>{
    return await lotteryContract.methods.CurrentWinningReward().call();
  }

  export const getRemainingTime = async() =>{
    return await lotteryContract.methods.getRemainingTime().call();
  }


/** SINGOLO PLAYER */


export const getTickets = async() =>{
   const accounts = await web3.eth.getAccounts();
   let allTicket = [];
   let winningTicket = [];
   let response;

   try{
    let all = await lotteryContract.methods.getTicket(accounts[0]).call();
    let allLength = all.length;

    let _all = [...all];
    _all.sort((a, b) => {
      return new Date(b.endDate*1000) - new Date(a.endDate*1000);
  });
    for (let i = 0; i < allLength; i++) {
      let obj = {
        'ticketId': _all[i].ticketId,
        'close': _all[i].endDate*1000,
        'start': _all[i].startData*1000,
        'price':web3.utils.fromWei(_all[i].price)
      }
      allTicket.push(obj);
    }

    allTicket.sort((a, b) => {
      return b.close - a.close;
    });


     let winning = await lotteryContract.methods.getWinningTicket(accounts[0]).call();
     let winningLength = winning.length;
     for (let i = 0; i < winningLength; i++) {
      let obj = {
        'ticketId': winning[i].ticketId,
        'close':winning[i].endDate*1000,
        'price':web3.utils.fromWei(winning[i].price),
        'winning':web3.utils.fromWei(winning[i].winning)
      }
      winningTicket.push(obj);
      }

      winningTicket.sort((a, b) => {
        return b.close - a.close;
     });

      
      response = {
        'winningTicket' : winningTicket,
        'allTicket': allTicket
      }
   }catch(error){
      console.log('error ticket service:' + error);
      response = {
        'winningTicket' : [],
        'allTicket': []
      }
   }
   return response;
}

export const getTotalTicketsV2 = async() =>{
const accounts = await web3.eth.getAccounts();
try{
  let all = await lotteryContract.methods.getTicket(accounts[0]).call();
  let allLength = all.length;

  let winning = await lotteryContract.methods.getWinningTicket(accounts[0]).call();
  let winningLength = winning.length;
  let response =
  {
  all: allLength,
  winning: winningLength
  }
  return response;

}catch(error){
    console.log('error ticket service:' + error);
    return 0;
    
}
}

export const startLotteryService = async (duration, price) =>{
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  return await lotteryContract.methods.setStateLottery(duration, price).send({
    from: accounts[0]
  })
}




// acquista
/**
 * @param from address entering the game
 */

export const enterLottery = async () => {
  try {
    const _ticketPrice = await lotteryContract.methods.ticketPrice().call();
    const accounts = await web3.eth.getAccounts();
    let tx = await lotteryContract.methods.enter().send({
      from: accounts[0],
      value: _ticketPrice,
      // 0.0003 ETH in Gwei
      gas: 3000000,
      gasPrice: null,
    });
    //creare una response di risposta
    let message = '';
    let submessage = "";
    let code = '-1';
    if(tx.code == -32603){
      message = "Si è verificato un problema durante la fase di acquisto";
      submessage = "Riprovare ad effettuare l'acquisto"
      code = "-32603";
    }else{
      message = "Il biglietto è stato acquistato con successo";
      submessage = "Per ulteriori informazioni consultare la reportistica",
      code = "0";
    }
    let response = {
        message : message,
        submessage: submessage,
        code: code
    }
    return response;
  } catch (err) {
    console.log(err, 'enter')
  }
}


export const pickWinner = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    let tx = await lotteryContract.methods.pickWinner().send({
      from: accounts[0],
      gas: 3000000,
      gasPrice: null,
    })

    return tx;
  } catch (err) {
    console.log(err, 'pick Winner');
    return err;
  }
}





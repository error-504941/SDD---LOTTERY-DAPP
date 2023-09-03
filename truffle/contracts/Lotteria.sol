// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lotteria {
//-------------------------------------Constant--------------------------------------------------

    uint256 public duration = 10 minutes;
    uint256 public constant ticketCommission = 0.01 ether;
    uint256 public ticketPrice = 1 ether;

//------------------------------------variable---------------------------------------------------- 
    address public owner;
    uint256 public operatorTotalCommission = 0;

    //Array paralleli 
    address payable[] public players;
    bytes32[] public ticketList;
    uint256 public numLotteries; // numero di lotterie che ci sono state 
    
    uint256 public numTotalTickets;
    uint256 public expiration;
    uint256 public startLottery;


    struct ActiveTicket {
        address player;
        uint256 startData;
        uint256 endDate;
        bytes32 ticketId;   
        uint256 price;
    }

    mapping(address => ActiveTicket[]) public activeTicketMap;


     enum LOTTERY_STATE {
        OPEN,
        CLOSED
    }

    LOTTERY_STATE public lottery_state;



    struct WinningTicket {
        uint256 endDate;
        bytes32 ticketId;   
        uint256 price;
	    uint256 winning;
    }

    WinningTicket[] public winningTicketList;
    WinningTicket public  winner;

    mapping(address => WinningTicket[]) public winningTicketMap;





    //------------------------------------constructor----------------------------------------------------
    constructor()
    {
        owner = msg.sender;
        lottery_state = LOTTERY_STATE.CLOSED;
        numTotalTickets = 0;
        numLotteries = 0;
    }

function setStateLottery(uint256 _duration, uint256 _price) public onlyOwner{
        require(
            lottery_state == LOTTERY_STATE.CLOSED,
            "Can't start a new lottery yet!"
        );
      
        if(_duration >= 5  && _duration <= 60){
            duration = (_duration * 1 minutes);
        }
        else
        {
             duration = 10 minutes;
        }

        if(_price > 0 && _price <= 5){
            ticketPrice = (_price * 1 ether);
        }
        else
        {
            ticketPrice = 1 ether;
        }

        lottery_state = LOTTERY_STATE.OPEN;
        expiration = block.timestamp + duration;
        startLottery = block.timestamp;
        numTotalTickets = 0;
        numLotteries = numLotteries + 1;
    }
   

//----------------------------------------MAIN-------------------------
    function enter() public payable notOwner{       
        require(msg.value ==  ticketPrice, "l'ether richiesto per partecipare non valido");
        require(msg.sender != address(0), "Sender address must be valid"); 
        require(lottery_state == LOTTERY_STATE.OPEN);
        require(block.timestamp < expiration, "the lottery expired");

         
        numTotalTickets = numTotalTickets + 1; // numero ticket

        bytes32 TicketId = internalTicketData();

        players.push(payable(msg.sender));
        ticketList.push(TicketId);


         operatorTotalCommission = players.length * ticketCommission; //commissione owner
        
    }


    function generateTicketId() private view returns (bytes32) {
        return keccak256(abi.encode(msg.sender, block.timestamp));
    }

    function internalTicketData() private returns(bytes32) {
        ActiveTicket[] storage  _internalTicketList = activeTicketMap[msg.sender];
        bytes32 randomTicketId =  generateTicketId();
        _internalTicketList.push(
            ActiveTicket({
                player: msg.sender, 
                startData: block.timestamp, 
                endDate: expiration,
                ticketId: randomTicketId,
                price: ticketPrice
            })
        );
        activeTicketMap[msg.sender] = _internalTicketList;

        return randomTicketId;
    }


    //get random function

    function getRandomNumber() private view returns(uint256){
        bytes32 blockHash = blockhash(block.number - players.length);
         return uint256(
            keccak256(abi.encodePacked(block.timestamp, blockHash))
        );
    }

    function pickWinner() public onlyOwner{
        require(block.timestamp >= expiration, "the lottery not expired yet");
        require(lottery_state == LOTTERY_STATE.OPEN, "lottery is closed yet");
        if(players.length == 0){
            _closeWitoutWinner();
            return;
        }
        uint256 randomIndex = getRandomNumber() % players.length;

        uint256 winningTicket  = (players.length * (ticketPrice - ticketCommission));
 
        
        address payable newWinner = players[randomIndex];

        newWinner.transfer(winningTicket);
        WithdrawCommission(); // commissione owner
       
        bytes32 ticketID = ticketList[randomIndex];

        winner = WinningTicket(
                {   endDate: expiration ,
                    ticketId: ticketID,
                    price: ticketPrice,
		            winning:winningTicket
                });

        WinningTicket[] storage  _internalTicketList = winningTicketMap[newWinner];
        _internalTicketList.push(winner);
        winningTicketList.push(winner);
       
        winningTicketMap[newWinner] = _internalTicketList;

    

        //clear players array
        players = new address payable[](0);
        
        delete ticketList;
       //chiudo la lotteria
        lottery_state = LOTTERY_STATE.CLOSED;

    }

    function _closeWitoutWinner() private onlyOwner {
            players = new address payable[](0);        
            delete ticketList;
            lottery_state = LOTTERY_STATE.CLOSED;
    }


    function WithdrawCommission() private onlyOwner {
        address payable operator = payable(msg.sender);

        uint256 commission2Transfer = operatorTotalCommission;
         operatorTotalCommission = 0;

        operator.transfer(commission2Transfer);

    }

    
//------------------------------------getters-----------------------------------------------

    function getWitdrawCommision() public onlyOwner view returns(uint256){
        return operatorTotalCommission;
    }
    function getBalance() public view returns(uint){
        require(msg.sender == owner);

        //solidity works in wei
        return address(this).balance;
    }

    function CurrentWinningReward() public view returns (uint256) {
        return ticketList.length * ticketPrice;
    }
    // ritorna il numero di ticket staccati 
    function getTotalTicket() public view returns(uint){
        return numTotalTickets;
    }

    function getTicket(address _player) public view returns(ActiveTicket[] memory){
        return  activeTicketMap[_player];
    }

    function getWinningTicket(address _player) public view returns(WinningTicket[] memory){
        return  winningTicketMap[_player];
    }

    function Winner() public view returns(WinningTicket memory){
        return winner;
    }

    function getLastWinning() public view returns(WinningTicket[] memory){
        return winningTicketList;
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= expiration) {
            return 0;
        }
        return expiration - block.timestamp;
    }



    //-----------------------------------------Modifiers------------------------------------ 
    modifier onlyOwner (){
        require(msg.sender == owner);
        _;
    }

    modifier notOwner(){
        require(msg.sender != owner,"owner is not allowed");
        _;
    }


     modifier lotteryActive(){
        require(lottery_state != LOTTERY_STATE.OPEN, "lottery is closed");
        _;
    }

    modifier lotteryClosed(){
        require(lottery_state != LOTTERY_STATE.CLOSED, "lottery is open");
        _;
    }

}

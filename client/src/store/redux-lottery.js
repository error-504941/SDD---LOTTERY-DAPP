import { create } from 'zustand'
import { 
  lotteryService, 
  lotteryState, 
  lotteryDate, 
  getTotalTicketsV2,
  ownerInformationLottery,
  getTickets } from '../contracts/LotteryContract';

export const useLotteryStatus = create((set) => ({
  status: 0,
  updateStatus: () => lotteryState().then(val =>{set((state) => ({ status: val }))}),
}))

export const useLottery = create((set) =>({
  ticketInfo: {},
  lastWinner:[],
  updateLottery: () => lotteryService().then(val =>{set((state) => (
    { 
      ticketInfo: val.ticketInfo, 
      lastWinner:val.lastWinner 
    }
  ))})
}))

export const useLotteryBody = create((set) =>({
  loading:true,
  numTicket: 0,
  start: '',
  expiration: '',
  updateLottery: () => lotteryDate().then(val =>{set((state) => (
    { 
      loading: false,
      numTicket: val.numTicket, 
      start:val.start,
      expiration:val.expiration
    }
  ))})

}))

export const useTicketUser = create((set) =>({
  loading:true,
  totalTicket: 0,
  winningTicket: 0,
  updateTicket: () => getTotalTicketsV2().then(val =>{set((state) => (
    { 
      loading: false,
      totalTicket: val.all,
      winningTicket: val.winning
    }
  ))})
}))

export const useOwnerReport = create((set) =>({
  loading:true,
    data:[],
    errors:[],
  updateOwner: () => ownerInformationLottery().then(value =>{set((state) => (
    {
      loading: false,
      data: value.data,
      errors:value.errors
    }
    ))})
  }))

  export const useTicket = create((set) =>({
    loading:true,
    allTicket:[],
    winningTicket:[],
    updateTicket: () => getTickets().then(value =>{set((state) => (
      {
        loading: false,
        allTicket: value.allTicket,
        winningTicket: value.winningTicket,
      }
      ))})
    }))
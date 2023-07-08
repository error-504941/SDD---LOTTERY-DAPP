import { create } from 'zustand'
import { lotteryService, lotteryState, lotteryDate, getTotalTicketsV2 } from '../contracts/LotteryContract';

export const useLotteryStatus = create((set) => ({
  status: 0,
  updateStatus: () => lotteryState().then(val =>{set((state) => ({ status: val }))}),
  removeAllBears: () => set({ bears: 0 }),
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
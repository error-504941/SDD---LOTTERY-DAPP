# Sicurezza dei Dati - Lotteria decentralizzata 
## Lottery DApp - introduzione 

<p align="center">
  <img src="https://github.com/error-504941/SDD/assets/126831986/0f1f141f-aa19-4a28-9f61-4ba29a65c889" width="350" title="lotteria">
</p>
Lottery DApp è un'applicazione decentralizzata il cui aspetto fondamentale è lo Smart Contract che viene distribuito sulla blockchain di Ethereum ed è responsabile della costruzione delle lotterie decentralizzate. 

Il titolare del contratto (Owner) è il solo che può attivare la lotteria. 
In fase di inizializzazione, il titolare può stabilire alcuni paramenti come la durata della lotteria e il costo del biglietto mentre dati come il valore della commissione che riceverà una volta chiusa la lotteria sono impostati a livello di contratto.

Con l’apertura della lotteria si va ad attivare la finestra di gioco che consente l’acquisto dei biglietti.

I giocatori ("Giocatore1", " Giocatore2", ecc.) acquistano i biglietti della lotteria e le loro probabilità di vincita alla lotteria sono direttamente correlate alla proporzione del totale dei biglietti in sospeso che detengono per quella lotteria. 

L’acquisto può avvenire solo dopo aver effettuato l’accesso sul proprio Wallet. I giocatori nella loro area utente possono consultare i biglietti acquistati e i biglietti vinti.

Solo dopo la chiusura della finestra di gioco, può verificarsi un'estrazione.  La finestra di gioco viene chiusa con il raggiungimento di un timestamp.
L’estrazione e la chiusura effettiva della lotteria possono essere eseguite solo dal titolare

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Applicativo Lotteria  è in Solidity e React 18

Per poter avviare il progetto è necessario installare e configurare Ganache 

per avviare il progetto 
-  scaricare i pacchetti _npm i_
- lato client avviare il progetto  _npm start_




import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
//import { render } from '@testing-library/react';
import lottery from './lottery';
 

class App extends Component {
 state={
   manager: '',
   players: [],
   balance: '',
   value: '',
   message: '',
   winner: '',
 };

   async componentDidMount(){
     const manager = await lottery.methods.manager().call();
     const players = await lottery.methods.getPlayers().call();
     const balance = await web3.eth.getBalance(lottery.options.address);
 
     this.setState({manager,players,balance});
   }  

onSubmit = async (event) => {
  event.preventDefault();

  const accounts= await web3.eth.getAccounts();
this.setState({message: 'Waiting on transaction success....(please wait for atleast 30second!)'});

  await lottery.methods.enter().send({
    from: accounts[0],
    value: web3.utils.toWei(this.state.value,'ether')
  });

  this.setState({message: 'You have been entered!'});

};

onClick = async () =>{
  const accounts =await web3.eth.getAccounts();
this.setState({message: 'Waiting on transaction success...'})
  await lottery.methods.pickWinner().send({
    from: accounts[0]
  });


  this.setState({message: 'A Winner is Picked'});
}

render(){ 
  const mystyle = {
    color: "Orange",
    backgroundColor: "green",
    padding: "1px",
    fontFamily: "Papyrus"
  };
  const button= {
    color: "Black",
    backgroundColor: "Pink",
    padding: "5px",
    fontFamily: "Papyrus",
    borderRadius: '12px'
  };
  

  const mystyle1 = {
     
           color: "Black",
           height:'100vh',
           marginTop:'1px',
           fontSize:'25px',
           backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat',
           fontFamily: "Lucida Handwriting"
  };
  const mystyle2 = {
     backgroundColor:"red",
    color: "Black",
    height:'10vh',
    marginTop:'1px',
    fontSize:'25px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    fontFamily: "Lucida Handwriting"
};
  return (
    <div style={{backgroundColor: "#87CEFA"}}>
   <div style={mystyle1}>
   <h2 style={mystyle}>Lottery Contract</h2>
   <p>This contract is managed by {this.state.manager}</p>
   <p>There are currently {this.state.players.length} people entered competing to win {web3.utils.fromWei(this.state.balance,'ether')} ether!</p>
   <hr />
   <h2 style={{backgroundColor: "lightblue"}}><i>Want to Try your Luck?</i></h2>
   <form onSubmit={this.onSubmit}>
   <div style={mystyle2}>
   <label>Amount of ether to enter</label>
   <input 
    value={this.state.value}
    onChange={event=> this.setState({value: event.target.value})}/>
   <button style={button} >
   Enter</button>
   </div>
   </form>
   <hr />
   <h4>Ready to Pick a Winner?</h4>
   <button  style={button}  onClick={this.onClick}>Pick a Winner! </button>
   <hr />
   <h1  style={{backgroundColor: "lightblue"}} > {this.state.message}
   </h1>
  
   </div>
   </div>
  );
}}
export default App;

 

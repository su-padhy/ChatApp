import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

import Paperb from './Dash/Paperbase' ;
import {userContext} from './context/usercontext';
import {channelContext} from './context/channelcontext';
import {socketContext} from './context/socketcontext';

import { API_URL } from './config/config'

import OAuth from './components/Login/OAuth';
import store from './store/index';


import io from 'socket.io-client';
const socket = io(API_URL);
const providers = ['twitter', 'google'];


class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: {}
    };
    this.setUser = this.setUser.bind(this)
    this.logout = this.logout.bind(this);
  }
  logout() {
    this.setState({user: {}});
  }
  setUser(user,status)
{
    this.setState({
      authenticated: true,
        user: user
      });
     
      //console.log('setuser executed');
      //console.log(user.name)
      
} 
  render()
      {

        const value = {
          user: this.state.user,
          logoutUser: this.logout
        }

        const buttons = (providers, socket) => 
    providers.map(provider => 
      <OAuth 
        provider={provider}
        key={provider}
        socket={socket}
        setUser={this.setUser}
      />

      
    )
        return (
          <div className="App">



{this.state.authenticated
          ? (
          <socketContext.Provider value={socket}>
          <userContext.Provider value={value}>
           <Paperb socket={socket}></Paperb>
          </userContext.Provider>
          </socketContext.Provider>
          
           )
          : buttons(providers, socket)
        }

          
          </div>
        );
      }
}
  


export default App;

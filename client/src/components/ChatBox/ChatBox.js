import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import socketIOClient from "socket.io-client";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {styles} from './ChatBoxCSS';
import {socketContext} from '../../context/socketcontext';

import { API_URL } from '../../config/config';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import {userContext} from '../../context/usercontext';

//const socket = socketIOClient(API_URL);


import Emoji from '../Emoji/Emoji';

import DemoLoading from '../Emoji/demo';

import MessageReactions from '../Reactions/reaction'

import axios from 'axios';
import store from '../../store/index'



import CitryEditor from './TextEditor'

class ChatBox extends React.Component
{
  static contextType = userContext;
  static contextType = socketContext;
    constructor() {
        super();
        this.state ={chatinput:"",
        chatmessages:[],
        conversationId:""};
        this.chatarea = React.createRef();
        //socket : socketIOClient(ENDPOINT)
       
      }
      
      // this is where we are connecting to with sockets,
    openEmoji=(emoji)=>{
    
      this.setState({chatinput: this.state.chatinput + emoji.native})

    } 
  
    // this is where we are connecting to with sockets,
    scrollToBottom() {
      //this.chatarea.current.scrollTop = this.chatarea.current.scrollHeight;
    }
    onInput=(e)=> {
      this.setState({chatinput:e.target.value})
     
      } 
    sendMessage=()=>
    {
      
      const user = store.getState().user;
     
      const socket = this.context;
      console.log(socket);
      socket.emit("chat message",{from:user.name,dest:"",message: this.state.chatinput,messagetype: "Text",channelid:"123456"});
      //sendMessageText(this.props.socket,this.state.chatinput)
      console.log("message sent");
      this.setState({chatinput:""});
    }

    componentDidMount() {
      //this.state.socket.on("chat message", data => {
    //const {socket} = this.props;
   
    console.log(store.getState());
    let chatsdata=[];
    axios.get('http://localhost:8080/api/chats')
    .then(res => {
      chatsdata = JSON.parse(JSON.stringify(res.data));
      this.setState({
        chatmessages: chatsdata
      });
    });
      //const challenitems = channelsdata.split(',');  

      





    const socket = this.context;
    socket.on("chat message", data => {
        console.log("received" + data);
        this.setState({
          chatmessages: [...this.state.chatmessages, data],
        });
        //this.scrollToBottom();
    });
    console.log("initializzed");
    }

  getCurrentTime = () =>{

      var today = new Date();

      let time = today.getHours() + ':' + today.getMinutes();

      return time;
    }

 render()
      {
      return(
        <Paper className={styles.paper}>
        <div className={styles.contentHeader}>
          Subhasis Padhy
         </div>

        <div className={styles.contentWrapper} ref={this.chatarea}>
          
    <List>

    

     {
      this.state.chatmessages.map((chat) => {
    
        return (  
      <ListItem alignItems="flex-start">
      <userContext.Consumer>
      {({user, logoutUser}) => {
        return (
          <ListItemAvatar>
          <Avatar alt={user.name} src={user.photo} />
        </ListItemAvatar>
        );
      }}
    </userContext.Consumer>

        

       

        <ListItemText
          primary={chat.from}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={styles.inline}
                color="textPrimary"
              >
               {chat.message}
              </Typography><br/>
              {chat.date} <MessageReactions></MessageReactions>
            </React.Fragment>
          }
        />
       
      </ListItem>
          
          
          

        )
        
        
        
        
      })
    }


      
     </List>
      </div>
      <AppBar className={styles.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            
            <Grid item xs>     
            <TextField
                fullWidth
                placeholder="type a message"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                     
                    
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                  className: styles.searchInput,
                }}
                onChange={this.onInput} value={this.state.chatinput} 
              />
            </Grid>
            <Grid item>
                
                <button onClick={this.sendMessage}><SendIcon></SendIcon></button>

              
            </Grid>
            <Grid item>
            
            
           
           


            </Grid>
           
          </Grid>
        </Toolbar>
      </AppBar>
      <Emoji addEmoji={this.openEmoji}></Emoji>
      <CitryEditor></CitryEditor>
    </Paper>
      );

      }
}

export default withStyles(styles)(ChatBox);
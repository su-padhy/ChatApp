import React, { Component } from 'react';
import { API_URL } from '../../config/config'
import { GoogleLoginButton,TwitterLoginButton } from "react-social-login-buttons";
import store from '../../store/index';

export default class OAuth extends Component {

    constructor(props) {
        super(props)
        this._handleClick = this._handleClick.bind(this)

        this.state = {
            user: {},
            disabled: ''
          }  
    }

_handleClick()
{
    this.props.setUser('subhasis1',false)
}

componentDidMount() {
    const { socket, provider } = this.props

    socket.on(provider, user => {  
      this.popup.close()
      this.setState({user});
      this.props.setUser(user,true);
      console.log(user.name);
      store.dispatch({ type: 'SET_USER', payload: user});
      //socket.emit('chat message',user.name + ' is connected');
    })
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: ''})
      }
    }, 1000)
  }


  openPopup() {
    const { provider, socket } = this.props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }
  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup()  
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

render() {

let socialButton;
if(this.props.provider == 'google')
{
socialButton = <GoogleLoginButton onClick={this.startAuth}></GoogleLoginButton>;

}
else
{
socialButton = <TwitterLoginButton onClick={this.startAuth}></TwitterLoginButton>;
}

return(
<div class="container">
<div class="row">
    <div class="col">
    {socialButton}

    </div>
    <div class="col"></div>

</div>
<div class="row"></div>
</div>


    
)

}

}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import 'emoji-mart/css/emoji-mart.css';

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { SlackCounter } from '@charkour/react-reactions';
import { SlackSelector } from '@charkour/react-reactions';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(0),
  },
}));
const counters =[{emoji: '🗿', // String emoji reaction
by: 'case'}] // String of persons name


export default function MessageReactions(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reactions,setReactions]= React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleSelect = (newemoji) => {
    //props.addEmoji(emoji);
    handleClose();
    const newReactions =[...reactions,{emoji: newemoji, // String emoji reaction
    by: 'Subhasis'}];
    setReactions(newReactions);
    console.log(newemoji);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      
      <SlackCounter counters={reactions} onAdd={handleClick} ></SlackCounter>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
      >
        <Typography className={classes.typography}>
            
        
        <SlackSelector onSelect={handleSelect} />  
            
        </Typography>
      </Popover>
    </div>
  );
}

/*import React from 'react';
import { SlackCounter } from '@charkour/react-reactions';
const counters =[{emoji: '🗿', // String emoji reaction
by: 'case'}] // String of persons name

export const MessageReactions = () => {
  return <SlackCounter counters={counters} />;
};*/



/*import React from 'react';
import { SlackCounter } from '@charkour/react-reactions';


  

export const MessageReactions = () => {
  return (
    <SlackCounter counters={counters} />
  )
}*/


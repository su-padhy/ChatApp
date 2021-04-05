import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(0),
  },
}));

export default function Emoji(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleSelect = (emoji) => {
    props.addEmoji(emoji);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      
      <EmojiEmotionsIcon aria-describedby={id} onClick={handleClick}></EmojiEmotionsIcon>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
            
        <a style={{cursor:'hand'}}><Picker title='Citryl' emoji='point_up' onSelect={handleSelect} /></a> 
           
            
        </Typography>
      </Popover>
    </div>
  );
}
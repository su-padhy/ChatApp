import React from 'react';
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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
    height: '342px',
    overflow: 'auto'
  },
  contentHeader: {
    margin: '20px 16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    float:'left'
    
  },
  message: {
    
    
    float: 'left'
  }
   
});

function Content(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
        <div className={classes.contentHeader}>
          Subhasis Padhy
      </div>

        <div className={classes.contentWrapper}>
          <List>

<ListItem className={classes.message}>

<Card className={classes.message} variant="outlined">
      <CardContent>
        
       
        <Typography variant="body2" component="p">
          well meaning and kindly.
          
        </Typography>
      </CardContent>
      
</Card>


</ListItem>
<ListItem>

<Card className={classes.message} variant="outlined">
      <CardContent>
        
       
        <Typography variant="body2" component="p">
          This is another message
          
        </Typography>
      </CardContent>
      
    </Card>
</ListItem>


          </List>
      </div>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="type a message"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
              />
            </Grid>
            <Grid item>
                <button><SendIcon></SendIcon></button>
              
              
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
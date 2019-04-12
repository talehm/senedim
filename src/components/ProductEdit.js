



import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import TabSection from './TabSection';
import DocConfig from './DocConfig';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faCaretRight,faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  menuButton: {
    color:'white',
    position: 'fixed',
    top:`calc(50%)`,
    left: 0,
    padding:0,
    margin:0,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor:'rgba(0,0,0,0.9)',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    right:0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  tooltip:{
    fontSize:18,
  },
});

const styless = {

  typography:{
    fontSize:18,
    padding:0,
  },

  card:{
    borderRadius: 'none',
  },
  avatar:{  margin:10,},
  cardaction:{
    justifyContent: 'center', },
  appbar:{background: '#f2f2f2' },
};

let lastScrollY = 0;
let windowHeight=document.body.clientHeight;
let headerHeight = 0;
let toolbarHeight = 0;

class  ProductEdit extends Component{
  constructor(props){
    super(props);
    this.state={
      open: false,


}
this.handleScroll=this.handleScroll.bind(this);
  }
  componentDidMount(){
    headerHeight=document.getElementById("header").clientHeight;
    document.getElementById("toolbar").style.top=headerHeight+"px";
    document.getElementById("tabSection").style.marginTop=headerHeight+toolbarHeight+"px";

    this.setState({top:headerHeight});
    window.addEventListener('scroll', this.handleScroll);

    }
    handleScroll = () => {
   lastScrollY = window.scrollY;

   if(lastScrollY===0){
     //this.setState(state => ({ checked: !state.checked }));
     document.getElementById("toolbar").style.top=headerHeight+"px";
     document.getElementById("tabSection").style.marginTop=headerHeight+toolbarHeight+"px";
   }

   else{
     document.getElementById("toolbar").style.top="0px";
     document.getElementById("tabSection").style.marginTop=headerHeight+"px";


   }

   };



  handleDrawerOpen = () => {
  this.setState({ open: true });
};

handleDrawerClose = () => {
  this.setState({ open: false });
};




render(){
  const { classes, theme } = this.props;
const { open,top } = this.state;

    return(
      <div>
        <AppBar position="fixed" id="toolbar"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })} style={styless.appbar}>
          <Grid container spacing={0} >
            <Grid item xs={12} sm={12}>
              <Toolbar>
              <Tooltip title="Konfiqurasiya Panelini Aç" classes={{tooltip:classes.tooltip}} placement="right-start">
                <Button
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames("configOpenbtn",classes.menuButton, open && classes.hide)}
                >
                  <FontAwesomeIcon icon={faCaretRight} />
                </Button>
                </Tooltip>
                <Grid item xs={12} lg={3} md={12}>
                    <TextField
                    id="standard-search"
                    label="Document Name"
                    type="text"
                    className="documentName"
                  />
                </Grid>
                <Grid item xs={12} lg={6} md={12}>
                  <Typography variant="title" gutterBottom align="center">
                    Template Name :  {this.props.data.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={3} md={12}  className="toolbarButtons">
                      <Button variant="contained" color="primary" >
                        <span>Yadda Saxla</span> <Save/>
                      </Button>
                      <Button variant="contained" color="secondary" >
                        <span >Endir</span> <FontAwesomeIcon icon={faDownload} />
                      </Button>
                </Grid>

              </Toolbar>
            </Grid>
          </Grid>
        </AppBar>
        <Grid container spacing={0} justify="center" alignItems="flex-end">
        <Drawer
             className={classes.drawer}
             variant="persistent"
             anchor="left"
             open={open}
             classes={{
               paper: classes.drawerPaper,
             }}
           >
           <div className={classNames("configOpenbtn",classes.drawerHeader)}>
           <Tooltip title="Konfiqurasiya Panelini Bağla" classes={{tooltip:classes.tooltip}} placement="right-start">

             <IconButton onClick={this.handleDrawerClose}>
               {theme.direction === 'ltr' ? <FontAwesomeIcon icon={faCaretLeft} style={{    color:'white'}} />: <FontAwesomeIcon icon={faCaretRight} />}
             </IconButton>
            </Tooltip>
           </div>
             <Divider />
             <List>
               {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                 <ListItem button key={text}>
                   <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                   <ListItemText primary={text} />
                 </ListItem>
               ))}
             </List>
             <Divider />
             <List>
               {['All mail', 'Trash', 'Spam'].map((text, index) => (
                 <ListItem button key={text}>
                   <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                   <ListItemText primary={text} />
                 </ListItem>
               ))}
             </List>
           </Drawer>
        <Grid item xs={12} lg={6} md={12} >

          <main id="tabSection" className={classNames(classes.content, {
                          [classes.contentShift]: open,
                        })}>

              <TabSection data= {this.props.data.category_id}/>

          </main>  </Grid>

          </Grid>


      </div>
  );
 }
}

ProductEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(ProductEdit);

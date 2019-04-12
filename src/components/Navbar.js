import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Collapse from '@material-ui/core/Collapse';

const styles = {
  button:{marginRight:200},
  root: {
    flexGrow: 1,
    zIndex:100,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
let lastScrollY = 0;
let windowHeight=document.body.clientHeight;
let headerHeight = 0;
let toolbarHeight = 0;
class  Navbar extends Component{
constructor(props){
  super(props)
  this.state={
    checked: false,

  }
  this.handleScroll=this.handleScroll.bind(this)
}

  Reload=()=>{
    window.location.reload();
  }

 componentDidMount(){
   this.setState(state => ({ checked: !state.checked }));

  headerHeight=document.getElementById("header").clientHeight;
  window.addEventListener('scroll', this.handleScroll);

    /* document.getElementById("toolbar").style.top=headerHeight+"px";
    document.getElementById("tabContent").style.marginTop=headerHeight+toolbarHeight+"px";*/

  }

   handleScroll = () => {
  lastScrollY = window.scrollY;

  if(lastScrollY===0){
    this.setState(state => ({ checked: true }));
    /*
    document.getElementById("toolbar").style.top=headerHeight+"px";
    document.getElementById("tabContent").style.marginTop=headerHeight+toolbarHeight+"px"; */




  }

  else{
    this.setState(state => ({ checked: false }));
  /*  document.getElementById("toolbar").style.top="0px";
    document.getElementById("tabContent").style.marginTop=toolbarHeight+"px";
*/

  }

};


  render(){
    const { checked } = this.state;
    const appBar=
    <AppBar position="static" color="primary" id="header" >
        <Toolbar >

          <Typography variant="h4" color="inherit" style={styles.grow} >
            senedim.az
          </Typography>
          <div style={styles.button}>
            <Button color="inherit" onClick={this.Reload}>Ana Səhifə</Button>
            <Button color="inherit">Məhsullar</Button>
            <Button color="inherit">Xidmətlərimiz</Button>
            <Button color="inherit">Əlaqə</Button>
          </div>
          <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>

        </Toolbar>
</AppBar>
    return (
      <Collapse in={checked} style={{zIndex:100,}} >
          <div style={styles.root}  >
                {appBar}</div>
              </Collapse>

    );
  }
}



Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../App.css';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  media: {
    height: '70%',
  },
  typography:{
    fontSize:20,
    textAlign:'center',


  },
  griditem:{
  },
  card:{
    borderRadius: 'none',
  },

};

class  GridItem extends Component{
  constructor(props){

    super(props)
    this.state={
        grid_item_height:0,
        product_count:0,
         }
  }

  componentDidMount() {
    const height= document.getElementById("griditem").clientHeight;
    this.setState({grid_item_height: height});
    this.setState({product_count:this.props.data.product_count});
    if( !this.props.data.product_count ) {
      this.setState({product_count:0});
    }
    console.log(document.getElementById("gridcontainer").clientHeight);
  }


render(){
    const img_url=this.props.data.image_url;
    const path="../images/";

    return(
      <Grid item xs={12} lg={3} md={6} style={{marginTop:100,}}><Grid container spacing={0} alignItems="flex-end" justify="center" >
  <div className="scene" style={styles.griditem}  onClick={(event)=>this.props.handleClick(this.props.data.id)}>
    <div className="box">
      <div className="box__face box__face--front" id="face_front">
        <Grid item id="griditem"  >
          <Card raised  className={"card "+this.props.data.color} >
          <CardHeader
           title={this.props.data.name}
           className={"cardheader"+this.props.data.color}
         />
         <CardMedia
         style={styles.media}
         image= {require("../images/cv.png")}
         title={this.props.data.name}
        />
      <CardContent style={styles.cardContent} className="cardContent" >
              <Typography  color="inherit" style={styles.typography} >
                  {this.state.product_count} Numune

              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div className={"box__face box__face--right "+ this.props.data.color}  ></div>
      <div className={"box__face box__face--shadow "+ this.props.data.color}></div>
    </div>
  </div></Grid></Grid>
  );

}
}

GridItem.propTypes = {
  classes: PropTypes.object.isRequired,
};
GridItem.defaultProps = {
  product_count: 0,
};

export default withStyles(styles)(GridItem);

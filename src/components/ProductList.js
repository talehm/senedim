



import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../App.css';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const styles = {

  typography:{
    fontSize:18,
    padding:0,
  },

  card:{
    borderRadius: 'none',
  },
  avatar:{  margin:10,},
  cardaction:{
    justifyContent: 'center', }


};

class  ProductList extends Component{
  constructor(props){
    super(props)
    this.state={
      product_item_height:0,
}
  }

  componentDidMount() {
    const height= document.getElementById("product_card").clientHeight;
    this.setState({product_item_height: height});

  }


render(){
    return(
      <Grid item  lg={3} className="product_item" style={{height:this.state.product_item_height}}>
        <Card raised   id="product_card">
           <CardMedia
            style={styles.media}
            className="product_img"
            image= {this.props.data.image_url}
            title= {this.props.data.name}
           />
          <div className="img__description">
            <CardActions  className="img_icons" >
              <List >
                <ListItem style={styles.cardaction}>
                  <Button variant="contained" size="large" color="primary" aria-label="product_edit" title="Sifariş Et" id="product_edit" onClick={(event)=>this.props.itemActionSet(this.props.data.id, event.target.id)} >
                    <span>Əlavə Et</span> <ShoppingCart/>
                  </Button>
                </ListItem>
              </List>
            </CardActions>
          </div>
         <CardContent className="product_card_content">
          <List className={styles.root}>
           <ListItem>
             <Avatar style={styles.avatar}>
              {this.props.data.id}
             </Avatar>
            <ListItemText primary={this.props.data.name} secondary={this.props.data.created_by} />
           </ListItem>
          </List>
         </CardContent>
         <CardActionArea>

        </CardActionArea>
       </Card>
      </Grid>
  );
 }
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductList);

import React, { Component } from 'react';
import '../css/edit.scss';
import Grid from '@material-ui/core/Grid';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab'
class  AddContentButton extends Component{
constructor(){
  super()

}


  /*fetch('http://localhost:3200/products',{
   method: 'POST',
   body: JSON.stringify({
     category_id: this.props.category[id-1].id,
   }),
   headers: {"Content-Type": "application/json"}
 })
 .then(response => response.json())
 .then(data => {
   this.setState({products:data});
  });*/






render(){
  return(
  <Grid item  xs={4} lg={4} md={4}  className="tabBtnAdd">
              <Grid container spacing={24} justify="center"  alignContent="center"  >
                <Fab className="addElemIcon"  aria-label="Add" onClick={this.props.addNewContent} >
                  <Add />
                </Fab>
              </Grid>
          </Grid>);
}

}
export default AddContentButton;

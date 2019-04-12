import React, { Component } from 'react';
import GridItem from './GridItem';
import PropTypes from 'prop-types';
import '../css/index.scss';
import ProductList from './ProductList'
import ProductEdit from './ProductEdit'
import Grid from '@material-ui/core/Grid';
import mainpng from '../images/main22.png'
import { connect } from 'react-redux';
import { fetchCategories, fetchProducts } from '../actions/productActions';
class  Main extends Component{
constructor(){
  super()
  this.state={
    loadProducts: false,
    productHeader: '',
    productType: '',
    itemAction:false,
    itemActionType:'',
    itemId: 0,
  }
this.handleClick=this.handleClick.bind(this)
this.itemActionSet=this.itemActionSet.bind(this)

}
componentDidMount() {
   this.props.fetchCategories();
  /*fetch('http://localhost:3200/category')
       .then(response => response.json())
       .then(category => {
          (this.setState({category:category}))
        })*/
}
itemActionSet(id,action){
  this.setState({itemAction: true},
    ()=>this.setState({itemActionType: action}));
        this.setState({itemId: id});
}

handleClick(id){
  this.setState({ProductHeader: this.props.category[id-1].name});
  this.props.fetchProducts(this.props.category[id-1].id);
  this.setState({loadProducts: true});


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




}

render(){
  if( this.state.loadProducts && this.state.itemAction){
    const product=this.props.products[this.state.itemId-1]
    return (<div>     <ProductEdit  data={{category_id:product.category_id, name:product.name}} />

    </div>)
  }

  else if (this.state.loadProducts && !this.state.itemAction ){
    const griditem = this.props.products.map(item => <ProductList key={item.id} data={item} itemActionSet={this.itemActionSet}/>)
    if (this.props.products.length === 0){
        return(<div id="main" ><p style={{fontSize:24, textAlign: 'center',}}>No Products</p></div>)
    }
    else{
      return (
          <div id="main">
          <p className="productHeader"> {this.state.ProductHeader}</p>
          <div className="dez-separator-outer">
                <div className="dez-separator style-liner"></div>
          </div>
          <Grid container
                  spacing={24}
                  justify="center"
                  id="gridcontainer"
                  style={{width: '90%',left:5,}}>
                  {griditem}
            </Grid>
          </div>
        )
    }


}
  else if (!this.state.loadProducts && !this.state.itemAction ){
    const griditem = this.props.category.map(item => <GridItem key={item.id} data={item} handleClick={this.handleClick} />)
    const img = <img id="img" src={mainpng}  style={{marginLeft:100,}}  alt="Processes of Service"/>
    return (
      <div id="main">
      {img}
        <Grid container
              spacing={16}
              justify="center"
              id="gridcontainer"
              style={{width:'80%',left:10,}}
>
              {griditem}
        </Grid>
      </div>
    )
  }
}
}

Main.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  category: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  category: state.productData.category,
  products: state.productData.products,
});

export default connect(mapStateToProps, { fetchCategories, fetchProducts })(Main);





import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import JsxParser from 'react-jsx-parser'
import '../App.css';
import {Tabs, DragTabList, DragTab, PanelList, Panel, ExtraButton} from 'react-tabtab';
import * as customStyle from 'react-tabtab/lib/themes/bootstrap';
import {simpleSwitch} from 'react-tabtab/lib/helpers/move';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TabContent from './TabContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import {fetchCategories,fetchTempSections, addTempSection, updateTempSection, fetchTempData,updateTempData,deleteTempData } from '../actions/productActions';
import {errorAddNewSection} from '../actions/errorHandlingActions';


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
    justifyContent: 'center', },
    appbar:{background: '#f2f2f2', },

};

class  TabSection extends Component{
  constructor(props){
    super(props);
    this.state={
      index:0,
      activeIndex: 0,
      showExtra: true,
      showModal: true,
      showArrow: true,
      value: 0,
      addTab:false,
      anchorEl: null,
      sections:[]
}
  }

  componentDidMount(){
    this.props.fetchTempSections(this.props.data);
  }
// Fetching Template data -- Empty for default
fetchData(index){
  const {sections}=this.props;
    let category=sections[index].category_name.toLowerCase();
    let section_ref=sections[index].ref;
    this.props.fetchTempData({[category]:{[section_ref]:{}}})
}
  addTab=(name,section_ref)=>{
    const {sections} = this.props;
    this.props.addTempSection({
      id :sections.length,
      name: name,
      ref:section_ref,
      category_name:sections[0].category_name,
    })
    console.log(this.state.sections);
    this.setState({ anchorEl: null });
  }

  addExtraTab = () => {
    const name= document.getElementById("addSection").value;
    if (!name){
      this.props.errorAddNewSection({status:true, message:'Məlumat düzgün qeyd olunmayıb'});
   }else{
      let section_ref=name.toLowerCase();
      this.addTab(name,section_ref);
      }
  }

  addDefaultTab = (event) => {
    const {sections} = this.props;
    const newDefaultTab=event.target.innerText;
    let section_ref="";
    sections.map((value,i)=>{
      if (newDefaultTab===sections[i].name){
         section_ref=sections[i].ref;

      }
    })
    this.addTab(newDefaultTab, section_ref);
  }

  handleTabChange = index => {
    this.fetchData(index);
    this.setState({activeIndex: index});
  }
  previousTab=()=>{
//    this.fetchData(index);
    this.fetchData(this.state.activeIndex-1);
    this.setState({activeIndex: this.state.activeIndex-1});
  }
  nextTab=()=>{
    this.fetchData(this.state.activeIndex+1);
    this.setState({activeIndex: this.state.activeIndex+1});

  }

  handleTabSequenceChange = ({oldIndex, newIndex}) => {
    const {sections} = this.props;
    const updateTabs = simpleSwitch(sections, oldIndex, newIndex);
    this.setState({activeIndex: newIndex});
    this.props.updateTempSection(updateTabs);
  }

  handleEdit = ({type, index}) => {
    let {activeIndex} = this.state;
    let {sections}=this.props;
    if (type === 'delete') {
      sections = [...this.props.sections.slice(0, index), ...this.props.sections.slice(index + 1)];
      this.props.updateTempSection(sections);
    }
    if (index - 1 >= 0) {
      activeIndex = index - 1;
    } else {
      activeIndex = 0;
    }
    this.setState({activeIndex:activeIndex});
  }

   handleClick = event => {
     this.setState({ anchorEl: event.currentTarget });
   };

   handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.errorAddNewSection({status:false});
  };

  handleToggleExtra = e => {
    const showExtra = e.target.checked;
    this.setState({showExtra});
  }

  handleToggleModal = e => {
    const showModal = e.target.checked;
    this.setState({showModal});
  }

  handleToggleArrow = e => {
    const showArrow = e.target.checked;
    this.setState({showArrow});
}

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleDeleteElementValue=(category,section,value,field, index)=>{
    this.props.deleteTempData(category,section,value,field, index)
}
  handleAddElementValue=(category,section,value,field)=>{
    this.props.updateTempData({[category]:{[section]:{[field] :value}}})

}
render(){

  const { activeIndex, showArrow, showModal, showExtra,anchorEl} = this.state;
  const tabTemplate = [];
  const panelTemplate = [];
  const { sections }=this.props;
  Object.values(sections).map((tab,i) =>{
    const closable =sections.length > 1;
    tabTemplate.push(<DragTab
    key={i} closable={closable} >{this.props.sections[i].name}</DragTab>);
    const name="<h2 className='sectionHeader'>"+this.props.sections[i].name+"</h2>";
    const category=this.props.sections[i].category_name.toLowerCase();
    const section=this.props.sections[i].ref
    panelTemplate.push(<Panel key={i} ><div  >
      <TabContent
          data={{type:category, section_ref:section }}
          handleAddElementValue={(category, section,value, field)=>this.handleAddElementValue(category, section, value, field)}
          handleDeleteElementValue={(category, section,value, field,index)=>this.handleDeleteElementValue(category, section, value, field,index)}
          previousTab={this.previousTab}
          nextTab={this.nextTab} />
      </div></Panel>);
  })
  const defaultmenuitem =Object.values(sections).map((tab,i) =><MenuItem key={i} onClick={this.addDefaultTab}>{sections[i].name}</MenuItem>);


    return(<div>
      <Tabs id="tabSection"  onTabEdit={this.handleEdit}
         onTabChange={this.handleTabChange}
         activeIndex={activeIndex}
         customStyle={customStyle}
         onTabSequenceChange={this.handleTabSequenceChange}
         showModalButton={showModal}
         showArrowButton={showArrow}
         ExtraButton={showExtra &&
           <ExtraButton onClick={this.handleClick} id="iconPlus">
            <FontAwesomeIcon  icon={faPlus} />
           </ExtraButton>
         }>
         <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem >
              <Input
                placeholder="Placeholder"
                id="addSection"
                inputProps={{
                  'aria-label': 'Description',
                }}
              />

              <Button variant="contained" size="small" color="primary" onClick={this.addExtraTab} className={styles.margin}>
                 OK
               </Button>
            </MenuItem>
            {defaultmenuitem}
          </Menu>
     <DragTabList>
       {tabTemplate}
     </DragTabList>
     <PanelList>
       {panelTemplate}
     </PanelList>
      </Tabs>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}}
        open={this.props.error.status}
       autoHideDuration={6000}
       onClose={this.handleClose}
       ContentProps={{ 'aria-describedby': 'message-id', }}
       message={<span id="message-id">{this.props.error.message}</span>}
       action={[
         <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
           UNDO
         </Button>,
         <IconButton key="close" aria-label="Close" color="inherit" className={styles.close}   onClick={this.handleClose}>
           <CloseIcon />
         </IconButton>,
       ]}
     />
     </div>
    );

 }
}

TabSection.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchTempSections: PropTypes.func.isRequired,
  addTempSection:PropTypes.func.isRequired,
  errorAddNewSection:PropTypes.func.isRequired,
  updateTempSection:PropTypes.func.isRequired,
  fetchTempData:PropTypes.func.isRequired,
  updateTempData:PropTypes.func.isRequired,
  deleteTempData:PropTypes.func.isRequired,
  temp_data:PropTypes.object,
  category: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
  error: PropTypes.bool,

};

const mapStateToProps = state => ({
  category: state.productData.category,
  temp_data:state.productData.data,
  sections: state.productData.sections,
  error:state.errorHandling.error,
});
export default withStyles(styles)(connect(mapStateToProps, {fetchCategories, updateTempSection, addTempSection,fetchTempSections,errorAddNewSection,fetchTempData,updateTempData,deleteTempData })(TabSection));

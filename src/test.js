



import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../App.css';
import '../css/edit.scss';
import {Tabs, DragTabList, DragTab, PanelList, Panel, ExtraButton} from 'react-tabtab';
import {simpleSwitch} from 'react-tabtab/lib/helpers/move';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DefaultTabs from './tabs/DefaultTabs';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


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
const tabs={
  "cv":  [{
      id :0,
      title : "Şəxsi Məlumatlar",
      content: <h1>Hello</h1>,
    },
    {
      id :1,
      title : "Təhsil",
      content: "Content"
    },
    {
      id :2,
      title : "İş Təcrübəsi",
      content: "Content"
    },
    {
      id :3,
      title : "Xarici Dil",
      content: "Content"
    },
    {
      id :4,
      title : "Sertifikatlar",
      content: "Content"
    },
    {
      id :5,
      title : "Əlavə Bacarıqlar",
      content: "Content"
    }],
};
class  TabSection extends Component{
  constructor(props){
    super(props);
    this.state={
      activeIndex: 0,
      showExtra: true,
      showModal: true,
      showArrow: true,
      cvsections:[],
      value: 0,
      addTab:false,
      anchorEl: null,
      open: false,
      tabs:tabs,
}
  }
  componentDidMount(){

  }

  addTab=(title,content)=>{
    this.setState({tabs:tabs.cv.push(  {
        id :tabs.cv.length,
        title : title,
        content: <div><h2>{title}</h2><p> {content}</p></div>,
      }) });
      this.setState({ anchorEl: null });
  }

  addExtraTab = () => {
    const title= document.getElementById("addSection").value;
    if (!title){
      this.setState({ open: true });
    }else{
      let content="New Components";
      this.addTab(title,content);
      }
  }

  addDefaultTab = (event) => {
    const newDefaultTab=event.target.innerText;
    let content="";
    tabs.cv.map((value,i)=>{
      if (newDefaultTab===tabs.cv[i].title){
        content=tabs.cv[i].content;
      }
    })
        this.addTab(newDefaultTab, content);


  }

  handleTabChange = index => {
    this.setState({activeIndex: index});
  }

  handleTabSequenceChange = ({oldIndex, newIndex}) => {
    const {tabs} = this.state;
    console.log(tabs);
    const updateTabs = simpleSwitch(tabs, oldIndex, newIndex);
    this.setState({tabs: updateTabs, activeIndex: newIndex});
  }

  handleEdit = ({type, index}) => {
    this.setState((state) => {
      let {tabs, activeIndex} = state;
      let tab=this.state.tabs.cv
      if (type === 'delete') {
        tabs.cv = [...tabs.cv.slice(0, index), ...tabs.cv.slice(index + 1)];

      }
      if (index - 1 >= 0) {
        activeIndex = index - 1;
      } else {
        activeIndex = 0;
      }
      return {tabs, activeIndex};
    });
  }
   handleClick = event => {
     this.setState({ anchorEl: event.currentTarget });
   };



   handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
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


render(){
  //const section = this.state.cvsections.map(item =><Tab className="tab" key={item.id} label={item} icon={<span  class="tabicon">x</span>} />)
  //const { classes } = this.props;
    //const { value } = this.state;
    //const newTab="";
  const { activeIndex, showArrow, showModal, showExtra,anchorEl} = this.state;
  const tabTemplate = [];
  const panelTemplate = [];
  const content=<h2>Contnt</h2>;
  tabs.cv.map((tab,i) =>{
    const closable =   tabs.cv.length > 1;
    tabTemplate.push(<DragTab key={i} closable={closable}>{  tabs.cv[i].title}</DragTab>);
    panelTemplate.push(<Panel key={i}>{  tabs.cv[i].content}</Panel>);
  })
  const defaultmenuitem =   tabs.cv.map((tab,i) =><MenuItem onClick={this.addDefaultTab}>{tabs.cv[i].title}</MenuItem>);




    return(<div>
      <Tabs id="tabSection"  onTabEdit={this.handleEdit}
         onTabChange={this.handleTabChange}
         activeIndex={activeIndex}
         customStyle={this.props.customStyle}
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
                placeholder="Yeni "
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
     open={this.state.open}
     autoHideDuration={6000}
     onClose={this.handleClose}
     ContentProps={{ 'aria-describedby': 'message-id', }}
     message={<span id="message-id">Məlumat düzgün qeyd olunmayıb</span>}
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
};

export default withStyles(styles)(TabSection);

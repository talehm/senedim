



import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import CakeIcon from '@material-ui/icons/Cake';
import { connect } from 'react-redux';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DateRange from '@material-ui/icons/DateRange';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import Attributes from './Attributes';
import AddContentButton from './AddContentButton'
import Grid from '@material-ui/core/Grid';
import Elements from './Elements';
import { fetchTempData } from '../actions/productActions';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import {errorAddNewSection} from '../actions/errorHandlingActions';

const styles= theme => ({
  heading: {
   fontSize: theme.typography.pxToRem(15),
   flexBasis: '33.33%',
   flexShrink: 0,
 },
 secondaryHeading: {
   fontSize: theme.typography.pxToRem(15),
   color: theme.palette.text.secondary,
 },

});

class  TabContent extends Component{
  constructor(props){
    super(props);
    this.state={
      expanded: null,
      panelSecondaryValue:null,
      panelPrimaryValue:null,
      numberOfContents:0,
      btnActionsWidth:0,
      inputCvPhone:[],
      inputCvWebsite:[],

}
this.addNewContent=this.addNewContent.bind(this);
  }
  componentDidMount(){
    const width=document.getElementById("tabContent").clientWidth-12;
    this.setState({btnActionsWidth:width});

  }
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : true,
    });
  };

  handleChangeValue = e => {
    switch (e.target.id){
      case "courseInput":
      case "positionInput":
        this.setState({panelSecondaryValue: e.target.value});
        break;
      case "workplaceInput":
      case "instituteInput":
        this.setState({panelPrimaryValue: e.target.value});
        break;
      case "skillsInput":
        if (e.key === 'Enter') {
          this.setState({newSkillTag:e.target.value});
        }
        break;
      default:
        break;
    }
}


handleAddElementValue=(category, section, value, field)=>{
  this.props.handleAddElementValue(category, section, value, field);

}


handleAddElement=(category, section, value, field)=>{
var i=document.querySelectorAll("."+field).length-1;
var data=document.querySelectorAll("."+field+" input")[0].value;
  if ( data===""){
    this.props.errorAddNewSection({status:true, message:'Ilk öncə müvafiq xananı doldurun.'})
  }
  else{
    switch (field) {
      case 'cvPhone':
        this.setState({
          inputCvPhone: [...this.state.inputCvPhone, data]
        }, function(){
            this.handleAddElementValue(category, section, this.state.inputCvPhone,field);
        }   );
        break;
      case 'cvWebsite':
      this.setState({
        inputCvWebsite: [...this.state.inputCvWebsite, data]
      },function(){
          this.handleAddElementValue(category, section, this.state.inputCvWebsite,field);
      }   );
        break;
      default:
        break;
    }
}
document.querySelectorAll("."+field+" input")[0].value=null;
}

handleDeleteElement=(category, section,value, field)=>{

  switch (field) {
    case 'cvPhone':
      console.log(value);
      var array = [...this.state.inputCvPhone]; // make a separate copy of the array
      var index = array.indexOf(value)
         if (index != -1) {
           array.splice(index, 1);
           this.setState({inputCvPhone: array},function(){
               this.props.handleDeleteElementValue(category, section, this.state.inputCvPhone, field, index);
           });
         }
        break;
      case 'cvWebsite':
        var array = [...this.state.inputCvWebsite]; // make a separate copy of the array
        var index = array.indexOf(value)
        console.log("index:"+index);
        if (index != -1) {
             array.splice(index, 1);
             this.setState({inputCvWebsite: array},function(){
               this.props.handleDeleteElementValue(category, section, this.state.cvWebsite, field, index);
             });
           }
        break;
    default:

  }

}

addNewContent=( event, field)=>{
  console.log("fdgdf");
  this.setState({numberOfContents:this.state.numberOfContents+1});
  this.props.handleAddElementValue( event.target.value,this.props.data.field);
}

render(){
  const { classes } = this.props;
  const arrowLeft=<Grid item  xs={4} lg={4} md={4} className="tabBtnLeft">
                        <Grid container spacing={24} justify="center"  alignContent="center"  >
                        <IconButton  className="arrowIcon" component="span" onClick={this.props.previousTab}>
                          <ArrowLeft />
                        </IconButton>
                        </Grid>
                      </Grid>;

    const arrowRight=<Grid item  xs={4} lg={4} md={4} className="tabBtnRight" >
                        <Grid container spacing={24} justify="center"  alignContent="center"  >
                        <IconButton className="arrowIcon"  component="span" onClick={this.props.nextTab}>
                          <ArrowRight />
                          </IconButton>
                        </Grid>
                      </Grid>  ;
  const category=this.props.data.type;
  const section=this.props.data.section_ref;

  switch (category){
    case "cv":
      switch (section){
        case "personal":
            let elements=Attributes[category][section].map((tab,i)=>{
              const value=this.props.temp_data[category][section][Attributes[category][section][i].field];
              return(
                <Elements
                  key={i}
                  data={{type:Attributes[category][section][i].type, field:Attributes[category][section][i].field, value:value }}
                  handleAddElementValue={(value,field)=>this.handleAddElementValue(this.props.data.type, this.props.data.section_ref, value, field )}
                  handleAddElement={(value,field)=>this.handleAddElement(this.props.data.type, this.props.data.section_ref, value, field )}
                  handleDeleteElement={(value,field)=>this.handleDeleteElement(this.props.data.type, this.props.data.section_ref, value, field )}

                />
              )
            })

            return(<> <Grid container spacing={24} justify="center"  alignContent="center" id="tabContent"  >
                        <Grid item xs={12} lg={4} md={12} style={{flex:0,}}>
                            <Elements data={{type:'cvPhoto', field:"cvPhoto" }}/>
                        </Grid>

                        <Grid item xs={12} lg={6} md={12}>
                          {elements}
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}   justify="center" alignItems="center" >
                      <Grid item  xs={12} lg={12} md={12}  >
                        <Card id="btnActions" style={{width:this.state.btnActionsWidth}}>
                          <CardActions>
                            <Grid container spacing={24}   justify="center" alignItems="center" >
                          {arrowRight}
                          </Grid>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
           </>
            );
        case "edu":
        case "work":
        elements=Attributes[category][section].map((tab,i)=>{
          const value=this.props.temp_data[category][section][Attributes[category][section][i].field];
          return(
            <Elements key={i} data={{type:Attributes[category][section][i].type, field:Attributes[category][section][i].field,value:value }} handleAddElementValue={(value,field)=>this.handleAddElementValue(this.props.data.type, this.props.data.section_ref, value,field )}/>
          )
        })
        let count=this.state.numberOfContents;
        let newContent=[];
        for (var i=0; i<=count;i++){

          newContent.push(<ExpansionPanel  defaultExpanded={true} onChange={this.handleChange('panel'+i)}>
           <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />} className="expansionPanel">
             <Typography className={classes.heading} >{i+1}. {this.state.panelPrimaryValue}</Typography>
             <Typography className={classes.secondaryHeading}>{this.state.panelSecondaryValue}</Typography>
           </ExpansionPanelSummary>
           <ExpansionPanelDetails className="expansionDetails">
           <Grid container spacing={24}  direction="column " justify="center" alignItems="center">
           <DateRange className="sectionIcons" style={{marginBottom:10,}}/>
           {elements}
          </Grid>
           </ExpansionPanelDetails>
         </ExpansionPanel>
       );
        }
          return(
            <><Grid container spacing={24}   justify="center" alignItems="center" id="tabContent" >
            <Grid item  xs={10} lg={8} md={6}>

            {newContent}
          </Grid></Grid>

        <Grid item  xs={12} lg={12} md={12}  >

          <Card id="btnActions" style={{width:this.state.btnActionsWidth}}>

<CardActions>
  <Grid container spacing={24}   justify="center" alignItems="center" >
{arrowLeft}
<AddContentButton addNewContent={(category,section,event,field)=>this.addNewContent(category,section,event,field)}/>
{arrowRight}

</Grid>
</CardActions>
</Card>
 </Grid>
</>
          );

        case "lang":
        elements=Attributes[category][section].map((tab,i)=>{
          const value=this.props.temp_data[category][section][Attributes[category][section][i].field];
          return(
            <Elements key={i} data={{type:Attributes[category][section][i].type, field:Attributes[category][section][i].field,value:value }} handleAddElementValue={(value,field)=>this.handleAddElementValue(this.props.data.type, this.props.data.section_ref, value,field )}/>
          )
        })
        count=this.state.numberOfContents;
         newContent=[];
        for (var i=0; i<=count;i++){
          newContent.push(elements);
        }
                return(<><Grid container spacing={24}   justify="center" alignContent="center" id="tabContent"   >

                    {newContent}  </Grid>
                   <Grid container spacing={24} justify="center"  style={{marginBottom:100,}}  >
                     <Grid item  xs={12} lg={12} md={12}  >

                       <Card id="btnActions" style={{width:this.state.btnActionsWidth}}>

             <CardActions>
               <Grid container spacing={24}   justify="center" alignItems="center" >
             {arrowLeft}
             <AddContentButton/>
             {arrowRight}

             </Grid>
             </CardActions>
             </Card>
              </Grid>
                  </Grid>
              </>
                );
        case "skills":
        elements=Attributes[category][section].map((tab,i)=>{
          const value=this.props.temp_data[category][section][Attributes[category][section][i].field];
          return(
            <Elements key={i} data={{type:Attributes[category][section][i].type, field:Attributes[category][section][i].field,value:value, newSkillTag:this.state.newSkillTag }} onChangeValue={this.handleChangeValue} handleAddElementValue={(value,field)=>this.handleAddElementValue(this.props.data.type, this.props.data.section_ref, value,field )}/>
          )
        })
            return(<>
              <Grid container spacing={24}   justify="center" alignContent="center" id="tabContent"   >
              {elements}
            </Grid>
            <Grid container spacing={24} justify="center"  style={{marginBottom:100,}} alignItems="center">

              <Grid item  xs={12} lg={12} md={12}  >

                <Card id="btnActions" style={{width:this.state.btnActionsWidth}}>

      <CardActions>
        <Grid container spacing={24}   justify="center" alignItems="center" >
      {arrowLeft}
      <AddContentButton/>
      {arrowRight}

      </Grid>
      </CardActions>
      </Card>
       </Grid>
          </Grid></>
            );
        case "cert":
        elements=Attributes[category][section].map((tab,i)=>{
          const value=this.props.temp_data[category][section][Attributes[category][section][i].field];
          return(
            <Elements key={i} data={{type:Attributes[category][section][i].type, field:Attributes[category][section][i].field,value:value}} onChangeValue={this.handleChangeValue} handleAddElementValue={(value,field)=>this.handleAddElementValue(this.props.data.type, this.props.data.section_ref, value,field )}/>
            )
          })
          count=this.state.numberOfContents;
           newContent=[];
          for (var i=0; i<=count;i++){
            newContent.push(elements);
          }
            return(<>              <Grid container spacing={24}   justify="center" alignContent="center" id="tabContent"   >

                 {newContent}</Grid>
               <Grid container spacing={24} justify="center"  style={{marginBottom:100,}} alignItems="center" className="tabContent">
                 <Grid item  xs={12} lg={12} md={12}  >

                   <Card id="btnActions" style={{width:this.state.btnActionsWidth}}>

         <CardActions>
           <Grid container spacing={24}   justify="center" alignItems="center" >
         {arrowLeft}
         <AddContentButton/>

         </Grid>
         </CardActions>
         </Card>
          </Grid>
              </Grid>
              </>
                );
        default:
            break;
      }

      break;
    default:
      break;
  }

 }
}
TabContent.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchTempData:PropTypes.func.isRequired,
  temp_data:PropTypes.object,
  errorAddNewSection:PropTypes.func.isRequired,
  error: PropTypes.bool,
};

const mapStateToProps = state => ({
  temp_data:state.productData.data,
  error:state.errorHandling.error,

});
export default withStyles(styles)(connect(mapStateToProps, {fetchTempData,errorAddNewSection})(TabContent));

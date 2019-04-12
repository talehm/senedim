



import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/edit.scss';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faTags, faCertificate, faEdit } from "@fortawesome/free-solid-svg-icons";
import School from '@material-ui/icons/School';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Edit';

import TextField from '@material-ui/core/TextField';
import Place from '@material-ui/icons/Place';
import Mail from '@material-ui/icons/Mail';
import Language from '@material-ui/icons/Language';
import LocalPhone from '@material-ui/icons/LocalPhone';
import Public from '@material-ui/icons/Public';
import AddCircle from '@material-ui/icons/AddCircle';
import JsxParser from 'react-jsx-parser'
import FormHelperText from '@material-ui/core/FormHelperText';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import {DateFormatInput} from 'material-ui-next-pickers'
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Chips from 'react-chips';
import {errorAddNewSection} from '../actions/errorHandlingActions';
import CakeIcon from '@material-ui/icons/Cake';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles={}
const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);


class  Elements extends Component{
  constructor(props){
    super(props);
    this.cvPHone = React.createRef();
    this.state={
      LangDefaultValue:"weak",
      textmask: '(1  )    -    ',
      numberformat: '1320',
      chips: [],
      inputCvPhone:[],
      inputCvWebsite:[],

    }
  // this.handleAddElement=this.handleAddElement.bind(this);
  // this.handleDeleteElement=this.handleDeleteElement.bind(this)
  }
componentDidMount(){
  //this.props.updateCvInfo();
}

onChangeTag = chips => {
    this.setState({ chips });
  }

onChangeDate = (date:Date,field) => {
      this.props.handleAddElementValue( date,field);
    }
handleLangChange = event => {
  this.setState({ LangDefaultValue: event.target.value });
};
handleDeleteElement=(event, field)=>{
      var value=event.target.closest(".added"+field);
      this.props.handleDeleteElement(value.innerText,field);
}


render(){
  const {date,textmask, numberformat} = this.state

  switch (this.props.data.type){
    case "cert":
       label="Sertifikat";
       helperText="Məs: IELTS (7.0)";
       icon=<FontAwesomeIcon  icon={faCertificate} className="sectionIcons" />;
       helperText="Bitiş Tarixi";
       dateformat="MM . yyyy";

   return(<Grid container spacing={24}   justify="center" alignItems="center">
<Grid item xs={6} lg={4} md={6}> <Grid container spacing={16} alignItems="flex-end" justify="center" className="textFieldGrid" id={this.props.data.field}>
          <Grid item >
           {icon}
          </Grid>
          <Grid item  xs={10} lg={9} md={6}>
          <TextField id={this.props.data.field+"Input"} label={label} margin="normal" helperText={helperText} variant="outlined" value={this.props.data.value} onChange={( event, field)=>this.props.handleAddElementValue( event.target.value,this.props.data.field)} className="TextField"/>
        </Grid> {addicon}
      </Grid>  </Grid><Grid item xs={6} lg={2} md={4}>
                <DateFormatInput name='date-input' className={this.props.data.field} transf ormOrigin={{ vertical: 'top',horizontal:'left'}} fullWidth={true} dateFormat={dateformat} value={date}  onChange={this.onChangeDate}/>
                <FormHelperText id="component-helper-text">{helperText}</FormHelperText>
              </Grid></Grid>
    );

    case "text":
      var label="";
      var icon=[];
      var addicon=[];
      var helperText="";
      switch(this.props.data.field){
        case "name":
           label="Ad ve Soyad";
           icon=<AccountCircle className="sectionIcons" />;
           helperText="Məs: Toğrul Hacıyev";
          break;
        case "address":
           label="Address";
           icon= <Place className="sectionIcons" />;
           helperText="Məs: C.Məmmədov küç 27, AZ0100 Bakı, Azərbaycan ";
          break;
        case "institute":
           label="Təhsil müəssisəsi";
           helperText="Məs: Qafqaz Universiteti";
           icon=<FontAwesomeIcon  icon={faSchool} className="sectionIcons" />;
          break;
        case "course":
           label="Ixtisas və dərəcəsi";
           helperText="Məs: Kimya Mühəndisliyi - Bakalavr";
           icon=<School className="sectionIcons" />;
          break;
        case "workplace":
           label="İş Yeri";
           helperText="Məs: XXX MMC";
           icon=<FontAwesomeIcon  icon={faSchool} className="sectionIcons" />;
          break;
        case "position":
           label="Vəzifə";
           helperText="Məs: Administrator";
           icon=<School className="sectionIcons" />;
          break;
        default:
          break;
        }
      return(
         <Grid container spacing={16} alignItems="flex-end" justify="center" className="textFieldGrid" id={this.props.data.field}>
           <Grid item >
            {icon}
           </Grid>
           <Grid item  xs={10} lg={8} md={6}>
           <TextField id={this.props.data.field+"Input"} label={label} margin="normal" helperText={helperText} variant="outlined" value={this.props.data.value} onChange={( event, field)=>this.props.handleAddElementValue( event.target.value,this.props.data.field)} className="TextField"/>
         </Grid> {addicon}
         </Grid>
       );
    case "cvEmail":
      return(<Grid container spacing={16} alignItems="flex-end" justify="center" className="textFieldGrid" id="tempEmail">
        <Grid item>
          <Mail className="sectionIcons" />
        </Grid>
        <Grid item  xs={10} lg={8} md={6}>
          <TextField value={this.props.data.value} onChange={( event, field)=>this.props.handleAddElementValue( event.target.value,this.props.data.field)}  label="Email" helperText="Məs: xxxxxxxxxx@gmail.com" margin="normal"   variant="outlined" className="TextField"/>
        </Grid>
      </Grid>);
      case "cvWebsite":
         label="Website";
         helperText="Məs: http://meselen.az";
         icon= <Public className="sectionIcons" />;
           let website="";
        if (typeof this.props.data.value !== 'undefined' ){
          website=this.props.data.value.map((tab,i)=>
         <Grid container spacing={16} key={i}  alignItems="flex-end" justify="center" className={classNames("textFieldGrid", "added"+this.props.data.field)}  >
           <Grid item xs={10} lg={8} md={6} >

           <Paper elevation={1}>
               <Typography variant="h6" component="p" style={{paddingLeft:10,}}>
                 {tab}
                 <Delete className="deleteElementIcon" onClick={(event,field)=>this.handleDeleteElement(event,this.props.data.field) } />
                 <FontAwesomeIcon  icon={faEdit} className="editElementIcon" />
               </Typography>
             </Paper>
           </Grid>

         </Grid>); }
          return(
            <Grid container spacing={16}  alignItems="flex-end" justify="center" style={{marginLeft:30,}} className="textFieldGrid" >
            <Grid item xs={12} lg={12} md={12} >
    {website}
                  <Grid container spacing={16}  alignItems="flex-end" justify="center" className="textFieldGrid" >
                      <Grid item>
                        {icon}
                      </Grid>
                      <Grid item xs={10} lg={8} md={6} >
               <TextField
                 value={this.state.inputCvWebsite.tab}
                 label={label} margin="normal"
                 helperText={helperText}
                 variant="outlined"
                className={classNames("TextField", this.props.data.field)}/>
               </Grid>
                <Grid item>
                   <AddCircle
                     className="sectionIcons addElemIcons"
                     onClick={(event,field) => this.props.handleAddElement(event, this.props.data.field)}
                    />
                 </Grid>
               </Grid>

             </Grid>
             </Grid>
           );

  case "cvPhone":
  let phone="";
    if (typeof this.props.data.value !== 'undefined' ){
    phone=this.props.data.value.map((tab,i)=>
      <Grid container spacing={16} key={i}  alignItems="flex-end" justify="center"  className={classNames("textFieldGrid", "added"+this.props.data.field)} >
        <Grid item xs={10} lg={8} md={6} >

        <Paper elevation={1}>
            <Typography variant="h6" component="p" style={{paddingLeft:10,}}>
              {tab}
              <Delete className="deleteElementIcon" onClick={(event,field)=>this.handleDeleteElement(event,this.props.data.field) } />
              <FontAwesomeIcon  icon={faEdit} className="editElementIcon" />
            </Typography>

          </Paper>
        </Grid>

      </Grid>
    );
  }
        return( <Grid container spacing={16}  alignItems="flex-end" justify="center" style={{marginLeft:30,}} className="textFieldGrid" >
        <Grid item xs={12} lg={12} md={12} >
{phone}
              <Grid container spacing={16}  alignItems="flex-end" justify="center" className="textFieldGrid" >
                  <Grid item>
                    <LocalPhone className="sectionIcons" />
                  </Grid>
                  <Grid item xs={10} lg={8} md={6} >
                      <TextField
                        label="Phone"
                        helperText="Məs: (+994) 55xxx-xx-xx"
                        margin="normal"
                        variant="outlined"
                        className={classNames("TextField", this.props.data.field)}
                        />
                  </Grid>
                   <Grid item>
                      <AddCircle
                        className="sectionIcons addElemIcons"
                        onClick={(event,field) => this.props.handleAddElement(event, this.props.data.field)} />
                    </Grid>
                  </Grid>

                </Grid>
                </Grid>);


    case "cvPhoto":
      return(
        <Grid container spacing={24} justify="center" >

        <Avatar id="avatar" alt="Remy Sharp"  ><Person className="personicon" /></Avatar>
        <Grid item xs={12} lg={12} md={12} >
        <TextField id="outlined-with-placeholder" label="Occupation" margin="normal" variant="outlined" className="TextField "/>
      </Grid>  </Grid>);
    case "birthdate":
      helperText="Doğum Tarixi";
      let dateformat="dd . MM . yyyy";
      return (<Grid container spacing={16} alignItems="flex-end" justify="center" className="textFieldGrid" id={this.props.data.section_ref}>
        <Grid item >
          <CakeIcon className="sectionIcons" style={{marginBottom:10,}}/>
        </Grid>
        <Grid item  xs={10} lg={8} md={6}>
          <DateFormatInput name='date-input' className={this.props.data.field} transf ormOrigin={{ vertical: 'top',horizontal:'left'}} fullWidth={true} dateFormat={dateformat} value={this.props.data.value}  onChange={(Date,field)=>this.onChangeDate(Date, this.props.data.field)}/>
          <FormHelperText id="component-helper-text">{helperText}</FormHelperText>
        </Grid>
      </Grid>)
    case "fromDate":
      helperText="Başlanğıc Tarixi";
      dateformat="MM . yyyy";
      return ( <Grid item xs={6} lg={4} md={6}>
                <DateFormatInput name='date-input' className={this.props.data.field} transf ormOrigin={{ vertical: 'top',horizontal:'left'}} fullWidth={true} dateFormat={dateformat} value={this.props.data.value}  onChange={(Date,field)=>this.onChangeDate(Date, this.props.data.field)}/>
                <FormHelperText id="component-helper-text">{helperText}</FormHelperText>
              </Grid>
              )
   case "toDate":
     helperText="Bitiş Tarixi";
     dateformat="MM . yyyy";
     return ( <Grid item xs={6} lg={4} md={6}>
               <DateFormatInput name='date-input' className={this.props.data.field} transf ormOrigin={{ vertical: 'top',horizontal:'left'}} fullWidth={true} dateFormat={dateformat} value={this.props.data.value}   onChange={(Date,field)=>this.onChangeDate(Date, this.props.data.field)}/>
               <FormHelperText id="component-helper-text">{helperText}</FormHelperText>
             </Grid>
             )
    case "textarea":
        return(         <Grid container spacing={16} alignItems="flex-end" justify="center" className="textFieldGrid" id={this.props.data.field}>

           <Grid item style={{ marginLeft:30,}}>
            {icon}
           </Grid>
           <Grid item  xs={10} lg={8} md={6}>
                <TextField
              label="Vəzifə Öhdəlikləri"
              placeholder={" - Sistemin idarə olunması \n - Çin dilində tərcümə \n - İş saatlarından əlavə şirkətin qabağını süpürmək \n - Müdürə Çay\n - Risklərin Hesablanması "}
              multiline
              margin="normal"
              variant="outlined"
              fullWidth={true}
              style={{height:100,}}
              rows={5}
            /> </Grid></Grid>
           );
    case "dropdown":
          switch(this.props.data.field){
            case "language":
               label="Xarici Dil";
               helperText="Məs: Ingilis";
               icon=<Language className="sectionIcons" />;
              return(<Grid container spacing={24}   justify="center" alignItems="center">
               <Grid item xs={6} lg={4} md={6}>
                <Grid container spacing={16} alignItems="flex-end" justify="center" className="textFieldGrid" id={this.props.data.field}>
                <Grid item>
                  {icon}
                </Grid>
                  <Grid item  xs={9} lg={9} md={9}>
                  <TextField id={this.props.data.field+"Input"} label={label} margin="normal" helperText={helperText} variant="outlined"  value={this.props.data.value} onChange={( event, field)=>this.props.handleAddElementValue( event.target.value,this.props.data.field)} className="TextField"/>

                  </Grid>
                <Grid item  xs={12} lg={1} md={1} style={{marginBottom:7,}}>

                <FormControl >
                    <NativeSelect
                        value={this.state.LangDefaultValue}
                      onChange={this.handleLangChange}
                      input={
                        <BootstrapInput name="age" id="age-customized-native-simple" />
                      }
                    >
                      <option value="" />
                      <option value="weak">Zəif</option>
                      <option value="good">Yaxşı</option>
                      <option value="perfect">Əla</option>
                      <option value="fluent">Səlis</option>
                    </NativeSelect>
                    <FormHelperText>Səviyyə</FormHelperText>

                  </FormControl></Grid>
                    {addicon}
                </Grid>
              </Grid>
</Grid>
                );
            default:
              break;
          }
    case "tags":
      switch(this.props.data.field){
        case "skills":
            icon=<FontAwesomeIcon  icon={faTags} className="tagIcon" />

           return (
                     <Grid item xs={6} lg={6} md={6} >
                        <Grid container spacing={16} alignItems="flex-end" justify="center" className="textFieldGrid" id={this.props.data.field}>
                           <Grid item>
                             {icon}
                           </Grid>
                          <Grid item  xs={9} lg={9} md={9}>
                             <div id="skillTag">
                               <Chips
                                 value={this.state.chips}
                                 onChange={this.onChangeTag}
                                 suggestions={["Your", "Data", "Here"]}
                                 />
                             </div>
                          </Grid>
                        </Grid>
                      </Grid>
                  );
     default:
     break;
      }

      default:
          break;
  }

 }
}


Elements.propTypes = {
  errorAddNewSection:PropTypes.func.isRequired,
  error: PropTypes.bool,

};
const mapStateToProps = state => ({
  error:state.errorHandling.error,
});
export default withStyles(styles)(connect(mapStateToProps, {errorAddNewSection })(Elements));

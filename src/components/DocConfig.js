



import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';






const styles = {

};

class  DocConfig extends Component{
  constructor(props){
    super(props);
    this.state={

}
  }




render(){
    return(
      <div>
      <Typography variant="h5" align="center" color="primary" gutterBottom>
        Configuration
    </Typography>
      </div>
  );
 }
}

DocConfig.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DocConfig);

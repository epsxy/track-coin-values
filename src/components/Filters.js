import React, { Component } from "react";
import green from "@material-ui/core/colors/green";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import selectTimeLength from "../actions/index";
import { connect } from "react-redux";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = { timeLength: "7d" };
  }

  updateTimeLength = event => {
    console.warn("component");
    this.props.selectTimeLength(event.target.value);
  };

  render() {
    return (
      <div>
        <RadioGroup
          aria-label="position"
          name="position"
          value={this.props.timeLength}
          onChange={this.updateTimeLength}
          row
        >
          <FormControlLabel
            value="24h"
            control={<Radio color="primary" />}
            label="24 hours"
            labelPlacement="end"
          />
          <FormControlLabel
            value="7d"
            control={<Radio color="primary" />}
            label="7 days"
            labelPlacement="end"
          />
          <FormControlLabel
            value="30d"
            control={<Radio color="primary" />}
            label="30 days"
            labelPlacement="end"
          />
          <FormControlLabel
            value="1y"
            control={<Radio color="primary" />}
            label="1 year"
            labelPlacement="end"
          />
          <FormControlLabel
            value="5y"
            control={<Radio color="primary" />}
            label="5 years"
            labelPlacement="end"
          />
        </RadioGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    timeLength: state.timeLength,
    dispatch: state.dispatch
  };
};

/*
const mapDispatchToProps = dispatch => ({
  selectTimeLength: message => dispatch(selectTimeLength(message))
});
*/

export default connect(
  mapStateToProps,
  { selectTimeLength }
)(Filters);

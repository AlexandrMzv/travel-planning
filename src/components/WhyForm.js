import React, { Component } from 'react';
import { withStyles, Paper, Typography, TextField, Box, } from '@material-ui/core';
import { connect } from "react-redux";
import { Autocomplete } from '@material-ui/lab';
import { tripPurpose } from "../actions/mainForm";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  typography: {
    fontSize: 20,
  },
});

/**
 * Компонент выбора цели поездки.
 *
 * @component
 */
class WhyForm extends Component {
  /**
   * Устанавливает цель из хранилища.
   */
  componentDidMount() {
    if (this.props.token) {
      if (this.props.currentTripData) {
        this.props.purposeChange({label: this.props.currentTripData.trip.o_trip.purpose});
      }
    }
  }
  /**
   * Обработчик событий изменения цели поездки.
   */
  handlePurposeChange = (event, newPurpose) => {
    this.props.purposeChange(newPurpose);
  };

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.paper}>
        <Box mb={2}>
          <Typography className={classes.typography}>
            Зачем
          </Typography>
        </Box>
        <Typography>
          <Autocomplete
            id="country-select-demo"
            style={{ width: 300 }}
            value={this.props.purpose}
            onChange={this.handlePurposeChange}
            options={countries}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (
              <React.Fragment>
                {option.label}
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Тип поездки"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
          />
        </Typography>
      </Paper>
    );
  }
}

const countries = [
  { label: 'Командировка' },
  { label: 'Кемпинг' },
  { label: 'Выходные' },
  { label: 'Отдых на пляже' },
  { label: 'Круиз' },
  { label: 'Пеший туризм' },
  { label: 'Другое' },
];

const mapStateToProps = state => ({
  /**
   * Токен пользователя.
   */
  token: state.token,
  /**
   * Цель поездки.
   */
  purpose: state.mainForm.tripPurpose.purpose,
  /**
   * Данные о поездке.
   */
  currentTripData: state.tripsForm.currentTripData.data,
});

const mapDispatchToProps = dispatch => ({
  /**
   * Изменение цели поездки.
   */
  purposeChange: purpose => dispatch(tripPurpose(purpose)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WhyForm));
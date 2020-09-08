import React, { Component }  from 'react';
import { withStyles, Paper, Grid, Typography, Box, } from '@material-ui/core';
import {connect} from "react-redux";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import { tripDateFrom, tripDateTo } from "../actions/mainForm";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  fontSize: 15,
  '& > span': {
    marginRight: 10,
    fontSize: 18,
  },
  typography: {
    fontSize: 20,
  },
});

/**
 * Компонент выбора дат поездки.
 *
 * @component
 */
class WhenForm extends Component {
  /**
   * Устанавливает дату начала и завершения поездки из хранилища.
   */
  componentDidMount() {
    if (this.props.token) {
      if (this.props.currentTripData) {
        this.props.dateFromChange(this.props.currentTripData.trip.o_trip.date_from.substring(0, 10));
        this.props.dateToChange(this.props.currentTripData.trip.o_trip.date_to.substring(0, 10));
      }
    }
  }
  /**
   * Обработчик событий изменения даты начала поездки.
   */
  handleDateChangeFrom = (date) => {
    this.props.dateFromChange(date);
  };
  /**
   * Обработчик событий изменения даты завершения поездки.
   */
  handleDateChangeTo = (date) => {
    this.props.dateToChange(date);
  };

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography className={classes.typography}>
          Когда
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="flex-start" alignItems="flex-start">
              <Box>
                <KeyboardDatePicker
                  style={{ width: 300 }}
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline-from"
                  label="Туда"
                  value={this.props.dateFrom}
                  onChange={this.handleDateChangeFrom}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Box>
              <Box ml={10}>
                <KeyboardDatePicker
                  style={{ width: 300 }}
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline-to"
                  label="Обратно"
                  value={this.props.dateTo}
                  onChange={this.handleDateChangeTo}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Box>
            </Grid>
          </MuiPickersUtilsProvider>
        </Typography>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  /**
   * Токен пользователя.
   */
  token: state.token,
  /**
   * Дата начала.
   */
  dateFrom: state.mainForm.tripDates.dateFrom,
  /**
   * Дата завершения.
   */
  dateTo: state.mainForm.tripDates.dateTo,
  /**
   * Данные о поездке.
   */
  currentTripData: state.tripsForm.currentTripData.data,
});

const mapDispatchToProps = dispatch => ({
  /**
   * Изменение даты начала поездки.
   */
  dateFromChange: dateFrom => dispatch(tripDateFrom(dateFrom)),
  /**
   * Изменение даты завершения поездки.
   */
  dateToChange: dateTo => dispatch(tripDateTo(dateTo)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WhenForm));
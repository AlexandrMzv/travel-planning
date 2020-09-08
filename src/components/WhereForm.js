import React, { Component } from 'react';
import { withStyles, Paper, Typography, TextField, Box } from '@material-ui/core';
import { connect } from "react-redux";
import { Autocomplete } from '@material-ui/lab';
import { tripPlace } from "../actions/mainForm";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  typography: {
    fontSize: 20,
  },
});

/**
 * Компонент выбора местаназначения поездки.
 *
 * @component
 */
class WhereForm extends Component {
  /**
   * Устанавливает местоназначение из хранилища.
   */
  componentDidMount() {
    if (this.props.token) {
      if (this.props.currentTripData) {
        this.props.placeChange({label: this.props.currentTripData.trip.o_trip.place});
      }
    }
  }
  /**
   * Обработчик событий изменения местоназначения поездки.
   */
  handlePlaceChange = (event, newPlace) => {
    this.props.placeChange(newPlace);
  };

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.paper}>
        <Box mb={2}>
          <Typography className={classes.typography}>
            Куда
          </Typography>
        </Box>
        <Typography>
          <Autocomplete
            id="destination-select-demo"
            style={{ width: 300 }}
            value={this.props.place}
            onChange={this.handlePlaceChange}
            options={cities}
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
                label="Место назначения"
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

const cities = [
  { label: 'Москва' },
  { label: 'Нью-Йорк' },
  { label: 'Сеул' },
  { label: 'Лондон' },
  { label: 'Токио' },
  { label: 'Киото' },
  { label: 'Киев' },
  { label: 'Денвер' },
  { label: 'Вашингтон' },
  { label: 'Амстердам' },
  { label: 'Берлин' },
  { label: 'Мельбурн' },
  { label: 'Оттава' },
  { label: 'Мехико' },
  { label: 'Пекин' },
  { label: 'Минск' },
  { label: 'Стокгольм' },
  { label: 'Берн' },
  { label: 'Хельсинки' },
  { label: 'Париж' },
  { label: 'Рим' },
];

const mapStateToProps = state => ({
  /**
   * Токен пользователя.
   */
  token: state.token,
  /**
   * Местоназначение поездки.
   */
  place: state.mainForm.tripPlace.place,
  /**
   * Данные о поездке.
   */
  currentTripData: state.tripsForm.currentTripData.data,
});

const mapDispatchToProps = dispatch => ({
  /**
   * Изменение местаназначения поездки.
   */
  placeChange: place => dispatch(tripPlace(place)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WhereForm));
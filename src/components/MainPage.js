import React, { Component }  from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TripCard from './TripCard';
import Header from './Header';
import { currentTripDataGet } from "../actions/mainForm";
import { tripId } from "../actions/mainForm";

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

/**
 * Компонент главной страницы приложения
 *
 * @component
 * @example
 * <MainPage history={this.props.history}/>
 */
class MainPage extends Component {
  /**
   * Если у выбранной поездки есть id в url, то загрузить информацию о ней, иначе id === 0.
   */
  componentDidMount() {
    if (this.props.token) {
      if (this.props.match) {
        this.props.currentTripDataGet(this.props.match.params.id);
        this.props.idChange(this.props.match.params.id);
      } else
        this.props.idChange(0);
    }
  }

  render() {
    const {classes} = this.props;
    if (this.props.dataIsLoading)
      return (
        <div className={classes.root}>
          <Header/>
        </div>
      );
    return (
      <div className={classes.root}>
        <Header/>
        <TripCard history={this.props.history} />
      </div>
    );
  }
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  /**
   * Токен пользователя.
   */
  token: state.token,
  /**
   * Состояние загрузки данных.
   */
  dataIsLoading: state.tripsForm.dataIsLoading,
  /**
   * Данные о поездке.
   */
  currentTripData: state.tripsForm.currentTripData,
});

const mapDispatchToProps = dispatch => ({
  /**
   * Изменение id поездки.
   */
  idChange: id => dispatch(tripId(id)),
  /**
   * Получение информации о поездке.
   */
  currentTripDataGet: tripId => dispatch(currentTripDataGet(tripId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainPage));
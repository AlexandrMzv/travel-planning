import React, { Component }  from 'react';
import { withStyles, Paper, Grid, Fab, Container, IconButton, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { tripDataGet } from '../actions/mainForm';
import Header from './Header';
import TripListMap from './TripListMap';
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  pagination: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
});

/**
 * Компонент страницы списка поездок
 *
 * @component
 */
class TripsList extends Component {
  /**
   * Получение информации о поездке.
   */
  componentDidMount() {
    this.props.tripDataGet();
  }

  render() {
    const {classes} = this.props;
    if (!this.props.token)
      return (<Redirect to='/'/>);
    return (
      <div className={classes.root}>
        <Header/>
        <Container fixed>
          <Grid
            container
            justify="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={0}>
                <IconButton
                  aria-label="add new trip"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"

                  component={Link}
                  to="/"
                >
                  <Fab color="secondary">
                    <AddIcon />
                  </Fab>
                </IconButton>
              </Paper>
            </Grid>
            <TripListMap tripsSummary={this.props.tripsSummary}/>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  /**
   * Токен пользователя.
   */
  token: state.token,
  /**
   * Краткая информация о поездках.
   */
  tripsSummary: state.tripsForm.tripsSummary,
});

const mapDispatchToProps = dispatch => ({
  /**
   * Получение информации о поездке.
   */
  tripDataGet: () => dispatch(tripDataGet()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TripsList));

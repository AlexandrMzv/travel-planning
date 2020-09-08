import React, { Component }  from 'react';
import { withStyles, Paper, Grid, Fab, IconButton, } from '@material-ui/core';
import PrintSharpIcon from '@material-ui/icons/PrintSharp';
import EmailSharpIcon from '@material-ui/icons/EmailSharp';
import SaveSharpIcon from '@material-ui/icons/SaveSharp';
import { connect } from 'react-redux';
import { tripDataSend } from '../actions/mainForm';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

/**
 * Компонент кнопок save, share.
 *
 * @component
 * @example
 * <ShareButtons history={this.props.history}/>
 */
class ShareButtons extends Component {
  /**
   * Обработчик событий сохранения поездки в базу данных.
   */
  handleSave = () => {
    console.log(this.props.tripInfo);
    this.props.tripDataSend(this.props.tripInfo);
    this.props.history.push('/trips');
  };
  /**
   * Обработчик событий печати плана поездки.
   * Не реализован.
   */
  handlePrint = () => {
    console.log("print")
  };
  /**
   * Обработчик событий отправки плана поездки по email.
   * Не реализован.
   */
  handleEmail = () => {
    console.log("email")
  };

  render() {
    const {classes} = this.props;
    return (
      <Grid container justify="space-around" >
        <Paper className={classes.paper} elevation={0}>
          {this.props.token && (
          <IconButton
            aria-label="save trip"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handleSave}
          >
            <Fab color="primary">
              <SaveSharpIcon />
            </Fab>
          </IconButton>
          )}
          <IconButton
            aria-label="save trip"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handlePrint}
          >
            <Fab color="primary">
              <PrintSharpIcon />
            </Fab>
          </IconButton>
          <IconButton
            aria-label="save trip"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handleEmail}
          >
            <Fab color="primary">
              <EmailSharpIcon />
            </Fab>
          </IconButton>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  /**
   * Токен пользователя.
   */
  token: state.token,
  /**
   * Данные о поездке.
   */
  tripInfo: state.mainForm,
});

const mapDispatchToProps = dispatch => ({
  /**
   * Изменение данных о поездке в базе.
   */
  tripDataSend: tripInfo => dispatch(tripDataSend(tripInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShareButtons));
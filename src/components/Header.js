import React, { Component }  from 'react';
import { Button, AppBar, Toolbar, IconButton, Typography, withStyles,
  Menu, MenuItem, } from '@material-ui/core';
import { Link } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { onLogout } from "../actions/mainForm";

const styles = () => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  title: {
    flexGrow: 1,
  },
});

/**
 * Компонент шапка приложения
 *
 * @component
 */
class Header extends Component {
  state = {
    anchorEl: undefined,
    open: false,
  };
  /**
   * Обработчик событий открытия выпадающего меню.
   */
  handleMenu = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };
  /**
   * Обработчик событий перехода в профиль пользователя.
   * Не реализован.
   */
  handleProfile = () => {
    console.log("profile");
    this.setState({ open: false });
  };
  /**
   * Обработчик событий закрытия выпадающего меню.
   */
  handleClose = () => {
    console.log("close");
    this.setState({ open: false });
  };
  /**
   * Обработчик событий выхода из аккаунта.
   */
  handleExit = (event) => {
    this.setState({ open: false, anchorEl: null });
    event.preventDefault();
    localStorage.removeItem("token");
    this.props.logoutUser();
  };

  render() {
    const {classes} = this.props;
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Планирование путешествий
          </Typography>
          {this.props.token && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={this.state.open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
                <MenuItem onClick={this.handleExit}>Exit</MenuItem>
              </Menu>
            </div>

          )}
          {!this.props.token && (
            <div>
              <Button color='inherit' component={Link} to='/auth'>Вход</Button>
              <Button color='inherit' component={Link} to='/register'>Регистрация</Button>
            </div>
          )}

        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  /**
   * Токен пользователя.
   */
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  /**
   * Выход из аккаунта.
   */
  logoutUser: () => dispatch(onLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
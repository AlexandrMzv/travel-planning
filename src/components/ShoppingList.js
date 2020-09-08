import React, { Component }  from 'react';
import { withStyles, Typography, Paper, Box, } from '@material-ui/core';
import { connect } from "react-redux";
import MaterialTable from 'material-table';
import { addTripShoppingList, updateTripShoppingList,
  deleteTripShoppingList, setTripShoppingList, } from "../actions/mainForm";

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
 * Компонент таблицы списка покупок.
 *
 * @component
 */
class ShoppingList extends Component {
  /**
   * Устанавливает данные в таблицу из хранилища.
   */
  componentDidMount() {
    if (this.props.token) {
      if (this.props.currentTripData) {
        if (this.props.currentTripData.trip.o_shopping_list) {
          this.props.setTripShoppingList(this.props.currentTripData.trip.o_shopping_list);
        } else
          this.props.setTripShoppingList([]);
      }
    }
  }

  state = {
    columns: [
      { title: 'Название', field: 'title' },
      { title: 'Количество', field: 'quantity' },
      { title: 'Сумма', field: 'sum' },
    ],
  };

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.paper}>
        <Box mb={2}>
          <Typography className={classes.typography}>
            Купить
          </Typography>
        </Box>
        <Typography>
          <MaterialTable
            title=' '
            columns={this.state.columns}
            data={this.props.shoppingList}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  resolve();
                  this.props.addToShoppingList(newData);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  resolve();
                    if (oldData) {
                      this.props.updateTripShoppingList(newData, oldData);
                    }
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  resolve();
                  this.props.deleteTripShoppingList(oldData);
                }),
            }}
            localization={{
              body: {
                emptyDataSourceMessage: 'Нет записей',
                addTooltip: 'Добавить',
                deleteTooltip: 'Удалить',
                editTooltip: 'Изменить',
                filterRow: {
                  filterTooltip: 'Отфильтровать'
                },
                editRow: {
                  deleteText: 'Удалить эту запись?',
                  cancelTooltip: 'Отменить',
                  saveTooltip: 'Сохранить'
                }
              },
              grouping: {
                placeholder: 'Переместить заголовки ...',
                groupedBy: 'Сгруппировать по:'
              },
              header: {
                actions: 'Действия'
              },
              pagination: {
                labelDisplayedRows: '{from}-{to} из {count}',
                labelRowsSelect: 'Записей',
                labelRowsPerPage: 'Записей на странице:',
                firstAriaLabel: 'Первая страница',
                firstTooltip: 'Первая страница',
                previousAriaLabel: 'Предыдущая страница',
                previousTooltip: 'Предыдущая страница',
                nextAriaLabel: 'Следующая страница',
                nextTooltip: 'Следующая страница',
                lastAriaLabel: 'Последняя страница',
                lastTooltip: 'Последняя страница'
              },
              toolbar: {
                addRemoveColumns: 'Добавить или удалить столбцы',
                nRowsSelected: '{0} записей выделено',
                showColumnsTitle: 'Показать столбцы',
                showColumnsAriaLabel: 'Показать столбцы',
                exportTitle: 'Экспортировать',
                exportAriaLabel: 'Экспортировать',
                exportName: 'Экспортировать в CSV',
                searchTooltip: 'Поиск',
                searchPlaceholder: 'Поиск'
              }
            }}
          />
        </Typography>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  /**
   * Токен пользователя.
   */
  token: state.token,
  /**
   * Таблица списка покупок.
   */
  shoppingList: state.mainForm.tripShoppingList,
  /**
   * Данные о поездке.
   */
  currentTripData: state.tripsForm.currentTripData.data,
});

const mapDispatchToProps = dispatch => ({
  /**
   * Добавление данных в таблицу.
   */
  addToShoppingList: newData => dispatch(addTripShoppingList(newData)),
  /**
   * Изменение данных в таблице.
   */
  updateTripShoppingList: (newData, oldData) => dispatch(updateTripShoppingList(newData, oldData)),
  /**
   * Удаление данных из таблицы.
   */
  deleteTripShoppingList: oldData => dispatch(deleteTripShoppingList(oldData)),
  /**
   * Установка данных в таблицу.
   */
  setTripShoppingList: data => dispatch(setTripShoppingList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShoppingList));
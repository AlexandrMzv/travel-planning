import React, { Component } from 'react';
import { Paper, Box, } from '@material-ui/core';
import {
  GroupingState,
  IntegratedGrouping,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles, Typography, } from '@material-ui/core';
import {connect} from "react-redux";
import { setTripPackingList } from "../actions/mainForm";

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
 * Локализация таблицы.
 */
const editColumnMessages = {
  addCommand: 'Добавить',
  editCommand: 'Изменить',
  deleteCommand: 'Удалить',
  commitCommand: 'Сохранить',
  cancelCommand: 'Отменить',
};
const tableMessages = {
  noData: 'Нет записей',
};

let currentCategory = "";
/**
 * Устанавливает выбранную категорию вещей
 *
 * @param {boolean} grNames Наименование категории.
 */
const setCurrentCategory = grNames => {
  currentCategory = grNames.length > 0 ? grNames[grNames.length - 1] : "";
};
const getRowId = row => row.id;

/**
 * Компонент таблицы списка вещей.
 *
 * @component
 */
class PackingList extends Component {
  /**
   * Устанавливает данные в таблицу из хранилища.
   */
  componentDidMount() {
    if (this.props.token) {
      if (this.props.currentTripData) {
        if (this.props.currentTripData.trip.o_packing_list) {
          this.props.setTripPackingList(this.props.currentTripData.trip.o_packing_list);
        } else
          this.props.setTripPackingList([]);
      }
    }
  }

  state = {
    columns: [
     { title: 'Название', name: 'title' },
      { title: 'Количество', name: 'quantity' },
      { title: 'Категория', name: 'category' },
    ],
  };
  /**
   * Обработка изменений в таблице.
   */
  commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = this.props.packingList.length > 0 ?
          this.props.packingList[this.props.packingList.length - 1].id + 1 : 0;
      changedRows = [
        ...this.props.packingList,
        ...added.map((row, index) => ({
          id: startingAddedId + index,

          category: currentCategory,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = this.props.packingList.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = this.props.packingList.filter(row => !deletedSet.has(row.id));
    }
    this.props.setTripPackingList(changedRows);
  };

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.paper}>
        <Box mb={2}>
          <Typography className={classes.typography}>
            Взять с собой
          </Typography>
        </Box>
        <Typography>
          <Grid
            rows={this.props.packingList}
            columns={this.state.columns}
            getRowId={getRowId}
          >
            <EditingState
              onCommitChanges={this.commitChanges}
            />

            <GroupingState
              grouping={[{ columnName: 'category' }]}
              onExpandedGroupsChange={(expandedGroups) => setCurrentCategory(expandedGroups) }
            />
            <IntegratedGrouping />
            <Table
              messages={tableMessages}
            />
            <TableHeaderRow />
            <TableEditRow />
            <TableGroupRow />
            <TableEditColumn
              showAddCommand
              showEditCommand
              showDeleteCommand
              width={175}
              messages={editColumnMessages}
            />
          </Grid>
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
   * Таблица списка вещей.
   */
  packingList: state.mainForm.tripPackingList,
  /**
   * Данные о поездке.
   */
  currentTripData: state.tripsForm.currentTripData.data,
});

const mapDispatchToProps = dispatch => ({
  /**
   * Установка данных в таблицу.
   */
  setTripPackingList: data => dispatch(setTripPackingList(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PackingList));
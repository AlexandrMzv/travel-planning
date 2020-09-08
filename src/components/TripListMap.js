import React, { Component } from 'react';
import TripSummary from './TripSummary';
import { Grid, withStyles, } from '@material-ui/core';
import { Link } from "react-router-dom";

const styles = () => ({
  plainLink: {
    textDecoration: 'none',
  }
});

/**
 * Компонент отображения списка поездок
 *
 * @component
 * @example
 * <TripListMap tripsSummary={this.props.tripsSummary}/>
 */
class TripListMap extends Component {
  render() {
    const {classes} = this.props;
    if (Array.isArray(this.props.tripsSummary))
      return (this.props.tripsSummary.map((trip) => (
        <Grid item xs={12} className = {classes.plainLink} component={Link} to={`/trip/${trip.id}`}>
          <TripSummary trip={trip}/>
        </Grid>
      )));
    return(
      <div>Loading</div>
    )
  }
}

export default withStyles(styles)(TripListMap);
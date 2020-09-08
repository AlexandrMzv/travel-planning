import React, { Component }  from 'react';
import { withStyles, Grid, Container, Box, } from '@material-ui/core';
import WhyCard from './WhyForm';
import WhenCard from './WhenForm';
import WhereCard from './WhereForm';
import ShoppingCardList from './ShoppingList';
import PackingListCard from './PackingList';
import ShareButtons from './ShareButtons';

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
 * Компонент страницы поездки
 *
 * @component
 * @example
 * <TripCard history={this.props.history} />
 */
class TripCard extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Container fixed>
          <Grid
            container
            justify="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <Box mt={2}>
                <WhenCard/>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <WhereCard/>
            </Grid>
            <Grid item xs={12}>
              <WhyCard/>
            </Grid>
            <Grid item xs={12}>
              <PackingListCard/>
            </Grid>
            <Grid item xs={12}>
              <ShoppingCardList/>
            </Grid>
            <Grid item xs={12}>
              <ShareButtons history={this.props.history}/>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(TripCard);
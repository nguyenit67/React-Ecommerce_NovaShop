import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 auto',
  },
}));

function ListPage(props) {
  const classes = useStyles();

  return (
    <div>
      <Box {...{} /* section.product-list-page */}>
        <Container>
          {' '}
          {/* div.container */}
          <Grid container spacing={1}>
            <Grid item className={classes.left}>
              <Paper elevation={0}>Left</Paper>
            </Grid>
            <Grid item className={classes.right}>
              <Paper elevation={0}>Right</Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default ListPage;

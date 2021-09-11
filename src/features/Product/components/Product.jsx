import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  return (
    <Box padding={1}>
      <Skeleton variant="rect" width="100%" height={118} />
      <Typography variant="body2"></Typography>
    </Box>
  );
}

export default Product;

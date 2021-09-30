import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import PriceFormat from 'components/custom-formats/PriceFormat';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [prices, setPrices] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (event) => {
    setPrices((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (onChange) onChange(prices);

    setPrices({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">GIÁ</Typography>

      <Box className={classes.range}>
        <TextField
          name="salePrice_gte"
          value={prices.salePrice_gte}
          onChange={handleChange}
          InputProps={{
            inputComponent: PriceFormat,
          }}
        />
        <span>-</span>
        <TextField
          name="salePrice_lte"
          value={prices.salePrice_lte}
          onChange={handleChange}
          InputProps={{
            inputComponent: PriceFormat,
          }}
        />
      </Box>

      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleSubmit}
      >
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;

import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import PriceField from 'components/custom-fields/PriceField';
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
    salePrice_gte: null,
    salePrice_lte: null,
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
      salePrice_gte: null,
      salePrice_lte: null,
    });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">GIÁ</Typography>

      <Box className={classes.range}>
        <PriceField
          name="salePrice_gte"
          value={prices.salePrice_gte}
          onChange={handleChange}
          placeholder="Từ"
        />
        <span>-</span>
        <PriceField
          name="salePrice_lte"
          value={prices.salePrice_lte}
          onChange={handleChange}
          placeholder="Đến"
        />
      </Box>

      <Button
        fullWidth
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

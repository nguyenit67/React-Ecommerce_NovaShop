import { Box, Button, makeStyles, TextField, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,

    '& .MuiInputBase-input': {
      padding: '0.5rem',
    },
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  rangeLine: {
    height: '1px',
    width: '15px',
    margin: '0 5px',
    backgroundColor: theme.palette.grey[700],
  },
}));

const StyledTextField = withStyles({})((props) => (
  <TextField variant="outlined" color="secondary" {...props} />
));

export default function FilterByPrice({ onChange }) {
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
        <StyledTextField
          name="salePrice_gte"
          value={prices.salePrice_gte}
          onChange={handleChange}
          placeholder="Từ"
        />
        <Box component="div" className={classes.rangeLine} />
        <StyledTextField
          name="salePrice_lte"
          value={prices.salePrice_lte}
          onChange={handleChange}
          placeholder="Đến"
        />
      </Box>

      <Button fullWidth variant="outlined" color="primary" size="small" onClick={handleSubmit}>
        Áp dụng
      </Button>
    </Box>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (event, newValue) => {
    onChange?.(newValue);
  };

  return (
    <Box display="flex" alignItems="center" fontWeight="400">
      <Box component="span" ml={1} marginRight="4px">
        Sắp xếp theo:
      </Box>
      <Tabs
        value={currentSort}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleSortChange}
        aria-label="product sort tabs"
      >
        <Tab label="Hàng mới" value="updated_at:DESC" />
        <Tab label="Giảm giá" value="promotionPercent:DESC" />
        <Tab label="Giá thấp tới cao" value="salePrice:ASC" />
        <Tab label="Giá cao xuống thấp" value="salePrice:DESC" />
      </Tabs>
    </Box>
  );
}

export default ProductSort;

import { Box, Chip, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { formatPriceShort } from 'utils/unitFormatters';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    padding: 0,
    margin: theme.spacing(2, 0),
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    // Miễn phí ship
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: null,
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }

      return newFilters;
    },
  },
  {
    // Khuyến mãi
    id: 2,
    getLabel: () => 'Có khuyến mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: null,
  },
  {
    // Khoảng giá
    id: 3,
    getLabel: (filters) =>
      `Từ ${formatPriceShort(filters.salePrice_gte)} đến ${formatPriceShort(
        filters.salePrice_lte
      )}`,
    isActive: () => true,
    isVisible: (filters) =>
      filters.salePrice_gte != null && filters.salePrice_lte != null,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };

      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;

      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 4,
    getLabel: (filters) => `Danh mục: ${filters['category.id']}`,
    isActive: () => true,
    isVisible: (filters) => 'category.id' in filters,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: null,
  },
];

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();

  const visibleFilterList = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilterList.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',
      cursor: 'pointer',

      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
  },
}));

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((item) => ({
            id: item.id,
            name: item.name,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.log('Fail to fetch category list', error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>

      <ul className={classes.menu}>
        {loading
          ? [...Array(6)].map((_, index) => (
              <li key={index}>
                <Skeleton variant="text" />
              </li>
            ))
          : // the real category list
            categoryList.map((category) => (
              <li key={category.id} onClick={() => handleCategoryClick(category)}>
                <Typography variant="body2">{category.name}</Typography>
              </li>
            ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;

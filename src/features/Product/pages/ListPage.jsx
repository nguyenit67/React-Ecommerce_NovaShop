import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '30px',
    paddingBottom: '20px',
  },
}));

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 10,
  });
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState(() => ({
    ...queryParams,
    _page: Number.parseInt(queryParams._page) || 1,
    _limit: Number.parseInt(queryParams._limit) || 12,
    _sort: queryParams._sort || 'salePrice:ASC',
    isFreeShip: queryParams.isFreeShip === 'true',
    isPromotion: queryParams.isPromotion === 'true',
  }));

  // debugger;

  useEffect(() => {
    // Sync filters to URL
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  }, [history, filters]); // when filters change, history is CONSTANTLY UNCHANGED

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setPagination(pagination);
        console.log({ data, pagination });
      } catch (error) {
        console.log('Fail to fetch product list', { error });
      }

      setLoading(false);
    })();
  }, [filters]);

  const handlePaginationChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };

  const handleSortChange = (newSortValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _sort: newSortValue,
    }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const setNewFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // debugger;

  /* 
    section.product-list-page 
    |_.container
      |_.row
        |_.column   
  */
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters
                filters={filters}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={filters._sort}
                onChange={handleSortChange}
              />
              <FilterViewer filters={filters} onChange={setNewFilters} />

              {loading ? (
                <ProductSkeletonList length={9} />
              ) : (
                <ProductList data={productList} />
              )}
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePaginationChange}
                  siblingCount={1}
                  boundaryCount={2}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;

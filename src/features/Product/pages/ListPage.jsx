import { Box, Container, Grid, makeStyles, Paper, withStyles } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import productApi from 'api/productApi';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { KeyboardBackspace } from '@material-ui/icons';
import FilterViewer from '../components/FilterViewer';
import NoFoundProduct from '../components/NoFoundProduct';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

/**
 * @typedef {import('@material-ui/lab').PaginationProps} PaginationProps
 *
 */

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

const TRUTH_TABLE = {
  true: true,
  false: false,
};

export default function ListPage() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    // true --> "true"
    // { isPromotion: "true" }
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'updated_at:DESC',
      isFreeShip: TRUTH_TABLE[params.isFreeShip] || undefined,
      isPromotion: TRUTH_TABLE[params.isPromotion] || undefined,
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 10,
  });
  const totalPageCount = Math.ceil(pagination.total / pagination.limit);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
        console.log({ data, pagination });
      } catch (error) {
        console.log('Fail to fetch product list', { error });
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePaginationChange = (_evt, page) => {
    // filters updated from UI
    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newSortValue) => {
    // filters updated from UI
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    // filters updated from UI
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

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
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0} component={Box}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />

              {loading ? (
                <ProductSkeletonList length={10} />
              ) : productList.length === 0 ? (
                <NoFoundProduct />
              ) : (
                <ProductList data={productList} />
              )}
              <Box className={classes.pagination}>
                <ProductPagination
                  onChange={handlePaginationChange}
                  page={pagination.page}
                  count={totalPageCount || 1}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/**
 * @param {PaginationProps} props
 */
function ProductPagination(props) {
  const { siblingCount = 2, page: activePage, count: totalPageCount } = props;

  return (
    <Pagination
      color="primary"
      variant="outlined"
      siblingCount={siblingCount}
      renderItem={(item) => {
        if (item.type === 'start-ellipsis' || item.type === 'end-ellipsis') {
          return null;
        }
        if (item.type === 'previous') {
          return (
            activePage > 1 && (
              <PaginationItem {...item} component={KeyboardBackspace}></PaginationItem>
            )
          );
        }
        if (item.type === 'next') {
          return (
            activePage < totalPageCount && (
              <PaginationItem
                {...item}
                component={withRotate180(KeyboardBackspace)}
              ></PaginationItem>
            )
          );
        }
        const siblingCountLeft = activePage === totalPageCount ? siblingCount + 1 : siblingCount;
        const siblingCountRight = activePage < 2 ? siblingCount + 1 : siblingCount;
        if (
          item.page < activePage - siblingCountLeft ||
          item.page > activePage + siblingCountRight
        ) {
          return null;
        }
        return <PaginationItem {...item} />;
      }}
      {...props}
    />
  );
}

const withRotate180 = (Icon) =>
  withStyles({
    root: {
      transform: 'rotate(180deg)',
    },
  })(Icon);

import { Box, Tab, Tabs, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      // maxWidth: 80,
      width: '100%',
      backgroundColor: theme.palette.primary.main,
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const MyTab = withStyles((theme) => ({
  root: {
    minWidth: 120,
    padding: theme.spacing(1),
    borderTop: '2px solid transparent',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s',

    '&:hover': {
      color: theme.palette.primary.main,
      // borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export default function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (_event, newValue) => {
    onChange?.(newValue);
  };

  return (
    <Box display="flex" alignItems="center" fontWeight="400" paddingLeft="16px">
      {/* <Box component="span" marginLeft="16px" marginRight="4px">
        Sắp xếp theo:
      </Box> */}
      <StyledTabs
        value={currentSort}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleSortChange}
        aria-label="product sort tabs"
      >
        <MyTab label="Hàng mới" value="updated_at:DESC" />
        <MyTab label="Giảm giá" value="promotionPercent:DESC" />
        <MyTab label="Giá thấp" value="salePrice:ASC" />
        <MyTab label="Giá cao" value="salePrice:DESC" />
      </StyledTabs>
    </Box>
  );
}

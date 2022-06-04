import { Badge, Container, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close, ShoppingCart, Whatshot } from '@material-ui/icons';
import SearchBar from 'components/SearchBar';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { selectCartItemsCount } from 'features/Cart/selectors';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  signInButton: {},
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

const MODES = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const cartItemsCount = useSelector(selectCartItemsCount);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODES.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  // handle Dialog open & close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (_event, reason) => {
    if (reason === 'escapeKeyDown' || reason === 'backdropClick') return;
    setOpen(false);
  };

  // handle Menu open & close
  const handleUserClickOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    handleCloseMenu();
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0}>
        <Container>
          <Toolbar disableGutters>
            <Grid item container xs={3} direction="row" alignItems="flex-start">
              <Whatshot className={classes.menuButton} />
              <Typography variant="h6" className={classes.title}>
                <Link className={classes.link} to="/">
                  NOVA SHOP
                </Link>
              </Typography>
            </Grid>

            <Grid item xs>
              <SearchBar />
            </Grid>

            <Grid
              item
              container
              xs={3}
              justifyContent="flex-end"
              direction="row"
              alignItems="center"
            >
              {isLoggedIn !== true && (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.signInButton}
                  onClick={handleClickOpen}
                >
                  ĐĂNG NHẬP
                </Button>
              )}

              <Link className={classes.link} to="/cart">
                <IconButton size="medium" color="inherit">
                  <Badge badgeContent={cartItemsCount} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Link>
              {isLoggedIn && (
                <IconButton color="inherit" onClick={handleUserClickOpenMenu}>
                  <AccountCircle />
                </IconButton>
              )}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      {/* this ⬇ for fixed AppBar doesn't hide page content */}
      <Toolbar />

      {isLoggedIn && (
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        // disableBackdropClick
        // disableEscapeKeyDown
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODES.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="secondary" onClick={() => setMode(MODES.LOGIN)}>
                  Have an account? Login here.
                </Button>
              </Box>
            </>
          )}

          {mode === MODES.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="secondary" onClick={() => setMode(MODES.REGISTER)}>
                  Don't have an account? Register here.
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

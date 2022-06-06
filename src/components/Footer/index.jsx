import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Footer() {
  return (
    <AppBar component="footer" position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography>&copy; {new Date().getFullYear()} NovaShop</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

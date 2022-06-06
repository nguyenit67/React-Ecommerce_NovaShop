import { Box, ThemeProvider } from '@material-ui/core';
import Footer from 'components/Footer';
import Header from 'components/Header';
import novaShopTheme from 'theme/nova';

export default function MainShoppingLayout({ children }) {
  return (
    <ThemeProvider theme={novaShopTheme}>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />

        <Box component="main" flexGrow={1} marginBottom={4}>
          {children}
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

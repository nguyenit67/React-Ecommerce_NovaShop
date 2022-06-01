import { ThemeProvider } from '@material-ui/core';
import Header from 'components/Header';
import novaShopTheme from 'theme/nova';

export default function MainShoppingLayout({ children }) {
  return (
    <ThemeProvider theme={novaShopTheme}>
      <Header />

      {children}
    </ThemeProvider>
  );
}

import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: { sm: 30 }
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;

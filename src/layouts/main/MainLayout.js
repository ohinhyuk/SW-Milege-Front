import PropTypes from 'prop-types';
// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import MiniDrawer from 'src/components/common/Drawer/Drawer';
import Header from 'src/components/common/Header';
// @mui
import { Box } from '@mui/material';
import ExcelExport from 'src/components/excel/ExcelExport';
//

// const Header = dynamic(() => import('./Header'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default function MainLayout({ children }) {
  // const { pathname } = useRouter();

  // const isHome = pathname === '/';

  return (
    <Box sx={{}}>
      <Header />
      <MiniDrawer />

      <Box
        component="main"
        sx={{
          pl: '100px',
          mr: '40px',
        }}
      >
        {children}

        <ExcelExport />
      </Box>

      {/* <Footer /> */}
    </Box>
  );
}

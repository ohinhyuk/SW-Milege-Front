import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { setComponentNum } from 'src/redux/slices/component';
import { dispatch } from 'src/redux/store';

export default function TitleAndRefreshButton({ type }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography color="primary" variant="h5" sx={{ mb: 2 }}>
        {type} {' 리스트'}
      </Typography>

      <Link href="/">
        <Button
          variant="outlined"
          sx={{ padding: '2px 10px' }}
          onClick={() => dispatch(setComponentNum(0))}
        >
          필터링 새로고침 버튼
        </Button>
      </Link>
    </Box>
  );
}

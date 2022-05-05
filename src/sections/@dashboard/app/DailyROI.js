// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
import PropTypes from 'prop-types';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

export default function DailyROI() {
  return (
    <RootStyle>
      <Stack spacing={3} sx={{ px: 3, pr: 0, pt: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            component="img"
            src="https://fishfarm.money/i/treasury.png"
            sx={{ width: 48, height: 48, flexShrink: 0 }}
          />

          <Box sx={{ minWidth: 240, flexGrow: 1 }}>
            <Typography color="inherit" variant="h6" noWrap>
              Daily ROI
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              8%
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack sx={{ p: 3, pr: 0 }}>
        <Stack direction="row" sx={{ px: 0, pt: 0 }}>
          <Typography variant="body2" sx={{ flexGrow: 1, m: 0 }} noWrap>
            APR
          </Typography>
          <Typography variant="body2" sx={{ px: 3, py: 0 }} noWrap>
            2920%
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ px: 0, py: 0, pt: 0 }}>
          <Typography variant="body2" sx={{ flexGrow: 1, m: 0 }} noWrap>
            Dev tax
          </Typography>
          <Typography variant="body2" sx={{ px: 3, py: 0 }} noWrap>
            3%
          </Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}

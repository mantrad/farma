// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
import PropTypes from 'prop-types';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

// ----------------------------------------------------------------------

ContractBalance.propTypes = {
  image: PropTypes.string,
  BalanceContract: PropTypes.string,
  Participants: PropTypes.string,
  Hired: PropTypes.string
};
export default function ContractBalance({ image, BalanceContract, Participants, Hired }) {
  return (
    <RootStyle>
      <Stack spacing={3} sx={{ px: 3, pr: 0, pt: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            component="img"
            src="https://fishfarm.money/i/profit.png"
            sx={{ width: 48, height: 48, flexShrink: 0 }}
          />

          <Box sx={{ minWidth: 240, flexGrow: 1 }}>
            <Link color="inherit" variant="subtitle1" noWrap>
              Contract Balance
            </Link>

            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {BalanceContract || '0'} AVAX
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack sx={{ p: 3, pr: 0 }}>
        <Stack direction="row" sx={{ px: 0, pt: 0 }}>
          <Typography variant="body2" sx={{ flexGrow: 1, m: 0 }} noWrap>
            Participants
          </Typography>
          <Typography variant="body2" sx={{ px: 3, py: 0 }} noWrap>
            {Participants || '0'} investors
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ px: 0, py: 0, pt: 0 }}>
          <Typography variant="body2" sx={{ flexGrow: 1, m: 0 }} noWrap>
            Fishers hired
          </Typography>
          <Typography variant="body2" sx={{ px: 3, py: 0 }} noWrap>
            {Hired || '0'} times
          </Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}

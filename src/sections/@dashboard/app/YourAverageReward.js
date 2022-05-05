// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

// ----------------------------------------------------------------------

YourAverageReward.propTypes = {
  averageReward: PropTypes.number
};
export default function YourAverageReward({ averageReward }) {
  return (
    <RootStyle>
      <Typography variant="h3">{fShortenNumber(averageReward)} AVAX</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Your Average Reward
      </Typography>
    </RootStyle>
  );
}

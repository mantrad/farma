// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const RootStyle = styled(Box)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  alignItems: 'center'
}));

Logo.propTypes = {
  isReferred: PropTypes.bool
};

export default function Logo({ isReferred }) {
  return (
    <RootStyle>
      <Typography variant="h3">Hire to fish for you,and earn 8% daily.</Typography>
    </RootStyle>
  );
}

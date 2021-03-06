import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Button, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { networkParams } from '../../utils/networks';
import { toHex, truncateAddress } from '../../utils/utils';
import { providerOptions } from '../../utils/providerOptions';
import { Web3Context } from '../../web3';
import Iconify from '../../components/Iconify';

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions // required
});

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: '#ffffff00',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const { account, connectWeb3, logout, ChainId, switchNetwork } = useContext(Web3Context);
  useEffect(() => {}, [account, connectWeb3, logout, ChainId, switchNetwork]);
  return (
    <RootStyle>
      <ToolbarStyle>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mr: 1, color: 'text.primary', display: { xs: 'none', sm: 'none', md: 'block' } }}
        >
          <Link component={RouterLink} variant="subtitle1" to="#" underline="hover">
            Audit
          </Link>
          <Link component={RouterLink} variant="subtitle1" to="#" underline="hover">
            Contract
          </Link>
          <Link component={RouterLink} variant="subtitle1" to="#" underline="hover">
            FAQ
          </Link>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
          px={{ xs: 1, sm: 2, md: 50 }}
        >
          {ChainId !== 43114 ? (
            <Button variant="outlined" onClick={switchNetwork}>
              Switch Network
            </Button>
          ) : (
            ''
          )}
          {account && ChainId === 43114 ? (
            <Button variant="outlined" onClick={logout}>
              {`${truncateAddress(account)}`}
            </Button>
          ) : (
            ''
          )}
          {!account && ChainId === 43114 ? (
            <Button
              variant="outlined"
              onClick={connectWeb3}
              startIcon={<Iconify icon="logos:metamask-icon" />}
            >
              MetaMask
            </Button>
          ) : (
            ''
          )}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

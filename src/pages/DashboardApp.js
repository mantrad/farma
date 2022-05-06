import { useState, useEffect, useContext } from 'react';
import { Box, Grid, Container, Typography, Link, Stack } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { providerOptions } from '../utils/providerOptions';
import Page from '../components/Page';
import contractAbi from '../contracts/abi.json';
import { Web3Context } from '../web3';
import {
  ContractBalance,
  DailyROI,
  Referral,
  Logo,
  Hire,
  Reward
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------
const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});
// check valid address ref
export default function DashboardApp() {
  const { account, projectStats, Balance, userStats, Power, Instance } = useContext(Web3Context);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [verified, setVerified] = useState();
  const [balanceContract, setBalanceContract] = useState();
  const [balance, setBalance] = useState();
  const [participants, setParticipants] = useState();
  const [hired, setHired] = useState();
  const [power, setPower] = useState();
  const [reward, setReward] = useState();
  const [rewardBoost, setRewardBoost] = useState();
  const [instance, setInstance] = useState();
  useEffect(() => {
    if (projectStats) {
      setBalanceContract(Number(ethers.utils.formatUnits(projectStats[0], 18)).toFixed(2));
      setParticipants(ethers.utils.formatUnits(projectStats[1], 0));
      setHired(ethers.utils.formatUnits(projectStats[2], 0));
    }
    if (Balance) {
      setBalance(Number(ethers.utils.formatUnits(Balance, 18)).toFixed(5));
    }
    if (userStats) {
      setReward(Number(ethers.utils.formatEther(userStats[0].toString())).toFixed(5));
      setRewardBoost(
        120 * +Number(ethers.utils.formatEther(userStats[0].toString()) / 100).toFixed(6)
      );
    }
    if (Power) {
      setPower(ethers.utils.formatUnits(Power, 0));
    }
    if (Instance) {
      setInstance(Instance);
    }
  }, [projectStats, Balance, userStats, Power, Instance]);
  return (
    <Page title="Dashboard | WEREWOLF">
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12} sx={{ px: 0, py: 5 }}>
            <Logo />
          </Grid>
          <Grid
            item
            xs={12}
            container
            spacing={3}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ px: 0, py: 5 }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <ContractBalance
                BalanceContract={balanceContract}
                Participants={participants}
                Hired={hired}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DailyROI />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Hire Balance={balance} Power={power} Instance={instance} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} sx={{ px: 0, pb: 5 }}>
            <Reward
              Instance={instance}
              Reward={reward}
              Account={account}
              RewardBoost={rewardBoost}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={12} sx={{ px: 0, pb: 5 }}>
            <Referral />
          </Grid>
          <Grid
            item
            xs={12}
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ px: 0, py: 0 }}
          >
            <Stack direction="row" spacing={2}>
              <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
                Audit
              </Link>
              <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
                Contract
              </Link>
              <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
                Twitter
              </Link>
              <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
                Telegram
              </Link>
              <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
                FAQ
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

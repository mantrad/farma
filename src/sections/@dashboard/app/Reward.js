import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// material
import {
  Box,
  Stack,
  Card,
  CardHeader,
  Typography,
  TextField,
  Tooltip,
  IconButton
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';

Reward.propTypes = {
  Instance: PropTypes.object,
  Reward: PropTypes.string,
  Account: PropTypes.string,
  RewardBoost: PropTypes.number
};

export default function Reward({ Instance, Reward, Account, RewardBoost }) {
  const [submittingSell, setSubmittingSell] = useState();
  const [submittingReHire, setSubmittingReHire] = useState();
  const sellFish = async () => {
    try {
      await setSubmittingSell(true);
      await Instance.sellFish();
      await setSubmittingSell(false);
    } catch (error) {
      await setSubmittingSell(false);
    }
  };
  const rehireFishers = async () => {
    try {
      await setSubmittingReHire(true);
      await Instance.rehireFishers(Account);
      await setSubmittingReHire(false);
    } catch (error) {
      await setSubmittingReHire(false);
    }
  };
  return (
    <Card>
      <CardHeader title="Your Rewards" variant="h1" />
      <Stack sx={{ px: 3, pr: 0 }}>
        <Stack direction="row" sx={{ px: 0, pt: 3 }}>
          <Typography variant="body1" sx={{ flexGrow: 1, m: 0 }} noWrap>
            Re-hire
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ px: 0, pt: 1 }}>
          <Typography variant="body2" sx={{ flexGrow: 1, m: 0 }} noWrap>
            65% chance
            <Tooltip
              title="65% chance to earn base rewards"
              placement="top"
              disableFocusListener
              disableTouchListener
            >
              <IconButton>
                <Iconify icon="fa:question-circle" width={15} height={15} />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography variant="body2" sx={{ px: 3, py: 0 }} noWrap>
            {Reward || '0'} AVAX
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ px: 0, py: 0, pt: 0 }}>
          <Typography variant="body2" sx={{ flexGrow: 1, m: 0 }} noWrap>
            35% chance
            <Tooltip
              title="35% chance to earn 120% rewards"
              placement="top"
              disableFocusListener
              disableTouchListener
            >
              <IconButton>
                <Iconify icon="fa:question-circle" width={15} height={15} />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography variant="body2" sx={{ px: 3, py: 0 }} noWrap>
            {RewardBoost || '0'} AVAX
          </Typography>
        </Stack>
      </Stack>
      <Stack sx={{ px: 3, pr: 0 }}>
        <Stack direction="row" sx={{ px: 0, pt: 3 }}>
          <Typography variant="body1" sx={{ flexGrow: 1, m: 0 }} noWrap>
            Sell
            <Tooltip
              title={`Claim and receive ${Reward || 0} avax`}
              placement="top"
              disableFocusListener
              disableTouchListener
            >
              <IconButton>
                <Iconify icon="fa:question-circle" width={15} height={15} />
              </IconButton>
            </Tooltip>
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ px: 0, pt: 2 }}>
          <Typography variant="body2" sx={{ flexGrow: 1, m: 0 }} noWrap>
            100% chance
          </Typography>
          <Typography variant="body2" sx={{ px: 3, py: 0 }} noWrap>
            {Reward || '0'} AVAX
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Stack direction="row" spacing={1} sx={{ pt: 1, borderRadius: 2, position: 'relative' }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={submittingReHire}
            onClick={rehireFishers}
          >
            Re-hire
          </LoadingButton>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={submittingSell}
            onClick={sellFish}
          >
            sell
          </LoadingButton>
        </Stack>
      </Box>
    </Card>
  );
}

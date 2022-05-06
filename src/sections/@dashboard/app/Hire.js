import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { ethers } from 'ethers';
import * as Yup from 'yup';
import { Box, Stack, Card, CardHeader, Typography, TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

Hire.propTypes = {
  Balance: PropTypes.string,
  Power: PropTypes.string,
  Instance: PropTypes.object,
  Account: PropTypes.string
};

export default function Hire({ Balance, Power, Instance, Account }) {
  const navigate = useNavigate();
  const DeadWallet = '0x0000000000000000000000000000000000000000';
  const AddressSchema = Yup.object().shape({
    amount: Yup.number()
      .min(0.1, 'Larger than 0.5')
      .max(500, 'Less than 500')
      .required('Between 0.1 to 500')
  });
  const formik = useFormik({
    initialValues: {
      amount: ''
    },
    validationSchema: AddressSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const address = new URLSearchParams(window.location.search).get('ref');
      const isAddress = ethers.utils.isAddress(address);
      if (isAddress) {
        await Instance.hireFishers(address, {
          value: ethers.utils.parseEther(values.amount.toString())
        });
      } else {
        await Instance.hireFishers(DeadWallet, {
          value: ethers.utils.parseEther(values.amount.toString())
        });
      }
      await setSubmitting(false);
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <Card>
      <CardHeader title="Hire Fishers" variant="h1" />
      <Stack sx={{ px: 3, pr: 0 }}>
        <Stack direction="row" sx={{ px: 0, pt: 3 }}>
          <Typography variant="body1" sx={{ flexGrow: 1, m: 0 }} noWrap>
            Your stats
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ px: 0, pt: 1 }}>
          <Typography variant="body2" sx={{ flexGrow: 1, m: 0 }} noWrap>
            Wallet amount
          </Typography>
          <Typography variant="body2" sx={{ px: 3, py: 0 }} noWrap>
            {Balance || '0'} AVAX
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ px: 0, py: 0, pt: 0 }}>
          <Typography variant="body2" sx={{ flexGrow: 1, m: 0 }} noWrap>
            Fishing power
          </Typography>
          <Typography variant="body2" sx={{ px: 3, py: 0 }} noWrap>
            {Power || '0'}
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3} justifyContent="space-between" sx={{ my: 2 }}>
              <TextField
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">Avax Amount</InputAdornment>,
                  inputProps: { min: 0, max: 10, style: { textAlign: 'right' } }
                }}
                min={11}
                max={20}
                {...getFieldProps('amount')}
                placeholder="Between 0.1 to 500"
                error={Boolean(touched.amount && errors.amount)}
                helperText={touched.amount && errors.amount}
              />
            </Stack>
            <Stack
              alignItems="center"
              spacing={1}
              sx={{ pt: 1, borderRadius: 2, position: 'relative' }}
            >
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Hire
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}

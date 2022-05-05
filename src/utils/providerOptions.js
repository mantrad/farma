import WalletConnect from '@walletconnect/web3-provider';

export const providerOptions = {
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: '27e484dcd9e3efcfd25a83a78777cdf1' // required
    }
  }
};

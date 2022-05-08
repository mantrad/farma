import { createContext, useCallback, useReducer, useEffect, useState } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import walletLinkModule from '@web3-onboard/walletlink';
import { Web3Reducer } from './reducer';
import { providerOptions } from '../utils/providerOptions';
import { toHex } from '../utils/utils';
import contractAbi from '../contracts/abi.json';

const contractAddress = '0x8BeA96dBe7C85127A68aD6916949670eB5c45e9c';

const initialState = {
  loading: false,
  account: null,
  provider: null,
  projectStats: null,
  userStats: null,
  Balance: null,
  Power: null
};

const Web3Context = createContext(initialState);

const injected = injectedModule();
const walletConnect = walletConnectModule();
const walletLink = walletLinkModule();

const onboard = Onboard({
  wallets: [walletConnect, injected],
  chains: [
    {
      id: '0xA86A', // chain ID must be in hexadecimel
      token: 'AVAX', // main chain token
      namespace: 'evm',
      label: 'AVAX C Chain',
      rpcUrl: 'https://api.avax.network/ext/bc/C/rpc'
    }
  ],
  appMetadata: {
    name: 'My App',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    description: 'My app using Onboard',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ]
  }
});

export default function Web3Provider({ children }) {
  const [state, dispatch] = useReducer(Web3Reducer, initialState);
  const [provider, setProviderA] = useState();
  const [library, setLibrary] = useState();
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [verified, setVerified] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const setAccount = (account) => {
    dispatch({
      type: 'SET_ACCOUNT',
      payload: account
    });
  };

  const setProvider = (provider) => {
    dispatch({
      type: 'SET_PROVIDER',
      payload: provider
    });
  };
  const setProjectStats = (projectStats) => {
    dispatch({
      type: 'SET_PROJECTSTATS',
      payload: projectStats
    });
  };
  const setUserStats = (userStats) => {
    dispatch({
      type: 'SET_USERSTATS',
      payload: userStats
    });
  };
  const setBalance = (Balance) => {
    dispatch({
      type: 'SET_BALANCE',
      payload: Balance
    });
  };
  const setPower = (Power) => {
    dispatch({
      type: 'SET_POWER',
      payload: Power
    });
  };
  const setInstance = (Instance) => {
    dispatch({
      type: 'SET_INSTANCE',
      payload: Instance
    });
  };
  const setChainId = (ChainId) => {
    dispatch({
      type: 'SET_CHAINID',
      payload: ChainId
    });
  };
  const logout = async () => {
    const [primaryWallet] = await onboard.state.get().wallets;
    if (!primaryWallet) return;
    await onboard.disconnectWallet({ label: primaryWallet.label });
    setAccount();
    setProvider();
  };
  const switchNetwork = async () => {
    await onboard.setChain({ chainId: '0xA86A' });
  };
  const walletsSub = onboard.state.select('wallets');
  const { unsubscribe } = walletsSub.subscribe((wallets) => {
    const connectedWallets = wallets.map(({ label }) => label);
    window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWallets));
  });
  const connectWeb3 = useCallback(async () => {
    const previouslyConnectedWallets = JSON.parse(window.localStorage.getItem('connectedWallets'));
    let wallets = null;
    if (previouslyConnectedWallets && previouslyConnectedWallets[0]) {
      wallets = await onboard.connectWallet({
        autoSelect: { label: previouslyConnectedWallets[0], disableModals: true }
      });
    } else {
      wallets = await onboard.connectWallet();
    }
    setIsLoading(true);
    const { accounts, chains, provider } = wallets[0];
    const library = new ethers.providers.Web3Provider(provider);
    const network = await library.getNetwork();
    const instance = new ethers.Contract(contractAddress, contractAbi, library.getSigner());
    setInstance(instance);
    const accountsWallet = await library.listAccounts();
    if (accountsWallet) {
      setAccount(accountsWallet[0]);
      console.log(accountsWallet[0]);
      setChainId(network.chainId);
      setProvider(provider);
      setIsLoading(false);
      library.on('block', (blockNumber) => {
        instance.getProjectStats().then((ProjectStats) => {
          setProjectStats(ProjectStats);
          console.log(ProjectStats);
        });
        instance.getUserStats(accountsWallet[0]).then((UserStats) => {
          setUserStats(UserStats);
        });
        instance.getUserFishingPower(accountsWallet[0]).then((Power) => {
          setPower(Power);
        });
        library.getBalance(accountsWallet[0]).then((Balance) => {
          setBalance(Balance);
        });
      });
    }
  }, []);

  useEffect(() => {
    connectWeb3();
  }, [connectWeb3]);

  useEffect(() => {
    window.ethereum.on('message', (accounts) => {
      console.log('connect');
    });
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log('accountsChanged', accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        console.log(_hexChainId);
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log('disconnect', error);
        logout();
      };
      const handleConnect = () => {
        console.log('connect');
      };
      console.log(provider);
      provider.on('connect', handleConnect);
      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
          provider.removeListener('connect', handleConnect);
        }
      };
    }
  }, [provider]);

  return (
    <Web3Context.Provider
      value={{
        ...state,
        connectWeb3,
        logout,
        switchNetwork
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
export { Web3Context, Web3Provider };

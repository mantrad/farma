import { createContext, useCallback, useReducer, useEffect } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

import { Web3Reducer } from './reducer';
import { providerOptions } from '../utils/providerOptions';
import contractAbi from '../contracts/abi.json';

const initialState = {
  loading: false,
  account: null,
  provider: null,
  projectStats: null
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions
});

const Web3Context = createContext(initialState);

export default function Web3Provider({ children }) {
  const [state, dispatch] = useReducer(Web3Reducer, initialState);

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
  const logout = async () => {
    setAccount(null);
    setProvider(null);
    await web3Modal.clearCachedProvider();
  };

  const connectWeb3 = useCallback(async () => {
    const provider = await web3Modal.connect();
    console.log('a');
    const library = new ethers.providers.Web3Provider(provider);
    setProvider(library);
    window.web3 = library;
    const accounts = await library.listAccounts();
    const network = await library.getNetwork();
    if (accounts) {
      setAccount(accounts[0]);
      const contractAddress = '0x8BeA96dBe7C85127A68aD6916949670eB5c45e9c';
      const instance = new ethers.Contract(contractAddress, contractAbi, library.getSigner());
      const ProjectStats = await instance.getProjectStats();
      setProjectStats(ProjectStats);
    }

    provider.on('chainChanged', () => {
      window.location.reload();
    });

    provider.on('accountsChanged', () => {
      window.location.reload();
    });
  }, []);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWeb3();
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        ...state,
        connectWeb3,
        logout
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
export { Web3Context, Web3Provider };

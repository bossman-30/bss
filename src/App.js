import React, { useState, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import Task from './components/Task';
import './App.css';

// Default styles from Solana wallet adapter UI
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
    // State to toggle between Mainnet and Devnet
    const [network, setNetwork] = useState('devnet');

    // Dynamically switch the RPC network based on state
    const endpoint = useMemo(() => {
        return network === 'mainnet' ? 'https://api.mainnet-beta.solana.com' : clusterApiUrl('devnet');
    }, [network]);

    // Solflare wallet configuration
    const solflare = useMemo(() => new SolflareWalletAdapter({ network }), [network]);

    const switchNetwork = () => {
        setNetwork(prevNetwork => (prevNetwork === 'mainnet' ? 'devnet' : 'mainnet'));
    };

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[solflare]}>
                <WalletModalProvider>
                    <div className="App">
                        <h1>SPL Token Airdrop</h1>
                        <p>Complete the task and claim your tokens!</p>

                        <Task />

                        {/* Button to switch between Mainnet and Devnet */}
                        <button onClick={switchNetwork}>
                            Switch to {network === 'mainnet' ? 'Devnet' : 'Mainnet'}
                        </button>

                        {/* Wallet Connection */}
                        <WalletMultiButton />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;

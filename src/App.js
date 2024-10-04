import React, { useState, useEffect } from "react";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";
import axios from "axios";

function App() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    // Fetch the connected wallets on component mount
    axios.get("https://your-backend-url/api/wallets").then((response) => {
      setWallets(response.data);
    });
  }, []);

  const connectWallet = async () => {
    const connector = new WalletConnectProvider({
      infuraId: "YOUR_INFURA_ID", // Replace with your Infura project ID
    });

    await connector.enable();
    const provider = new ethers.providers.Web3Provider(connector);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    setConnected(true);
    setAddress(userAddress);

    // Store the connected wallet address in the backend
    axios.post("https://your-backend-url/api/store-wallet", { walletAddress: userAddress });
  };

  return (
    <div>
      <h1>DApp with WalletConnect</h1>
      {!connected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected as: {address}</p>
          <h3>Connected Wallets</h3>
          <ul>
            {wallets.map((wallet) => (
              <li key={wallet._id}>{wallet.address}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

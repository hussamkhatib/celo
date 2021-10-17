import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'
import BigNumber from "bignumber.js"

import { useState,useEffect } from 'react'
const ERC20_DECIMALS = 18

function App() {

  const [celoBalance, setCeloBalance] = useState(0);
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);

  const connectCeloWallet = async function () {
    if (window.celo) {
        // alert("⚠️ Please approve this DApp to use it.")
      try {
        await window.celo.enable()
        // alert("enabled")
  
        const web3 = new Web3(window.celo)
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;
        await setAddress(user_address);
        console.log(user_address);
        console.log(celoBalance)
        await setKit(kit);
        // console.log(kit)

      } catch (error) {
        alert(`⚠️ ${error}.`)
      }
    } else {
      alert("⚠️ Please install the CeloExtensionWallet.")
    }
  }
    useEffect(() => {
      connectCeloWallet();

    }, []);

        
    const getBalance = async () => {
      const balance = await kit.getTotalBalance(address);
      const celoBalance = balance.CELO.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
  
  
      setCeloBalance(celoBalance);
      setcUSDBalance(USDBalance);
    };
    
    useEffect(() => {
      console.log({kit,address})
      if (kit && address) {
        return getBalance();
      } else {
        console.log("no kit or address");
      }
    }, [kit, address]);
  

  return (
    <div className="App">
      <div>
        {celoBalance}
      </div>
      <div>
        {address}
      </div>
      <div>
        {cUSDBalance}
      </div>
    </div>
  );
  }

export default App;

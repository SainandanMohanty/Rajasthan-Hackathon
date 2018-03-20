# Rajasthan-Hackathon - Project HealthChain
### theme : Blockchain

## Description:
1. Introducing **Healthcoin** a new cryptocurrency for the simple supply vs demand based economy of Patient Health Data exchange.
2. Introducing **Healthchain** a chain of hospitals,clinics,health trackers that have a uniform structure of collecting health information and a single Health Database.

## Problems Solved: 
1. The patient Health Information which is an important factor in Statistical Research and Data analysis is easily available.
2. Incentivization of supply of Patient Health Data through Healthchain.
3. Patient can spend Healthcoins earned in getting free treatments, medicines from the hospitals in Healthchain.

###### this repository contains a simple prototype of this idea.

## Running the apps

1. clone the repository
2. install node.js
3. install npm
> `npm init`  
> `node app`
4. app will run at `localhost:3000` by default

## Folders
### HealthChainWebApp :
Contains code for the client side web application
### HealthRecord:
Contains code for the Health Record to be uploaded by the Hospitals/Clinic.
More Records can be added later on according to requirement and kind of treatment.
### SmartContract:
Contains code for the Ethereum Blockchain

## How to set up the Blockchain(Ethereum) testrpc and use the SmartContract:

### Installing & Running the Ethereum TestRPC

The Ethereum TestRPC is a Node.js Ethereum client for the testing and developing smart contracts. Because it's based on Node.js, we need Node.js installed along with NPM (Node Package Manager) to install it.

Open up your command line or console and run the following 2 commands:

> node -v
> npm -v

If either of these commands go unrecognized, visit Nodejs.org and download the appropriate installer. Run it through all of the default options.

Once finished, close and reload your console and re-run the commands above. They should now provide you with version numbers.

Next, let's use NPM to install the Ethereumjs-testrpc:

> npm install -g ethereumjs-testrpc

Once finished, run the following command to start it:

> testrpc

This provides you with 10 different accounts and private keys, along with a local server at localhost:8545.

### Installing Web3.js

Web3.js is the official Ethereum Javascript API. You use it to interact with your Ethereum smart contracts.

Before we can install it, let's create a project folder in a new console window:

> mkdir healthcoin
> cd healthcoin

Next, run the npm init command to create a package.json file, which will store project dependencies:

> npm init

Hit enter through all of the prompts. Next, run the following command to install web3.js:

> npm install ethereum/web3.js --save

### Changing the Environment in Remix

Switch over to the Remix IDE (http://remix.ethereum.org), click on the Run tab, and then change the Environment dropdown from Javascript VM to Web3 Provider.

Hit "OK" and then specify the testrpc localhost address (by default, it's http://localhost:8545)

This means that instead of deploying and testing in the Javascript VM, we're now using the TestRPC client on your computer.

Paste the solidity code in this contract in a new solidity file called "HealthCoin.sol"

Hit Create. We will need the address of this contract shortly, so leave this window open.

### Using Web3.js to Connect & Interact with the Smart Contract

Going back to the index.html, at the bottom of the file, link it the the script file using <script src="/js/script.js"><script>.

This is where the necessary code to work with our smart contract is present.

In the head tags, we're already importing the Web3.js library, so now, let's use it to connect to our testrpc client:

Add the following lines to script.js.

        if (typeof web3 !== 'undefined') {

        web3 = new Web3(web3.currentProvider);

        } else {

        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

        }

This code comes directly from the Web3.js Github page.  

It's saying that if web3 is not undefined, then we'll use that as our provider. If it's undefined (else), we can manually specify the provider ourselves.

Next, we have to specify a default ethereum account to use through the web3.eth.defaultAccount method:

Add the following lines to script.js

        web3.eth.defaultAccount = web3.eth.accounts[0];
  
The testrpc console command provided us with 10 accounts. We're simply choosing the first account here to use.

Next, we need to use the web3.eth.contract() method to initiatlize (or create) the contract on an address. It accepts one parameter, which is referred to as the ABI (Application Binary Interface).

This ABI allows you to call functions and receive data from your smart contract.

If you switch back to the Remix IDE, click on the Compile tab and click Details. Scroll down until you see the Interface - ABI section and click the copy icon.

Going back to script.js paste the following code:

        web3.eth.defaultAccount = web3.eth.accounts[0];

        var HealthCoinContract = web3.eth.contract(PASTE ABI HERE!);
  
Great. Now that we have the interface for interacting with our contract through the HealthCoinContract variable, the last thing to do is to define the actual contract address.

We used Remix to create the contract earlier, and it has an associated address.
Go back to Remix and click the Run tab, and click on the copy icon next to the contract that we created earlier on the right column.

Back in script.js add the following line:

        web3.eth.defaultAccount = web3.eth.accounts[0];

        var HealthCoinContract = web3.eth.contract(YOUR ABI);

        var HealthCoin = HealthCoinContract.at('PASTE CONTRACT ADDRESS HERE');
        
Great. Let's save this, and then double click the index.html to run it in the browser.

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var HealthCoinContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "patient",
				"type": "string"
			}
		],
		"name": "getPatientBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "hospital",
				"type": "string"
			}
		],
		"name": "getHospitalBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newHospital",
				"type": "string"
			}
		],
		"name": "addHospital",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newPatient",
				"type": "string"
			}
		],
		"name": "addPatient",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "hospital",
				"type": "string"
			},
			{
				"name": "patient",
				"type": "string"
			}
		],
		"name": "creditBalance",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]);

var HealthCoin = HealthCoinContract.at('0x197234264b9e68366c3a9e862027baa6e6bd6015');
console.log(HealthCoin);

HealthCoin.getHospitalBalance("cws", function(error, result){
	if(!error){
		$("#balance").html("Hospital Balance is " + result.c + " HealthCoins");
	} else
		console.error(error);
});

$("#submit").click(function() {
	HealthCoin.creditBalance($("#hospital").val(), $("#patient").val());
});

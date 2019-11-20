const Web3 = require('web3');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = "info"
var pk = process.env.PK
var hrpc = process.env.HRPC
if(pk == null || hrpc ==null){
logger.warn("args ERROR");
} 
//var web3 = new Web3('http://172.20.46.123:8545');
var web3 = new Web3(hrpc);

// Create an account using a private key
var privateKey = pk;
var account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(account)
// Output address balance
web3.eth.getBalance(account.address).then(v=>{logger.info('address ' + account.address + ' balance:' + web3.utils.fromWei(v));});

var targetAddresses = [
    '0xcEb8D8E1708B490AF87FE440a28b4A334D292c5E',
    '0x0B46aF314B57CA5Da5B9Dc893b90b1b05FaEC9eE',
    '0xe705529709232778f587504d12C4cfD028ac9E02',
];
var currentIdx = 0;

logger.info('execute transactions...');
transferFunds();

function transferFunds(){
    // Transaction details
    var txObj = {
         "chainId": 1515,
         "from": account.address,
         "to": targetAddresses[currentIdx],
         "value": web3.utils.toWei(String(Math.random())),
         "gas": 100000,
         "gasPrice": 2000000000,
         "data":"0x00"};
    // console.log(txObj);
    web3.eth.accounts.signTransaction(txObj, privateKey).then(tx => {
        // console.log(tx);
        web3.eth.sendSignedTransaction(tx.rawTransaction).on('transactionHash', hash => {
            logger.info("submit transaction:", hash);
            queryTransactionReceipt(hash);
        }).on('error', error => {
            logger.warn("transaction  error:", error);
        });
    });
}

function queryTransactionReceipt(hash){
    
    web3.eth.getTransactionReceipt(hash, function(error, receipt){
        if (!error && receipt){
            if (receipt.status == '0x1' || receipt.status == '1' || receipt.status == true){
                logger.info("transaction " + hash + " has successfully executed");
            }else{
                logger.warn("transaction " + hash + " not executed successfully:", receipt);
            }
            // switch Address
            currentIdx++;
            if (currentIdx >= targetAddresses.length){currentIdx = 0;}
            logger.info("Sleeping");
            setTimeout(transferFunds, 1000 * 14 * Math.ceil(Math.random()*10));
        }else{
            setTimeout(function(hash){return function(){queryTransactionReceipt(hash);}}(hash), 1000);
        }        
    });
    
}

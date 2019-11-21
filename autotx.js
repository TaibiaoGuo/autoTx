const Web3 = require('web3');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = "info";
const pk = process.env.PK;
const hrpc = process.env.HRPC;
if(pk == null || hrpc ==null){
logger.warn("args ERROR");
}
//Tx Count
let txLimit = 1；
if(process.env.CORN == "TRUE"){txLimit = randomInt(50,100);} else {txLimit = 4;}
let txCount = 0;

let web3 = new Web3(hrpc);

// Create an account using a private key
const privateKey = pk;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
// console.log(account);
// Output address balance
web3.eth.getBalance(account.address).then(v=>{logger.info('address ' + account.address + ' balance:' + web3.utils.fromWei(v));});

const targetAddresses = [
    '0xcEb8D8E1708B490AF87FE440a28b4A334D292c5E',
    '0x0B46aF314B57CA5Da5B9Dc893b90b1b05FaEC9eE',
    '0xe705529709232778f587504d12C4cfD028ac9E02',
];
let currentIdx = 0;

logger.info('execute transactions...');
transferFunds();

function transferFunds(){
    // Transaction details
    let txObj = {
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
            txCount++;
            if (txCount >= txLimit){process.exit(0);}
            setTimeout(transferFunds, 1000 * randomInt(3,7));
        }else{
            setTimeout(function(hash){return function(){queryTransactionReceipt(hash);}}(hash), 1000);
        }        
    });
    
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

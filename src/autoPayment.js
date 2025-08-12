const payment = require('./makePayment');
const prompt = require('prompt-sync')({ sigint: true });

const autoPayment = async () => {
    const filePath = prompt('Enter the path to the transactions file: ');
    
    try {
        const transactions = require(filePath);

        for (const tx of transactions) {
            console.log(`Processing payment to ${tx.destinationAccount}...`);

            // This assumes the makePayment function is designed to handle this structure
            await payment(
                tx.sourceAccountPassphrase,
                tx.destinationAccount,
                tx.asset,
                tx.assetIssuer,
                tx.transferAmt,
                tx.memo
            );

            console.log('Payment sent. Waiting 5 seconds before next transaction...');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        console.log('All payments have been processed.');
    } catch (error) {
        console.error("Failed to process payments:", error);
    }
};

module.exports = autoPayment;
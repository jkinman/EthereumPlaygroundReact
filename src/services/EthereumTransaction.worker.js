
// self.addEventListener( 'expandBlock', (block, web3Service) => {
// console.log( 'WEBWORKER')
// 	let retVal = [];
// 	block.transactions.map(transaction => {
// 		Web3Service.web3.eth.getTransaction(transaction, (err, data) => {
// 			if (err) {
// 				console.error(err);
// 				return;
// 			}
// 			retVal.push(data);
// 		});
// 	});
// 	return retVal;

// })

self.addEventListener('message', function(e) {
  self.postMessage(e.data);
}, false);

// self.addEventListener( 'startCrawling', (blockchain, web3Service) => {
// console.log( 'WEBWORKER')
	
// 	postMessage( 'WEBWORKER: got startCrawling message')
// })
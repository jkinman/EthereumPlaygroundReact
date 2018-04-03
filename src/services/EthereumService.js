// This service manages syncronizing blocks from the ethereum block chain into the applicaiton
// Then manages a series of web workers to systematically pull in data that makes up the blocks

import Web3Service from "./Web3Service";

class EthereumService {
  constructor(addBlock) {
    this.addBlock = addBlock;
    this.pollEthereum();
  }

  get blockchain() {
    return this._blockchain;
  }

  set blockchain(blockchain) {
    this._blockchain = blockchain;
  }

  pollEthereum() {
    setTimeout(this.pollEthereum.bind(this), 4000);
    if (!Web3Service.connected()) return;
    // get the current block number if its ahead of ours download it
    Web3Service.getBlockNumber((err, data) => {
      if (err) console.error(err);
      if (!this.blockNumber) {
        for (let i = data - 1; i < data; i++) {
          this.processBlock(i, true)
        }
      } else if (this.blockNumber !== data) this.processBlock(data, true);
    });
  }

  makePixelsFromHexString(hash) {
    let trimmedHash;
    if (hash.indexOf("0x") === 0) {
      trimmedHash = hash.substring(2, hash.length);
    } else {
      trimmedHash = hash;
    }

    let bitmap = [];
    let i = 0;
    while (i < trimmedHash.length - 6) {
      let colourString = `#${trimmedHash.substring(i, i + 6)}`;
      let rgb = this.hexToRgb(colourString);
      bitmap.push(rgb);
      i = i + 6;
    }
    return bitmap;
  }

  roundColours(colour, power = 10) {
    colour.r = (parseInt(colour.r / power, power) + 1) * power;
    colour.g = (parseInt(colour.g / power, power) + 1) * power;
    colour.b = (parseInt(colour.b / power, power) + 1) * power;
    return colour;
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  convertBlockToRGB(block, returnTrans = false) {
    let bitmap = [];
    let transactionArray = [];
    block.transactions.map(transaction => {
      let pixelArray
      let transHash = transaction
      if( !(transaction instanceof String)) transHash = transaction.hash
      pixelArray = this.makePixelsFromHexString(transHash);
      bitmap = [...bitmap, ...pixelArray];
      transactionArray.push(pixelArray);
      return true
    });

    if (returnTrans) return transactionArray;
    return bitmap;
  }

  makeBlockImage(pixels) {
    const SCALE = 20;
    let dimentions = Math.round(Math.sqrt(pixels.length));
    let canvas = document.createElement("canvas");
    canvas.width = dimentions * SCALE;
    canvas.height = dimentions * SCALE;
    let ctx = canvas.getContext("2d");
    ctx.width = dimentions * SCALE;
    ctx.height = dimentions * SCALE;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, dimentions * SCALE, dimentions * SCALE);

    let x = 0;
    let y = 0;

    pixels.map((pixel, i) => {
      if (x === dimentions && y === dimentions) return;

      if (x > dimentions) {
        x = 0;
        y++;
      } else {
        x++;
      }

      ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b} )`;
      ctx.fillRect(x * SCALE, y * SCALE, 1 * SCALE, 1 * SCALE);
      return true
    });

    // let filteredData = Filters.filterCanvas( Filters.grayscale, ctx)
    // let filteredData = Filters.filterCanvas( Filters.threshold, ctx, 100)
    // ctx.putImageData(filteredData, 0, 0);
    return canvas.toDataURL();
  }

  loadTransactions(block) {
    let retVal = [];
    block.transactions.map(transaction => {
      Web3Service.web3.eth.getTransaction(transaction, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        retVal.push(data);
      });
    });
    return retVal;
  }

  loadTransaction(transaction, cb) {
    return Web3Service.web3.eth.getTransaction(transaction, cb);
  }

  isTransactionContractCreation( transaction ) {
    if(transaction instanceof String) return false
    return( transaction.to === '0x0' || transaction.to === null )
  }

  checkForcontractCreation(block) {
    block.transactions.forEach( (transaction) => {
      if( this.isTransactionContractCreation(transaction) ) transaction.contractCreation = true
    })
  }

  processBlock(data, loadTransactions = false) {
    this.blockNumber = data;

      return( Web3Service.web3.eth.getBlock(data, loadTransactions, (err, block) => {
      if (err) console.error(err);
      if (!block) return;
      this.checkForcontractCreation( block )
      // let pixels = this.convertBlockToRGB(block)
      // block.image = this.makeBlockImage( pixels )
      block.pixelArray = this.convertBlockToRGB(block, true);
      // block.loadTransaction = this.loadTransaction.bind(this)
      this.addBlock(block);
    }))
  }
}

export default EthereumService;

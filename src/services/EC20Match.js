class EC20Match {
  constructor(data, addERC20 ) {
    this._tokens = data;
    this.addERC20 = addERC20
  }

  searchBlock(block, addERC20) {
    let retval = [];

    retval = block.transactions.forEach(transaction => {
      this.tokens.forEach(token => {
        if (token.address === transaction.to) {
          transaction.toToken = token;
          transaction.ERC20 = true
          this.addERC20(token)
        }
        if (token.address === transaction.from) {
          transaction.fromToken = token;
          transaction.ERC20 = true
          this.addERC20(token)
        }
      });
    });
  }

  get tokens() {
    return this._tokens;
  }

  set tokens(data) {
    return (this._tokens = data);
  }
}

export default EC20Match;

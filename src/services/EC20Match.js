class EC20Match {
  constructor(data) {
    this._tokens = data;
  }

  searchBlock(block) {
    let retval = [];

    retval = block.transactions.forEach(transaction => {
      this.tokens.forEach(token => {
        if (token.address === transaction.to) {
          transaction.toToken = token;
          transaction.ERC20 = true
        }
        if (token.address === transaction.from) {
          transaction.fromToken = token;
          transaction.ERC20 = true
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

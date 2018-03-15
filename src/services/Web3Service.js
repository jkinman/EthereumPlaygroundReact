import Web3 from 'web3';

class Web3ServiceInstance {

    constructor() {
        this._type = 'Web3ServiceInstance'
        this._web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/mRUmnxLJW2t5fZP6WfDN"))
    }

     getBlockNumber( cb ) {
        this._web3.eth.getBlockNumber(cb)
    }

     connected() {
        return this._web3.eth
    }
  
    get web3() {
        return this._web3
      }
    
    set web3( val ) {
        this._web3 = val
    }
    
}
  
  export default new Web3ServiceInstance();
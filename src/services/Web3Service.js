import Web3 from 'web3';

export default class Web3Service {

    static getWeb3() {
        return this.web3
    }

    static getBlockNumber() {
        return this.web3.getBlockNumber()
    }
    static connected() {
        return this.web3.eth
    }
}


Web3Service.web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_PROVIDER));
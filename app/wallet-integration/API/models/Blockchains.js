
export const Blockchains = {
    EOSIO:'eos',
    // ETH:'eth',
    // TRX:'trx',
    // TELOS:'tlos'
};

export const BlockchainsArray =
    Object.keys(Blockchains).map(key => ({key, value:Blockchains[key]}));

export const blockchainName = x => {
    switch(x){
        case Blockchains.EOSIO: return 'EOSIO';
        // case Blockchains.ETH: return 'Ethereum';
        // case Blockchains.TRX: return 'Tron';
        // case Blockchains.TELOS: return 'TELOS';
    }
}
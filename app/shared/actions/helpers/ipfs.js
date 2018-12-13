const IPFS = require('ipfs-api');

export default function ipfs(host, port, protocol) {
  return new IPFS({ 
    host: host, 
    port: port, 
    protocol: protocol
  });
};

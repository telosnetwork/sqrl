const IPFS = require('ipfs-http-client');

export default function ipfs(host, port, protocol) {
  return new IPFS({ 
    host: host, 
    port: port, 
    protocol: protocol
  });
};

import Hasher from './Hasher';

export default class PermissionsAuthorizedApp {
  constructor(_origin, _appkey, _nextNonce = '', _createdAt = +new Date()){
      this.origin = _origin;
      this.appkey = _appkey;
      this.nextNonce = _nextNonce;
      this.createdAt = _createdAt;
  }

  static placeholder() {
    return new PermissionsAuthorizedApp();
  }

  static fromJson(json) {
    return Object.assign(this.placeholder(), json);
  }

  checkKey(hashed) {
    return hashed === this.hashed();
  }

  hashed() {
    return Hasher.insecureHash(this.appkey);
  }

  checkNonce(nonce) {
    return this.nextNonce === Hasher.insecureHash(nonce);
  }
}
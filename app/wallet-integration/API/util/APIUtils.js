import EosPlugin from '../plugins/default/eos';
import Permission from '../models/Permission';
import AuthorizedApp from '../models/AuthorizedApp';
import Identity from '../models/Identity';

export default class APIUtils{
    static findApp(authorizedApps, origin){
        return authorizedApps.find(x => x.origin === origin);
    }
    static findIdentity(identities, publicKey){
        return identities.find(x => x.publicKey === publicKey);
    }
    
    static getIdentity(identities, publicKey){
        return identities.find(id => id.publicKey === publicKey);
    }

    static getAccounts(allAccounts, toGet){
        return toGet.map(unique => allAccounts.find(x => this.uniqueAccount(x) === unique));
    }

    static uniqueAccount(acc){
        return acc.name + acc.authority + acc.publicKey;
    }
    
    static mapPermissions(permissions){
        let _permissions = (permissions || []).slice(0);
        return _permissions.map(p => Permission.fromJson(p));
    }
    static mapAuthorizedApps(apps){
        let _apps = (apps || []).slice(0);
        return _apps.map(a => AuthorizedApp.fromJson(a));
    }
    static mapIdentity(identity){
        if(identity){
            return Identity.fromJson(identity);
        }
        return null;
    }


    static plugin = new EosPlugin()
}
export class PermissionList {
  static getAccounts(permissions = [], accounts = []) {
    return permissions.map((permission) => {
      permission.accounts = accounts.filter((account) => permission.origin === account.origin);

      return permission;
    });
  }

  static getAccountsUnique(unique, accounts = []) {
    return accounts.filter((account) => PermissionList.getUnique(account));
  }

  static getAccountUnique(unique, accounts = []) {
    return accounts.find((account) => PermissionList.getUnique(account));
  }

  static getUnique({networkUnique = '', name = '', authority = '', keypairUnique = '' }) {
    return `${networkUnique}${name}${authority}${keypairUnique}`;
  }

  static permissionsPerOrigin(permissions = []) {
    const value = {};

    permissions.forEach((permission) => {
      const { origin } = permission;

      if (!value[origin])
        value[origin] = [];

      value[origin].push(permission);
    });
    
    return value;
  }

  static permissionsPerType(permissions = []) {
    const value = {
      identity: [],
      identityRequirements: [],
      contractAction: []
    };

    permissions.forEach((permission) => {
      if (permission.isIdentity)
        value.identity.push(permission);
      else if (permission.isIdentityRequirements)
        value.identityRequirements.push(permission);
      else if (permission.isContractAction)
        value.contractAction.push(permission);
    });

    return value;
  }
}
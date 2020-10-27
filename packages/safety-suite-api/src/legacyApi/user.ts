import {LegacyApi} from './types';

export type UserAccount = any;

export const getUserAccount: LegacyApi = {
  method: 'GET',
  route: '/api/userAccount'
};

export function saveUserAccount(user: UserAccount): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/userAccount',
    requestOptions: {body: user}
  };
}

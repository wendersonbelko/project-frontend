import {injectable} from 'inversify';
import {RequestAccess} from '../domain/requestAccess.entities';
import {AuthenticationLocalStorageGateway} from '../domain/authentication.gateway';

import {Keys} from './keys';

@injectable()
export class AuthenticationLSGateway implements AuthenticationLocalStorageGateway {
    async get(): Promise<RequestAccess> {
        const data = JSON.parse(window.sessionStorage.getItem(Keys.ACCESS) ?? '');
        return new RequestAccess(data || null);
    }
    async clearAll(): Promise<void> {
        window.sessionStorage.clear();
    }
    async remove(): Promise<void> {
        window.sessionStorage.remove(Keys.ACCESS);
    }
    async save(params: RequestAccess): Promise<void> {
        window.sessionStorage.setItem(Keys.ACCESS, JSON.stringify(params));
    }

    async getUserInfos(): Promise<any> {
        const st = window.sessionStorage.getItem(Keys.ACCESS) ?? '';
        const data = st ? JSON.parse(st) : '';
        return data
    }

    async saveUserInfos(params: any): Promise<void> {
        window.sessionStorage.setItem(Keys.ACCESS, JSON.stringify(params));
    }
}

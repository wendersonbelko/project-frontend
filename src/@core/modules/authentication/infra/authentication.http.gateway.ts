import {AxiosInstance} from 'axios';
import {setHeaderAuthorization} from '@core/modules/common/infra/http';
import {CustomException} from '@core/modules/common/infra/error';
import {
    RequestAccess,
    TypeRequestAccessParams,
} from '../domain/requestAccess.entities';
import {AuthenticationGateway} from '../domain/authentication.gateway';
import {Paths} from './keys';

export class AuthenticationHttpGateway implements AuthenticationGateway {
    constructor(private http: AxiosInstance) {}
    request(params: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async logout(): Promise<void> {
        await setHeaderAuthorization('...');
        sessionStorage.clear();
        localStorage.clear();
    }

    async requestAccess(params: TypeRequestAccessParams): Promise<RequestAccess> {
        return this.http
            .post(Paths.requestAccess, params)
            .then((res) => {
                if (!res?.data) {
                    throw new CustomException('Acesso negado, verifique suas credenciais.');
                }

                setHeaderAuthorization(res?.data?.access_token);
                return new RequestAccess(res?.data);
            })
            .catch(() => {
                throw new CustomException(`Acesso negado, verifique suas credenciais.`);
            });
    }

    async createRequestAccess(params: any): Promise<any> {
        return this.http
        .post(Paths.createNwAccess, params)
        .then(() => {return}).catch(() => {
            throw new CustomException('Erro ao criar conta.')
        })
    }
}

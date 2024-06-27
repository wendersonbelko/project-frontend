import {AxiosInstance} from 'axios';
import {CustomException} from '@core/modules/common/infra/error';
import {httpMessage} from '@core/modules/common/infra/message';

import {User, TGet, UserPagination, TAll, TCreateOrUpdate} from '../domain/user.entities';
import {UserGateway} from '../domain/user.gateway';
import {Paths} from './keys';
export class UserHttpGateway implements UserGateway {
    constructor(private http: AxiosInstance) {}

    async get(params: TGet): Promise<User> {
        return this.http
            .get(`${Paths.default}/${params.id}`)
            .then((res) => {
                if (!res?.data) {
                    throw new CustomException(httpMessage.getAllResponseEmpty('usuário'));
                }
                return new User(res.data);
            })
            .catch((error) => {
                if (error?.status !== 409) {
                    throw new CustomException(error?.response?.data);
                }
                throw new CustomException(httpMessage.getAllError('o usuário'));
            });
    }

    async getAll(params: TAll): Promise<UserPagination> {
        return this.http
            .get(Paths.default, {params: params})
            .then((res) => {
                if (!res?.data) {
                    throw new CustomException(httpMessage.getAllResponseEmpty('usuários'));
                }

                return new UserPagination(res.data);
            })
            .catch((error) => {
                if (error?.status !== 409) {
                    throw new CustomException(error?.response?.data);
                }
                throw new CustomException(httpMessage.getAllError('os usuários'));
            });
    }

    async create(params: TCreateOrUpdate): Promise<User> {
        return this.http
            .post(Paths.default, params)
            .then((res) => {
                if (!res?.data) {
                    throw new CustomException(httpMessage.addResponseEmpty('usuário'));
                }
                return new User(res?.data);
            })
            .catch((error) => {
                if (error?.response?.status === 302) {
                    throw new CustomException('E-mail já está cadastrado!');
                }

                throw new CustomException(httpMessage.addError('o usuário'));
            });
    }

    async update(params: TCreateOrUpdate): Promise<User> {
        return this.http
            .put(Paths.default, params)
            .then((res) => {
                if (!res?.data) {
                    throw new CustomException(httpMessage.updateResponseEmpty('usuário'));
                }
                return new User(res?.data);
            })
            .catch((error) => {
                if (error?.status !== 409) {
                    throw new CustomException(error?.response?.data);
                }
                throw new CustomException(httpMessage.updateError('o usuário'));
            });
    }
}

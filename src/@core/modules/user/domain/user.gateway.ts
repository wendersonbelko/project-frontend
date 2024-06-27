import {UserPagination, User, TAll, TGet, TCreateOrUpdate} from './user.entities';

export interface UserGateway {
    getAll(params: TAll): Promise<UserPagination>;
    get(params: TGet): Promise<User>;
    update(params: TCreateOrUpdate): Promise<User>;
    create(params: TCreateOrUpdate): Promise<User>;
}

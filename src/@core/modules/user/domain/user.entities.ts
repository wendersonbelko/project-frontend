import {TPagination} from '@core/modules/common/domain/common.entities';
import phone from '@core/modules/common/infra/phone';

export type TAll = {
    offset: number;
    limit: number;
    search?: string;
};

export type TGet = {
    id: string;
};

export type TCreateOrUpdate = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    personType: string;
    surgeonIds?: number[];
};

export type TSurgeon = {
    personId: number;
    id: number;
    name: string;
};

export type TDataItem = {
    id?: string;
    personId?: string;
    surgeonId?: number;
    person?: {
        accessId: number;
        personId: number;
        email: string;
        name: string;
        phone: string;
        type: string;
    };
    surgeons?: TSurgeon[];
    createdAt?: Date;
    updatedAt?: Date;
};

export class UserPagination {
    constructor(
        public props: {
            data: TDataItem[];
            pagination: TPagination;
        },
    ) {}

    get data() {
        return this.props.data?.map((item) => {
            return {
                ...item,
                person: {
                    ...item.person,
                    phone: phone.applyMaskPhone(item.person?.phone),
                },
            };
        });
    }
    get pagination() {
        return this.props.pagination;
    }

    toJSON() {
        return {
            data: this.data,
            pagination: this.pagination,
        };
    }
}

export class User {
    constructor(public props: TDataItem) {}

    get id() {
        return this.props.id;
    }
    get personId() {
        return this.props.personId;
    }
    get surgeonId() {
        return this.props.surgeonId;
    }
    get person() {
        return {
            ...this.props.person,
            phone: phone.applyMaskPhone(this.props.person?.phone),
        };
    }
    get surgeons() {
        return this.props.surgeons;
    }
    get createdAt() {
        return this.props?.createdAt;
    }
    get updatedAt() {
        return this.props?.updatedAt;
    }

    toJSON() {
        return {
            id: this.id,
            personId: this?.personId,
            surgeonId: this?.surgeonId,
            person: this?.person,
            surgeons: this?.surgeons,
            createdAt: this?.createdAt,
            updatedAt: this?.updatedAt,
        };
    }
}

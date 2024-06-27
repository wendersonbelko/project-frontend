interface User {
    id: string;
    email: string;
    name: string;
    cpf: string;
    phone: string;
    birthdate: string;
    isAdmin: boolean;
    photo: string | null;
    confirmedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

interface AuthData {
    token: string;
    user: User;
}

export type TypeRequestAccessParams = {
    email: string;
    password: string;

}

export class RequestAccess {
    constructor(private props: AuthData | null) {}

    get token() {
        return this.props?.token
    }

    get user() {
        return this.props?.user
    }

    toJSON() {
        return {
            token: this.token,
            user: this.user,
        }
    } 
}

export type TypeCreateRequestAccess = {
    email: string;
    password: string;
    cpf: string;
    name: string;
    birthdate: string;
    phone?: string;
}

export class createRequestAccess {
    constructor(public props: TypeCreateRequestAccess | null) {}

    get email() {
        return this.props?.email
    }

    get password() {
        return this.props?.password
    }

    get cpf() {
        return this.props?.cpf
    }

    get name() {
        return this.props?.name
    }

    get birthdate() {
        return this.props?.birthdate
    }

    get phone() {
        return this.props?.phone
    }

    toJSON() {
        return {
            email: this.email,
            password: this.password,
            cpf: this.cpf,
            name: this.name,
            birthdate: this.birthdate,
            phone: this.phone,
        }
    }
}
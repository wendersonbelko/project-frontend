import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { Rule } from "antd/es/form";

const cleanCpf = (cpf: string) => {
    return cpf.replace(/\D/g, '');
};

const dateOfBirth = (_rule: any, value: any, callback: any) => {
    if (value && value.isValid()) {
        const eighteenYearsAgo = value.clone().subtract(18, 'years');
        if (eighteenYearsAgo.isBefore()) {
            callback();
        } else {
            callback('Você deve ter pelo menos 18 anos para se cadastrar.');
        }
    } else {
        callback('Por favor, insira sua data de nascimento.');
    }
};

const fullName: Rule[] = [{
    required: true,
    message: 'Por favor, insira seu nome completo!'
}]

const cpf: Rule[] = [
    { required: true, message: 'Por favor, insira seu CPF!' },
    () => ({
        validator(_, value) {
            if (value && cpfValidator.isValid(cleanCpf(value))) {
                return Promise.resolve();
            }
            return Promise.reject('CPF inválido!');
        },
    }),
]

const phoneNumber: Rule[] = [{
    required: true,
    message: 'Por favor, insira seu número de telefone!'
}]

const email: Rule[] = [{
    required: true,
    message: 'Por favor, insira seu e-mail!'
}]

const password: Rule[] = [
    {
        required: true,
        message: 'Por favor, insira sua senha!'
    },
    {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.',
    },
]

const confirmPassword: Rule[] = [
    {
        required: true,
        message: 'Por favor, confirme sua senha!'
    },
    ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('As senhas não coincidem!');
        },
    }),
]

export const RegisterValidator = {
    fullName,
    cpf,
    phoneNumber,
    dateOfBirth,
    email,
    password,
    confirmPassword,
}

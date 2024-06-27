import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Typography } from 'antd';
import InputMask from 'react-input-mask';
import { RegisterValidator } from '@/@presentation/common/form/validator/';
import { auth } from '@/@core/modules/authentication/infra/container.registry';
interface IProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const Register: React.FC<IProps> = ({
    showModal,
    setShowModal,
}) => {
    const [form] = Form.useForm();

    const handleRegisterSubmit = () => {
        const values = form.getFieldsValue();

        auth.requestAccess.createRequestAccess({
            email: values.email,
            password: values.password,
            name: values.fullName,
            cpf: values.cpf.replace(/[^\d]+/g, ''),
            birthdate: values.dateOfBirth.format('YYYY-MM-DD'),
            phone: values.phoneNumber.replace(/[^\d]+/g, ''),
        }).then(() => {
            setShowModal(false);
        }).catch(() => {
            form.setFields([
                {
                    name: 'email',
                    errors: ['Email já cadastrado.']
                }
            ])
        });
    }

    return (
        <Modal
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={null}
        >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2>Já tem uma conta?</h2>
                <p>FAÇA O LOGIN, ESTAMOS ESPERANDO POR VOCÊ!</p>
            </div>
            <Form
                form={form}
                name="auth_form"
                initialValues={{ remember: true }}
                onFinish={handleRegisterSubmit}
            >

                <Form.Item
                    name="fullName"
                    rules={RegisterValidator.fullName}
                >
                    <Input prefix={<UserOutlined />} placeholder="Nome Completo" />
                </Form.Item>
                <Form.Item
                    name="cpf"
                    rules={RegisterValidator.cpf}
                >
                    <InputMask mask="999.999.999-99">
                        {() => <Input placeholder="CPF" />}
                    </InputMask>
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    rules={RegisterValidator.phoneNumber}
                >
                    <InputMask mask="(99) 99999-9999">
                        {() => <Input placeholder="Número de Telefone" />}
                    </InputMask>
                </Form.Item>
                <Form.Item
                    name="dateOfBirth"
                    rules={[{ validator: RegisterValidator.dateOfBirth }]}
                >
                    <DatePicker
                        placeholder="Data de Nascimento"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={RegisterValidator.email}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email / Usuário" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={RegisterValidator.password}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Senha" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={RegisterValidator.confirmPassword}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Confirme a Senha" />
                </Form.Item>

                <Typography.Text>
                    Registrando-se, você concorda com nossos <a href="/terms">Termos de Serviço</a> e <a href="/privacy">Política de Privacidade</a>.
                </Typography.Text>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '20px' }}>
                        Cadastrar
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="link" onClick={() => { }}>
                    Já tem uma conta? Faça login
                </Button>
            </div>
        </Modal>
    )
}

export default Register;

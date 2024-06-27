import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, Typography } from 'antd';
import { auth } from '@/@core/modules/authentication/infra/container.registry';
import { loggedStore } from '@/@presentation/stores/auth.store';

interface IProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const Login: React.FC<IProps> = ({
    showModal,
    setShowModal,
}) => {
    const [form] = Form.useForm();
    const { setInfo, setLogged } = loggedStore();

    const handleLoginSubmit = () => {
        const values = form.getFieldsValue();

        auth.requestAccess.execute({
            email: values.email,
            password: values.password,
        }).then((res) => {
            console.log(res.toJSON())
            setInfo(res);
            setLogged(true);
            setShowModal(false);
            // Lógica para redirecionar ou atualizar a página após o login
        }).catch(() => {
            form.setFields([
                {
                    name: 'email',
                    errors: ['Credenciais inválidas. Verifique seu email e senha.']
                }
            ]);
        });
    };

    return (
        <Modal
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={null}
        >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2>Entre na sua conta</h2>
                <p>FAÇA O LOGIN, ESTAMOS ESPERANDO POR VOCÊ!</p>
            </div>
            <Form
                form={form}
                name="login_form"
                initialValues={{ remember: true }}
                onFinish={handleLoginSubmit}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Por favor, insira seu email.' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email / Usuário" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor, insira sua senha.' }]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Senha" />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox disabled>Lembrar-me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Typography.Text>
                    Ao continuar, você concorda com nossos <a href="/terms">Termos de Serviço</a> e <a href="/privacy">Política de Privacidade</a>.
                </Typography.Text>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '20px' }}>
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="link" onClick={() => { }}>
                    Não tem uma conta? Registre-se
                </Button>
            </div>
        </Modal>
    );
};

export default Login;

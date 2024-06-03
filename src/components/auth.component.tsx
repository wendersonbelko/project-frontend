import React, { useContext, useState } from 'react';
import { Button, Modal, Form, Input, Checkbox, ConfigProvider, DatePicker, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login, register } from '../gateway/auth.gateway';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';
import { AuthContext } from '../contexts/auth.context'; // Importar o contexto

interface IProps {
  showLogin?: boolean;
}

const AuthComponent = ({ showLogin = true }: IProps) => {
  const { setAuthData } = useContext(AuthContext); // Usar o contexto
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();

  const [loginData, setLoginData] = useState({ 
    email: '', 
    password: '', 
    cpf: '', 
    phoneNumber: '', 
    fullName: '', 
    dateOfBirth: null 
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const cleanCpf = (cpf: string) => {
    return cpf.replace(/\D/g, '');
  };

  const cleanPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/\D/g, '');
  };

  const handleLoginSubmit = async () => {
    try {
      const result = await login(loginData.email, loginData.password);
      if (result.error) {
        toast.error(result.error);
      } else {
        setAuthData({ isLoggedIn: true, user: result.user, token: result.token });
        setLoginData({ 
          email: '', 
          password: '', 
          cpf: '', 
          phoneNumber: '', 
          fullName: '', 
          dateOfBirth: null 
        });
        form.resetFields();
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error('Erro ao processar login:', error);
      toast.error('Ocorreu um erro ao processar o login. Por favor, tente novamente mais tarde.');
    }
  };

  const handleRegisterSubmit = async () => {
    const cleanedCpf = cleanCpf(loginData.cpf);
    const cleanedPhoneNumber = cleanPhoneNumber(loginData.phoneNumber);

    try {
      const result = await register(loginData.email, loginData.password, cleanedCpf, cleanedPhoneNumber, loginData.fullName, loginData.dateOfBirth || new Date());
      if (result.error) {
        toast.error(result.error);
      } else {
        await setAuthData({ isLoggedIn: true, user: result.user, token: result.token });
        setLoginData({ 
          email: '', 
          password: '', 
          cpf: '', 
          phoneNumber: '', 
          fullName: '', 
          dateOfBirth: null 
        });
        form.resetFields();
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error('Erro ao processar o registro:', error);
      toast.error('Ocorreu um erro ao processar o registro. Por favor, tente novamente mais tarde.');
    }
  };

  const validateDateOfBirth = (rule, value, callback) => {
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

  return (
    <ConfigProvider>
      {showLogin && (
        <Button
          type="primary"
          size="large"
          onClick={showModal}
          style={{ width: '100%', margin: '10px' }}
        >
          Entrar
        </Button>
      )}
      <ToastContainer />
      {!showLogin && (
        <Button
          type="primary"
          onClick={showModal}
          size="large"
          style={{ width: '100%', margin: '10px', backgroundColor: '#40db90' }}
        >
          Cadastre-se
        </Button>
      )}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
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
          onFinish={isLogin ? handleLoginSubmit : handleRegisterSubmit}
        >
          {!isLogin && (
            <>
              <Form.Item
                name="fullName"
                rules={[{ required: true, message: 'Por favor, insira seu nome completo!' }]}
              >
                <Input prefix={<UserOutlined />} value={loginData.fullName} onChange={(e) => setLoginData({ ...loginData, fullName: e.target.value })} placeholder="Nome Completo" />
              </Form.Item>
              <Form.Item
                name="cpf"
                rules={[
                  { required: true, message: 'Por favor, insira seu CPF!' },
                  () => ({
                    validator(_, value) {
                      if (value && cpfValidator.isValid(cleanCpf(value))) {
                        return Promise.resolve();
                      }
                      return Promise.reject('CPF inválido!');
                    },
                  }),
                ]}
              >
                <InputMask mask="999.999.999-99" value={loginData.cpf} onChange={(e) => setLoginData({ ...loginData, cpf: e.target.value })}>
                  {(inputProps) => <Input {...inputProps} placeholder="CPF" />}
                </InputMask>
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[{ required: true, message: 'Por favor, insira seu número de telefone!' }]}
              >
                <InputMask mask="(99) 99999-9999" value={loginData.phoneNumber} onChange={(e) => setLoginData({ ...loginData, phoneNumber: e.target.value })}>
                  {(inputProps) => <Input {...inputProps} placeholder="Número de Telefone" />}
                </InputMask>
              </Form.Item>
              <Form.Item
                name="dateOfBirth"
                rules={[{ validator: validateDateOfBirth }]}
              >
                <DatePicker 
                  value={loginData.dateOfBirth}
                  onChange={(date) => setLoginData({ ...loginData, dateOfBirth: date })}
                  placeholder="Data de Nascimento" 
                />
              </Form.Item>
            </>
          )}
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
          >
            <Input prefix={<UserOutlined />} value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} placeholder="Email / Usuário" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Por favor, insira sua senha!' },
              ...(!isLogin ? [{
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.',
              }] : []),
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} placeholder="Senha" />
          </Form.Item>
          {!isLogin && (
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Por favor, confirme sua senha!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('As senhas não coincidem!');
                  },
                }),
              ]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Confirme a Senha" />
            </Form.Item>
          )}
          {isLogin ? (
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lembre-se de mim</Checkbox>
            </Form.Item>
          ) : (
            <Typography.Text>
              Registrando-se, você concorda com nossos <a href="/terms">Termos de Serviço</a> e <a href="/privacy">Política de Privacidade</a>.
            </Typography.Text>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '20px' }}>
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="link" onClick={toggleAuthMode}>
            {isLogin ? 'Não tem uma conta? Inscreva-se' : 'Já tem uma conta? Faça login'}
          </Button>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AuthComponent;

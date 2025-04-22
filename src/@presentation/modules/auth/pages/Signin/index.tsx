import React from 'react';
import { Layout, Row, Col, Typography, Form, Input, Button, Checkbox, message } from 'antd';
import { ArrowLeftOutlined, GoogleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '@/@core/modules/authentication/infra/container.registry';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const Signin: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  const handleAuthentication = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    try {
      const response = await auth.requestAccess.execute({
        email,
        password,
      });

      if (response.token) {
        navigate('/dashboard');
      } else {
        message.error('Usuário ou senha inválidos');
      }
    } catch (error) {
      message.error('E-mail ou senha inválidos');
    }
  };

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Content style={{ height: '100%', overflow: 'hidden', padding: 0 }}>
        <Row style={{ height: '100%', margin: 0 }}>
          <Col
            xs={24}
            md={12}
            style={{
              height: '100%',
              overflow: 'hidden',
              background: '#202123',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <div style={{ width: '100%', maxWidth: 360 }}>
              <Button
                type="text"
                icon={<ArrowLeftOutlined style={{ color: '#fff' }} />}
                onClick={() => navigate(-1)}
                style={{ marginBottom: 16, color: '#fff' }}
              >
                Voltar
              </Button>

              <Title level={2} style={{ color: '#fff', marginBottom: 8 }}>
                Bem-vindo de volta
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
                Faça login na sua conta Drixity para acessar recomendações inteligentes e controle colaborativo.
              </Paragraph>

              <Form
                layout="vertical"
                onFinish={handleAuthentication}
              >
                <Form.Item
                  name="email"
                  label={<span style={{ color: '#fff' }}>E-mail</span>}
                  rules={[{ required: true, message: 'Insira seu email!' }]}
                >
                  <Input placeholder="Digite seu email" size="large" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={<span style={{ color: '#fff' }}>Senha</span>}
                  rules={[{ required: true, message: 'Insira sua senha!' }]}
                >
                  <Input.Password placeholder="Digite sua senha" size="large" />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                  <Checkbox style={{ color: '#fff' }}>Lembrar-me</Checkbox>
                  <Button type="link" style={{ color: '#48bb78', padding: 0 }}>
                    Esqueceu a senha?
                  </Button>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    style={{ borderRadius: 6, fontWeight: 600 }}
                  >
                    Entrar
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    icon={<GoogleOutlined />}
                    size="large"
                    block
                    style={{ borderRadius: 6, marginTop: 16 }}
                    onClick={handleGoogleLogin}
                  >
                    Entrar com Google
                  </Button>
                </Form.Item>
              </Form>

              <Paragraph style={{ textAlign: 'center', marginTop: 16, color: '#fff' }}>
                Não tem conta?{' '}
                <Link to="/signup" style={{ color: '#48bb78', fontWeight: 600 }}>
                  Cadastre-se aqui
                </Link>
              </Paragraph>
            </div>
          </Col>

          <Col
            xs={0}
            md={12}
            style={{
              height: '100%',
              overflow: 'hidden',
              background: '#202123',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/public/hero.png"
              alt="Ilustração Drixity"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

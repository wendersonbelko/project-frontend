import React from 'react';
import { Layout, Row, Col, Typography, Form, Input, Button } from 'antd';
import { ArrowLeftOutlined, GoogleOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    window.location.href = '/auth/google';
  };

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Content style={{ height: '100%', padding: 0 }}>
        <Row style={{ height: '100%', margin: 0, display: 'flex' }}>
          {/* Left: Illustration */}
          <Col
            xs={0}
            md={10}
            style={{ position: 'relative', overflow: 'hidden', background: '#202123' }}
          >
            <img
              src="/public/hero.png"
              alt="Ilustração Drixity Signup"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Col>

          {/* Right: Signup Form */}
          <Col
            xs={24}
            md={14}
            style={{
              background: '#202123',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <div style={{ width: '100%', maxWidth: 440 }}>
              <Button
                type="text"
                icon={<ArrowLeftOutlined style={{ color: '#fff' }} />}
                onClick={() => navigate(-1)}
                style={{ marginBottom: 16, color: '#fff' }}
              >
                Voltar
              </Button>

              <Title level={2} style={{ color: '#fff', marginBottom: 12 }}>
                Crie sua conta
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 20 }}>
                Complete os campos abaixo para se registrar no Drixity.
              </Paragraph>

              <Form layout="vertical" onFinish={(values) => console.log('Signup with', values)}>
                <Form.Item
                  name="name"
                  label={<span style={{ color: '#fff' }}>Nome</span>}
                  rules={[{ required: true, message: 'Insira seu nome completo!' }]}
                >
                  <Input placeholder="Seu nome" size="large" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={<span style={{ color: '#fff' }}>Email</span>}
                  rules={[{ type: 'email', required: true, message: 'Insira um email válido!' }]}
                >
                  <Input placeholder="Seu email" size="large" />
                </Form.Item>

                <Row gutter={12}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="password"
                      label={<span style={{ color: '#fff' }}>Senha</span>}
                      rules={[{ required: true, message: 'Crie uma senha!' }]}
                    >
                      <Input.Password placeholder="Senha" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="confirm"
                      label={<span style={{ color: '#fff' }}>Confirmar Senha</span>}
                      dependencies={[ 'password' ]}
                      rules={[
                        { required: true, message: 'Confirme sua senha!' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('As senhas não coincidem!'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Repita a senha" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item style={{ marginTop: 8 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    style={{ borderRadius: 6, fontWeight: 600 }}
                  >
                    Registrar
                  </Button>
                </Form.Item>

                <Paragraph style={{ textAlign: 'center', color: '#fff', margin: '12px 0' }}>
                  ou
                </Paragraph>

                <Form.Item>
                  <Button
                    icon={<GoogleOutlined />}
                    size="large"
                    block
                    style={{ borderRadius: 6 }}
                    onClick={handleGoogleSignup}
                  >
                    Registrar com Google
                  </Button>
                </Form.Item>
              </Form>

              <Paragraph style={{ textAlign: 'center', marginTop: 12, color: '#fff' }}>
                Já tem conta?{' '}
                <Link to="/signin" style={{ color: '#48bb78', fontWeight: 600 }}>
                  Faça login aqui
                </Link>
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
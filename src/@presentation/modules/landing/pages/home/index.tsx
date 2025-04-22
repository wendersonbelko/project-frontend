import React from 'react';
import { Layout, Row, Col, Typography, Button, Card, Form, Input } from 'antd';
import { BulbOutlined, LineChartOutlined, WalletOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export const Home: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header
        style={{
          background: '#202123', // cor sólida do tema dark
          padding: '0 50px',
          position: 'fixed',
          width: '100%',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            float: 'left',
            fontSize: '1.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            color: '#ffffff',
          }}
          onClick={() => scrollTo('home')}
        >
          Drixify
        </div>
        <div style={{ float: 'right' }}>
          <Button type="link" style={{ color: '#ffffff' }} onClick={() => scrollTo('home')}>
            Home
          </Button>
          <Button type="link" style={{ color: '#ffffff' }} onClick={() => scrollTo('features')}>
            Funcionalidades
          </Button>
          <Button type="link" style={{ color: '#ffffff' }} onClick={() => scrollTo('plans')}>
            Preços
          </Button>
          <Button type="link" style={{ color: '#ffffff' }} onClick={() => scrollTo('contact')}>
            Contato
          </Button>
          <Button
            type="link"
            style={{ color: '#ffffff', marginLeft: 16 }}
            onClick={() => (window.location.href = '/signin')}
          >
            Login
          </Button>
        </div>
      </Header>

      <Content style={{ padding: '120px 50px 60px' }}>
        {/* Hero Section */}
        <section id="home">
          <Row align="middle" gutter={48} style={{ marginBottom: 100 }}>
            <Col xs={24} md={12}>
              <Title
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                }}
              >
                Drixify: sua IA Financeira Pessoal
              </Title>
              <Paragraph style={{ fontSize: '1.25rem', marginTop: 20 }}>
                Drixify analisa seu histórico, oferece recomendações e ajuda a alcançar metas.
                Crie carteiras compartilhadas — em família, com amigos ou projetos —
                registre gastos e visualize contribuições de cada membro.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                style={{
                  marginTop: 30,
                  height: 50,
                  padding: '0 30px',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
                onClick={() => scrollTo('plans')}
              >
                Experimente Agora
              </Button>
            </Col>
            <Col xs={24} md={12} style={{ textAlign: 'center' }}>
              <img
                src="/hero.png"
                alt="Ilustração Drixify"
                style={{
                  maxWidth: '80%',
                  height: 'auto',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  borderRadius: 12,
                }}
              />
            </Col>
          </Row>
        </section>

        {/* Features Section */}
        <section id="features" style={{ textAlign: 'center', marginBottom: 100 }}>
          <Title level={2} style={{ marginBottom: 40, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
            Funcionalidades Principais
          </Title>
          <Row gutter={[32, 32]} justify="center">
            {[
              { icon: <BulbOutlined />, title: 'Recomendações Inteligentes', desc: 'Sugestões de orçamento e economia personalizadas.' },
              { icon: <LineChartOutlined />, title: 'Acompanhamento de Metas', desc: 'Objetivos claros e monitoramento em tempo real.' },
              { icon: <WalletOutlined />, title: 'Compartilhamento de Carteiras', desc: 'Grupos financeiros para qualquer ocasião.' },
            ].map((item, idx) => (
              <Col key={idx} xs={24} sm={12} md={8}>
                <Card
                  style={{
                    borderRadius: 8,
                    padding: 24,
                    textAlign: 'center',
                    height: 300,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {React.cloneElement(item.icon, { style: { fontSize: 32, marginBottom: 16 } })}
                  <Title level={4} style={{ marginBottom: 12 }}>{item.title}</Title>
                  <Paragraph>{item.desc}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Plans Comparison Section */}
        <section id="plans" style={{ textAlign: 'center', marginBottom: 100 }}>
          <Title level={2} style={{ marginBottom: 40, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
            Compare Nossos Planos
          </Title>
          <Row gutter={[32, 32]} justify="center">
            {[
              { title: 'Grátis', price: 'R$0', subtitle: '1 carteira', features: ['Recomendações básicas', 'Metas limitadas', 'Suporte via email'] },
              { title: 'Básico', price: 'R$29/mês', subtitle: '5 carteiras', features: ['Rec. avançadas', 'Metas ilimitadas', 'Notificações em tempo real'] },
              { title: 'Premium', price: 'R$49/mês', subtitle: 'Carteiras ilimitadas', features: ['Tudo do Básico', 'Consultoria', 'Suporte prioritário'] },
            ].map((plan, idx) => (
              <Col key={idx} xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 8,
                    height: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
                  }}
                  bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <Title level={3}>{plan.title}</Title>
                  <Title level={2} style={{ margin: '8px 0', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                    {plan.price}
                  </Title>
                  <Paragraph type="secondary" style={{ marginBottom: 16 }}>{plan.subtitle}</Paragraph>
                  <ul style={{ textAlign: 'left', flex: 1, paddingLeft: 16, marginBottom: 24 }}>
                    {plan.features.map((f, i) => (<li key={i}>{f}</li>))}
                  </ul>
                  <Button type="primary" block style={{ marginTop: 'auto', fontWeight: 600 }}>Selecionar</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Final Call-to-Action */}
        <div style={{ textAlign: 'center', padding: '60px 0', marginBottom: 100 }}>
          <Title level={3} style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
            Transforme sua Gestão Financeira
          </Title>
          <Button type="primary" size="large" style={{ marginTop: 20, fontWeight: 600 }}>Comece Gratuitamente</Button>
        </div>

        {/* Contact Form */}
        <section id="contact" style={{ maxWidth: 600, margin: '0 auto', padding: '40px', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Fale Conosco</Title>
          <Form layout="vertical">
            <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Digite seu nome' }]}>  
              <Input placeholder="Seu nome" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true, message: 'Email inválido' }]}>  
              <Input placeholder="Seu email" />
            </Form.Item>
            <Form.Item label="Mensagem" name="message" rules={[{ required: true, message: 'Digite sua mensagem' }]}>  
              <Input.TextArea rows={4} placeholder="Como podemos ajudar?" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block size="large" style={{ fontWeight: 600 }}>Enviar Mensagem</Button>
            </Form.Item>
          </Form>
        </section>
      </Content>

      <Footer style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)' }}>
        ©2025 Drixify. Sua IA para saúde financeira e gestão colaborativa.
      </Footer>
    </Layout>
  );
};
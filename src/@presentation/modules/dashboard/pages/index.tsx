import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Avatar, List, Statistic, Typography } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, TeamOutlined, BarChartOutlined, UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

interface Transaction {
  key: string;
  description: string;
  amount: number;
  date: string;
  user: string;
  category: string;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#663399'];

interface DashboardProps {
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userName = "Usuario" }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [welcomeMsg, setWelcomeMsg] = useState<string>('');

  useEffect(() => {
    // Mock de dados
    const mockMembers: User[] = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
      { id: '3', name: 'Carol' },
    ];
    const mockTransactions: Transaction[] = [
      { key: 't1', description: 'Almoço', amount: 50, date: '2025-04-18', user: 'Alice', category: 'Alimentação' },
      { key: 't2', description: 'Uber', amount: 30, date: '2025-04-17', user: 'Bob', category: 'Transporte' },
      { key: 't3', description: 'Cinema', amount: 25, date: '2025-04-16', user: 'Carol', category: 'Lazer' },
      { key: 't4', description: 'Mercado', amount: 150, date: '2025-04-15', user: 'Alice', category: 'Alimentação' },
      { key: 't5', description: 'Ônibus', amount: 10, date: '2025-04-14', user: 'Bob', category: 'Transporte' },
    ];
    setMembers(mockMembers);
    setTransactions(mockTransactions);

    // mensagem de boas-vindas
    const messages = [
      `Olá, ${userName}!`,
      `Bem-vindo, ${userName}!`,
      `Que bom ver você, ${userName}!`,
      `E aí, ${userName}? Pronto para controlar suas finanças?`,
      `Olá de novo, ${userName}! Vamos lá!`,
    ];
    const idx = Math.floor(Math.random() * messages.length);
    setWelcomeMsg(messages[idx]);
  }, [userName]);

  // Métricas
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const count = transactions.length;
  const average = count > 0 ? total / count : 0;
  const memberCount = members.length;

  // Distribuição por usuário
  const expenseByUser = members.map((m, idx) => {
    const value = transactions.filter(tx => tx.user === m.name)
      .reduce((sum, tx) => sum + tx.amount, 0);
    return { name: m.name, value, fill: COLORS[idx % COLORS.length] };
  });

  // Distribuição por categoria
  const categoryMap: Record<string, number> = {};
  transactions.forEach(tx => {
    categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
  });
  const expenseByCategory = Object.entries(categoryMap).map(([name, value], idx) => ({ name, value, fill: COLORS[idx % COLORS.length] }));

  const columns: ColumnsType<Transaction> = [
    { title: 'Descrição', dataIndex: 'description', key: 'description' },
    { title: 'Valor', dataIndex: 'amount', key: 'amount', render: amount => `R$ ${amount.toFixed(2)}` },
    { title: 'Data', dataIndex: 'date', key: 'date' },
    { title: 'Usuário', dataIndex: 'user', key: 'user' },
    { title: 'Categoria', dataIndex: 'category', key: 'category' },
  ];

  return (
    <div style={{ padding: '16px', maxWidth: 1200, margin: '0 auto' }}>
      <Typography.Title level={4} style={{ marginBottom: 24, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {welcomeMsg}
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Gasto"
              value={total}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="R$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Transações"
              value={count}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Membros"
              value={memberCount}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Média/Transação"
              value={average}
              precision={2}
              prefix={<BarChartOutlined />}
              suffix="R$"
            />
          </Card>
        </Col>
      </Row>

      {/* Gráficos em primeira linha */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <Card title="Por Categoria">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={expenseByCategory} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ReTooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Distribuição por Membro">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={expenseByUser}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {expenseByUser.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ReTooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Transações recentes e membros em segunda linha */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={16}>
          <Card title="Transações Recentes">
            <Table columns={columns} dataSource={transactions} pagination={false} scroll={{ x: 'max-content' }} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Membros">
            <List
              itemLayout="horizontal"
              dataSource={members}
              renderItem={member => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      member.avatar ? <Avatar src={member.avatar} /> : <Avatar icon={<UserOutlined />} />
                    }
                    title={member.name}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
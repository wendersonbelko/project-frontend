import { List } from '@/@presentation/components/list';
import { Button } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

interface Transaction {
  key: string;
  date: string;
  description: string;
  amount: number;
  status: 'credit' | 'debit';
}

const transactionColumns: ColumnsType<Transaction> = [
  { title: 'Data', dataIndex: 'date', key: 'date' },
  { title: 'Descrição', dataIndex: 'description', key: 'description' },
  { title: 'Valor', dataIndex: 'amount', key: 'amount' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Tipo', dataIndex: 'type', key: 'type' },
  {
    title: 'Ações',
    key: 'actions',
    render: () => <Button type="link" style={{ color: '#48bb78' }}>Ver</Button>,
  },
];

const transactionData: Transaction[] = Array.from({ length: 20 }, (_, i) => ({
  key: String(i + 1),
  date: `2025-05-${(i % 30) + 1}`,
  description: `Transação ${i + 1}`,
  amount: parseFloat((Math.random() * 1000).toFixed(2)),
  status: i % 2 === 0 ? 'credit' : 'debit',
  type: i % 2 === 0 ? 'Entrada' : 'Saída',
}));

export const Moviments: React.FC = () => (
  <div style={{ padding: 24, background: '#202123' }}>
    <List<Transaction>
      title="Extrato de Transações"
      columns={transactionColumns}
      dataSource={transactionData}
      exportFileName="meu-extrato"
    />
  </div>
);

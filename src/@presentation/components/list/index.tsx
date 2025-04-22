import React, { useState } from 'react';
import { Table, Button, Select, Space, Typography, Card, List as AntList, Grid } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { PaginationConfig } from 'antd/es/pagination';

const { Option } = Select;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

type RecordType = { [key: string]: any };

interface ListProps<T> {
  title?: string;
  columns: ColumnsType<T>;
  dataSource: T[];
  rowKey?: string;
  /** Optional custom toolbar, overrides default filter/export area */
  toolbarRender?: React.ReactNode;
  /** Filename for Excel export */
  exportFileName?: string;
}

export function List<T extends RecordType>({
  title,
  columns,
  dataSource,
  rowKey = 'key',
  toolbarRender,
  exportFileName = 'export',
}: ListProps<T>) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '20'],
    total: dataSource.length,
  });
  const [filterValue, setFilterValue] = useState<string>('all');

  const handlePaginationChange = (pag: TablePaginationConfig) => setPagination(pag);

  // Optionally filter by a 'status' column if exists
  const filteredData = columns.some(col => 'dataIndex' in col && col.dataIndex === 'status')
    ? (dataSource as any[]).filter(item =>
        filterValue === 'all' || item.status === filterValue
      )
    : dataSource;

  // Default toolbar
  const defaultToolbar = (
    <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
      {columns.some(c => 'dataIndex' in c && c.dataIndex === 'status') && (
        <Select
          value={filterValue}
          onChange={setFilterValue}
          style={{ width: 120 }}
          dropdownStyle={{ background: '#343541', color: '#fff' }}
        >
          <Option value="all">Todos</Option>
          <Option value="credit">Créditos</Option>
          <Option value="debit">Débitos</Option>
        </Select>
      )}
      <Button icon={<DownloadOutlined />} onClick={() => exportToExcel(filteredData)}>
        Exportar
      </Button>
    </Space>
  );

  // Export function using xlsx
  const exportToExcel = (data: T[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${exportFileName}.xlsx`);
  };

  // Mobile: cards
  if (isMobile) {
    return (
      <Card style={{ borderRadius: 8, background: '#343541', border: 'none' }}>
        {title && <Title level={4} style={{ color: '#fff' }}>{title}</Title>}
        {toolbarRender ?? defaultToolbar}
        <AntList
          dataSource={filteredData as T[]}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: pagination.showSizeChanger,
            showQuickJumper: pagination.showQuickJumper,
            onChange: (page, pageSize) => {
              setPagination({ ...pagination, current: page, pageSize });
            },
          }}
          renderItem={item => (
            <Card
              size="small"
              style={{ marginBottom: 12, background: '#202123' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {columns.map(col => {
                  if ('dataIndex' in col) {
                    const key = col.key?.toString() ?? (col.dataIndex as string);
                    const label = col.title as React.ReactNode;
                    const value = col.render
                      ? col.render(
                          item[col.dataIndex as keyof T],
                          item,
                          0
                        )
                      : <Text style={{ color: '#fff' }}>{String(item[col.dataIndex as keyof T] ?? '')}</Text>;
                    return (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'rgba(255,255,255,0.65)' }}>{label}</Text>
                        {value as React.ReactNode}
                      </div>
                    );
                  }
                  return null;
                })}
                <Button type="link" style={{ color: '#48bb78', padding: 0 }}>
                  Ver Detalhes
                </Button>
              </Space>
            </Card>
          )}
        />
      </Card>
    );
  }

  // Desktop: table
  return (
    <Card style={{ borderRadius: 8, background: '#343541', border: 'none' }}>
      {title && <Title level={4} style={{ color: '#fff' }}>{title}</Title>}
      {toolbarRender ?? defaultToolbar}
      <Table<T>
        rowKey={rowKey}
        columns={columns}
        dataSource={filteredData as T[]}
        pagination={pagination}
        onChange={(paginationConfig) =>
          handlePaginationChange({
            current: paginationConfig.current,
            pageSize: paginationConfig.pageSize,
            total: paginationConfig.total,
          })
        }
        bordered={false}
        components={{
          body: {
            cell: ({ children, ...restProps }: { children: React.ReactNode; [key: string]: any }) => (
              <td
                {...restProps}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  padding: 12,
                  color: '#fff',
                }}
              >
                {children}
              </td>
            ),
          },
        }}
        style={{ background: 'transparent' }}
      />
    </Card>
  );
}
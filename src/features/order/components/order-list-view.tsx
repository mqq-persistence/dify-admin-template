// src/features/order/components/order-list-view.tsx
'use client';

import { Button } from '@/shared/ui/button';
import { Order } from '../types/order.types';
import * as Icons from 'lucide-react';
import { useState } from 'react';

interface OrderListViewProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
  isLoading?: boolean;
}

const STATUS_CONFIG = {
  pending: { label: '待处理', color: 'yellow' },
  processing: { label: '处理中', color: 'blue' },
  shipped: { label: '已发货', color: 'purple' },
  delivered: { label: '已交付', color: 'green' },
  cancelled: { label: '已取消', color: 'red' },
};

export function OrderListView({
  orders,
  onEdit,
  onDelete,
  isLoading = false,
}: OrderListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(
    (order) =>
      order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* 搜索栏 */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="搜索订单编码或产品名称..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <Button variant="outline" size="sm">
          <Icons.Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* 表格 */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">加载中...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">没有订单</div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">订单编码</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">产品名称</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">数量</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">状态</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const statusConfig =
                  STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
                const statusColors = {
                  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
                  green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                  red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                };

                return (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {order.orderCode}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {order.productName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {order.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[statusConfig.color as keyof typeof statusColors]
                        }`}
                      >
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(order)}
                      >
                        <Icons.Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(order)}
                      >
                        <Icons.Trash className="w-4 h-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

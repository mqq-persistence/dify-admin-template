// src/features/order/components/order-sidebar.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import * as Icons from 'lucide-react';
import { useOrderConversation } from '../hooks/useOrderConversation';
import { cn } from '@/shared/utils/cn';

interface OrderSidebarProps {
  onSelectConversation: (id: string) => void;
  currentConversationId?: string;
}

export function OrderSidebar({ onSelectConversation, currentConversationId }: OrderSidebarProps) {
  const { conversations, createConversation, deleteConversation } = useOrderConversation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleNewConversation = async () => {
    try {
      const conversation = await createConversation('新建对话');
      onSelectConversation(conversation.id);
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteConversation(id);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  };

  const menuItems = [
    {
      id: 'new-conversation',
      label: '新建对话',
      icon: Icons.Plus,
      action: handleNewConversation,
      highlight: true,
    },
    {
      id: 'edit-conversation',
      label: '编辑对话',
      icon: Icons.Edit2,
      action: () => {},
    },
    {
      id: 'history',
      label: '历史机器人',
      icon: Icons.History,
      action: () => {},
    },
    {
      id: 'order-list',
      label: '订单列表',
      icon: Icons.List,
      action: () => {},
    },
    {
      id: 'history-chat',
      label: '历史对话',
      icon: Icons.MessageSquare,
      action: () => {},
    },
  ];

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen flex flex-col overflow-hidden">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <Icons.Package className="w-5 h-5" />
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">订单智能助手</span>
        </div>

        <Button
          onClick={handleNewConversation}
          className="w-full bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-900 dark:hover:bg-gray-600 flex items-center gap-2"
        >
          <Icons.Plus className="w-4 h-4" />
          新建对话
        </Button>
      </div>

      {/* 菜单项 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  item.highlight
                    ? 'bg-gray-800 dark:bg-gray-700 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 对话列表 */}
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 py-2">对话记录</h3>
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
                  currentConversationId === conversation.id
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <button
                  onClick={() => onSelectConversation(conversation.id)}
                  className="flex-1 text-left text-sm text-gray-700 dark:text-gray-300 truncate"
                >
                  {conversation.title}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(conversation.id)}
                  className="text-gray-400 hover:text-red-500 ml-2"
                >
                  <Icons.X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部操作 */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start" title="返回">
          <Icons.ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start" title="帮小时">
          <Icons.HelpCircle className="w-4 h-4 mr-2" />
          帮小时(辅助)
        </Button>
      </div>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">确定删除这个对话吗？</p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm(null)}
              >
                取消
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(showDeleteConfirm)}
              >
                删除
              </Button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

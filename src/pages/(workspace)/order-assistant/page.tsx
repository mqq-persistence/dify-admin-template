// src/pages/(workspace)/order-assistant/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { OrderSidebar } from '@/features/order/components/order-sidebar';
import { OrderMessages } from '@/features/order/components/order-messages';
import { OrderChatInput } from '@/features/order/components/order-chat-input';
import { QuickCommands } from '@/features/order/components/quick-commands';
import { OrderListView } from '@/features/order/components/order-list-view';
import { useOrderConversation } from '@/features/order/hooks/useOrderConversation';
import { useOrder } from '@/features/order/hooks/useOrder';
import { useOrderStore } from '@/features/order/store/order.store';
import * as Icons from 'lucide-react';

export default function OrderAssistantPage() {
  const orderStore = useOrderStore();
  const { conversations, currentConversation, messages, sendMessage } =
    useOrderConversation();
  const { orders, loadOrders } = useOrder();
  const [isLoading, setIsLoading] = useState(false);
  const [showOrderList, setShowOrderList] = useState(false);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleSendMessage = async (message: string) => {
    if (!currentConversation) return;

    setIsLoading(true);
    try {
      await sendMessage(currentConversation.id, message);

      // 模拟 AI 响应
      setTimeout(() => {
        orderStore.addMessage({
          id: `msg-${Date.now()}`,
          conversationId: currentConversation.id,
          role: 'assistant',
          content: '订单已记录,正在处理...',
          timestamp: new Date().toISOString(),
        });
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
    }
  };

  const handleQuickCommand = async (command: string) => {
    if (!currentConversation) return;

    const commandMap = {
      'view-orders': '显示所有订单',
      'track-shipment': '追踪物流',
      'query-status': '查询订单状态',
      'bulk-import': '批量导入订单',
    };

    await handleSendMessage(commandMap[command as keyof typeof commandMap]);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 gap-4 p-4">
      {/* 侧边栏 */}
      <OrderSidebar
        onSelectConversation={(id) => orderStore.currentConversation = conversations.find(c => c.id === id) || null}
        currentConversationId={currentConversation?.id}
      />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
        {/* 顶部标题 */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Icons.Package className="w-6 h-6 text-blue-500" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">订单智能助手</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">启用您的订单需求，AI将自动帮您生成订单</p>
            </div>
          </div>
        </div>

        {/* 内容区 */}
        {showOrderList ? (
          <div className="flex-1 overflow-y-auto p-6">
            <OrderListView
              orders={orders}
              onEdit={(order) => console.log('Edit:', order)}
              onDelete={(order) => console.log('Delete:', order)}
              isLoading={isLoading}
            />
          </div>
        ) : currentConversation && messages.length > 0 ? (
          <>
            {/* 消息区 */}
            <OrderMessages messages={messages} isLoading={isLoading} />

            {/* 输入区 */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <OrderChatInput onSend={handleSendMessage} isLoading={isLoading} />
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-2">
              <Icons.Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">订单智能助手</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">启用您的订单需求，AI将自动帮您生成订单</p>
            </div>

            {/* 快速命令 */}
            <div className="w-full max-w-2xl">
              <QuickCommands onCommandSelect={handleQuickCommand} />
            </div>

            {/* 输入框 */}
            <div className="w-full max-w-2xl">
              <OrderChatInput onSend={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

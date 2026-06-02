// src/features/order/api/order.api.ts
import { apiClient } from '@/shared/utils/api-client';
import { Order, OrderConversation, OrderMessage } from '../types/order.types';

export const orderAPI = {
  // 订单 API
  async fetchOrders() {
    return apiClient.get<Order[]>('/orders');
  },

  async fetchOrder(id: string) {
    return apiClient.get<Order>(`/orders/${id}`);
  },

  async createOrder(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
    return apiClient.post<Order>('/orders', data);
  },

  async updateOrder(id: string, data: Partial<Order>) {
    return apiClient.put<Order>(`/orders/${id}`, data);
  },

  async deleteOrder(id: string) {
    return apiClient.delete(`/orders/${id}`);
  },

  async searchOrders(query: string) {
    return apiClient.get<Order[]>('/orders/search', { params: { q: query } });
  },

  // 对话 API
  async fetchConversations() {
    return apiClient.get<OrderConversation[]>('/order-conversations');
  },

  async fetchConversation(id: string) {
    return apiClient.get<OrderConversation>(`/order-conversations/${id}`);
  },

  async createConversation(title: string) {
    return apiClient.post<OrderConversation>('/order-conversations', { title });
  },

  async updateConversation(id: string, data: Partial<OrderConversation>) {
    return apiClient.put<OrderConversation>(`/order-conversations/${id}`, data);
  },

  async deleteConversation(id: string) {
    return apiClient.delete(`/order-conversations/${id}`);
  },

  // 消息 API
  async sendMessage(conversationId: string, content: string) {
    return apiClient.post<OrderMessage>(`/order-conversations/${conversationId}/messages`, {
      content,
    });
  },

  async fetchMessages(conversationId: string) {
    return apiClient.get<OrderMessage[]>(`/order-conversations/${conversationId}/messages`);
  },

  // 快速操作 API
  async queryOrderStatus(orderCode: string) {
    return apiClient.post('/order-conversations/quick-actions/query-status', { orderCode });
  },

  async trackShipment(orderCode: string) {
    return apiClient.post('/order-conversations/quick-actions/track-shipment', { orderCode });
  },

  async bulkImport(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/orders/bulk-import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

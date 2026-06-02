// src/features/order/store/order.store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Order, OrderConversation, OrderMessage } from '../types/order.types';

interface OrderState {
  // 订单数据
  orders: Order[];
  currentOrder: Order | null;
  isLoadingOrders: boolean;

  // 对话数据
  conversations: OrderConversation[];
  currentConversation: OrderConversation | null;
  messages: OrderMessage[];
  isLoadingMessages: boolean;

  // UI 状态
  sidebarOpen: boolean;
  selectedTab: 'conversation' | 'orderList' | 'history';
  error: string | null;

  // Actions - 订单
  fetchOrders: () => Promise<void>;
  selectOrder: (id: string) => void;
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Order>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;

  // Actions - 对话
  createConversation: (title: string) => Promise<OrderConversation>;
  selectConversation: (id: string) => Promise<void>;
  fetchConversations: () => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;

  // Actions - 消息
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  addMessage: (message: OrderMessage) => void;
  clearMessages: () => void;

  // Actions - UI
  toggleSidebar: () => void;
  setSelectedTab: (tab: 'conversation' | 'orderList' | 'history') => void;
  setError: (error: string | null) => void;
}

export const useOrderStore = create<OrderState>()(
  devtools((set, get) => ({
    // 初始状态
    orders: [],
    currentOrder: null,
    isLoadingOrders: false,

    conversations: [],
    currentConversation: null,
    messages: [],
    isLoadingMessages: false,

    sidebarOpen: true,
    selectedTab: 'conversation',
    error: null,

    // 订单操作
    fetchOrders: async () => {
      set({ isLoadingOrders: true, error: null });
      try {
        // TODO: 调用 API
        const response = await fetch('/api/orders');
        const data = await response.json();
        set({ orders: data });
      } catch (error) {
        set({ error: String(error) });
      } finally {
        set({ isLoadingOrders: false });
      }
    },

    selectOrder: (id) => {
      const order = get().orders.find((o) => o.id === id);
      set({ currentOrder: order || null });
    },

    createOrder: async (order) => {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        });
        const newOrder = await response.json();
        set((state) => ({
          orders: [...state.orders, newOrder],
        }));
        return newOrder;
      } catch (error) {
        set({ error: String(error) });
        throw error;
      }
    },

    updateOrder: async (id, order) => {
      try {
        await fetch(`/api/orders/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        });
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, ...order } : o)),
        }));
      } catch (error) {
        set({ error: String(error) });
        throw error;
      }
    },

    deleteOrder: async (id) => {
      try {
        await fetch(`/api/orders/${id}`, { method: 'DELETE' });
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== id),
        }));
      } catch (error) {
        set({ error: String(error) });
        throw error;
      }
    },

    // 对话操作
    createConversation: async (title) => {
      try {
        const response = await fetch('/api/order-conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
        });
        const conversation = await response.json();
        set((state) => ({
          conversations: [...state.conversations, conversation],
          currentConversation: conversation,
          messages: [],
        }));
        return conversation;
      } catch (error) {
        set({ error: String(error) });
        throw error;
      }
    },

    selectConversation: async (id) => {
      const conversation = get().conversations.find((c) => c.id === id);
      if (conversation) {
        set({
          currentConversation: conversation,
          messages: conversation.messages || [],
        });
      }
    },

    fetchConversations: async () => {
      set({ isLoadingMessages: true, error: null });
      try {
        const response = await fetch('/api/order-conversations');
        const data = await response.json();
        set({ conversations: data });
      } catch (error) {
        set({ error: String(error) });
      } finally {
        set({ isLoadingMessages: false });
      }
    },

    deleteConversation: async (id) => {
      try {
        await fetch(`/api/order-conversations/${id}`, { method: 'DELETE' });
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
          currentConversation:
            state.currentConversation?.id === id ? null : state.currentConversation,
        }));
      } catch (error) {
        set({ error: String(error) });
        throw error;
      }
    },

    // 消息操作
    sendMessage: async (conversationId, content) => {
      try {
        const response = await fetch(`/api/order-conversations/${conversationId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });
        const message = await response.json();
        set((state) => ({
          messages: [...state.messages, message],
        }));
      } catch (error) {
        set({ error: String(error) });
        throw error;
      }
    },

    addMessage: (message) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    },

    clearMessages: () => {
      set({ messages: [] });
    },

    // UI 操作
    toggleSidebar: () => {
      set((state) => ({ sidebarOpen: !state.sidebarOpen }));
    },

    setSelectedTab: (tab) => {
      set({ selectedTab: tab });
    },

    setError: (error) => {
      set({ error });
    },
  }), { name: 'order-store' })
);

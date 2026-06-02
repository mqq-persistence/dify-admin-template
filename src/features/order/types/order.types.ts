// src/features/order/types/order.types.ts

export interface Order {
  id: string;
  orderCode: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  remarks: string;
  inventory: number;
}

export interface OrderConversation {
  id: string;
  title: string;
  messages: OrderMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface QuickCommand {
  id: string;
  label: string;
  icon: string;
  action: string;
  description: string;
}

export interface OrderResponse {
  success: boolean;
  data?: Order | Order[];
  message?: string;
}

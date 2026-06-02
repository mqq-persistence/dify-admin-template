// src/features/order/hooks/useOrderConversation.ts
import { useCallback, useEffect } from 'react';
import { useOrderStore } from '../store/order.store';
import { orderAPI } from '../api/order.api';

export function useOrderConversation() {
  const store = useOrderStore();

  useEffect(() => {
    store.fetchConversations();
  }, [store]);

  const createConversation = useCallback(
    async (title: string) => {
      try {
        const conversation = await store.createConversation(title);
        return conversation;
      } catch (error) {
        store.setError(String(error));
        throw error;
      }
    },
    [store]
  );

  const selectConversation = useCallback(
    async (id: string) => {
      await store.selectConversation(id);
    },
    [store]
  );

  const sendMessage = useCallback(
    async (conversationId: string, content: string) => {
      try {
        await store.sendMessage(conversationId, content);
      } catch (error) {
        store.setError(String(error));
        throw error;
      }
    },
    [store]
  );

  const deleteConversation = useCallback(
    async (id: string) => {
      try {
        await store.deleteConversation(id);
      } catch (error) {
        store.setError(String(error));
        throw error;
      }
    },
    [store]
  );

  return {
    conversations: store.conversations,
    currentConversation: store.currentConversation,
    messages: store.messages,
    isLoading: store.isLoadingMessages,
    error: store.error,
    createConversation,
    selectConversation,
    sendMessage,
    deleteConversation,
    clearMessages: store.clearMessages,
  };
}

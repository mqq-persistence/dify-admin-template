// src/features/order/hooks/useOrder.ts
import { useCallback } from 'react';
import { useOrderStore } from '../store/order.store';
import { orderAPI } from '../api/order.api';
import { Order } from '../types/order.types';

export function useOrder() {
  const store = useOrderStore();

  const loadOrders = useCallback(async () => {
    try {
      const orders = await orderAPI.fetchOrders();
      store.orders = orders;
    } catch (error) {
      store.setError(String(error));
    }
  }, [store]);

  const createNewOrder = useCallback(
    async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const newOrder = await orderAPI.createOrder(orderData);
        return newOrder;
      } catch (error) {
        store.setError(String(error));
        throw error;
      }
    },
    [store]
  );

  const updateExistingOrder = useCallback(
    async (id: string, orderData: Partial<Order>) => {
      try {
        await orderAPI.updateOrder(id, orderData);
      } catch (error) {
        store.setError(String(error));
        throw error;
      }
    },
    [store]
  );

  return {
    orders: store.orders,
    currentOrder: store.currentOrder,
    isLoading: store.isLoadingOrders,
    error: store.error,
    loadOrders,
    createNewOrder,
    updateExistingOrder,
    selectOrder: store.selectOrder,
    deleteOrder: store.deleteOrder,
  };
}

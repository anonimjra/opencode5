import { create } from 'zustand';

export interface OrderModalTarget {
  ticker: string;
  name: string;
  price: number;
  exchange: string;
  unitsHeld: number;
  initialType: 'BUY' | 'SELL';
}

interface UiState {
  isChatOpen: boolean;
  isSidebarOpen: boolean;
  orderTarget: OrderModalTarget | null;
  detailTicker: string | null;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  openOrderModal: (target: OrderModalTarget) => void;
  closeOrderModal: () => void;
  openDetailModal: (ticker: string) => void;
  closeDetailModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isChatOpen: false,
  isSidebarOpen: false,
  orderTarget: null,
  detailTicker: null,
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openOrderModal: (target) => set({ orderTarget: target }),
  closeOrderModal: () => set({ orderTarget: null }),
  openDetailModal: (ticker) => set({ detailTicker: ticker }),
  closeDetailModal: () => set({ detailTicker: null }),
}));

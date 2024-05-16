import { create } from 'zustand';

interface State {
    count: number;
}

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state: State) => ({ count: state.count + 1 })),
  decrement: () => set((state: State) => ({ count: state.count - 1 })),
}));

export default useStore;

import { create } from "zustand"

interface PlayerStore {
    ids: string[]
    activeId?: string
    setId: (id: string) => void
    setIds: (ids: string[]) => void
    reset: () => void
}

const usePlayer = create<PlayerStore>((set) => ({
    // init state
    ids: [],
    aciveId: undefined,
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[]) => set({ ids }),
    reset: () => set({ ids: [], activeId: undefined })
}))

export default usePlayer
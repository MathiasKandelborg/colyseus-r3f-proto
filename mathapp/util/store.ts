import { Vector3 } from '@react-three/fiber'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Object3d {
    id: string
    position: Vector3
}

interface GlobalState {
    objects: Object3d[]
    addObject: (obj: Object3d) => void
}

const useStore = create<GlobalState>()(
    devtools(
        persist((set) => ({
            objects: undefined,
            addObject: (obj) =>
                set((state) => {
                    state.objects.push(obj)
                    return state
                })
        }))
    )
)

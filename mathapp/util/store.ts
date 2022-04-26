import createStore from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import create from 'zustand/vanilla'
import { obj } from './objectData'

const store = create<GlobalState>()(
    devtools(
        persist((set) => ({
            // Here comes the important part
            // Initialize state for the variables
            objects: [obj],
            orbitControlsEnabled: true,
            // Define handlers for the variables
            setOrbitControlsEnabled: (orbitControlsEnabled: boolean) =>
                set((state) => ({ ...state, orbitControlsEnabled })),

            setObjs: (state: GlobalState) =>
                set((s) => {
                    console.log('setting state wee')
                    s.objects = state

                    return s
                }),
            /* Object handling */
            addObject: (obj) =>
                set((state) => {
                    console.log(obj)
                    state.objects.push(obj)
                    return state
                }),
            setObjects: (objs) =>
                set((state) => {
                    console.log(objs)
                    state.objects = [...objs]
                    return state
                })
        }))
    )
)

type Object3d = {
    uuid: string
    position: any
    rotation: any
}
interface Objectss {
    [key: string]: Object3d
}

// This is our definition for the application state
interface GlobalState {
    objects: Object3d[]
    // Declare a boolean value
    orbitControlsEnabled: boolean
    // Declare a handler function to set the boolean value
    setOrbitControlsEnabled: (orbitControlsEnabled: boolean) => void
    addObject: (obj: Object3d) => void
    setObjects: (objs: Object3d[]) => void
    setObjs: (state: GlobalState) => void
}

const useStore = createStore<GlobalState>(store)

export { useStore, store }

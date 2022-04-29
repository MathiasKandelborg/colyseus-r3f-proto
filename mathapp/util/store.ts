import createStore from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import create from 'zustand/vanilla'
import { obj } from './objectData'

const store = create<GlobalState>()(
    devtools((set) => ({
        // Here comes the important part
        // Initialize state for the variables
        players: [],
        setPlayers: (payload: any) =>
            set((state) => {
                console.log('setting clients')
                /* It should be a map in state, instead of an array of objects.
                 * I figured out how to update the state properly,
                 * but let's see how it works out for now. Can possibly cause frame* rate issues
                 */

                // Only the first if statement should run, others are for testing
                if (payload instanceof Object) {
                    let newPlayerArr = []

                    newPlayerArr = Array.from(payload, ([id, player]) => ({
                        id,
                        rotation: player.rotation,
                        position: player.position
                    }))

                    state.players = [...newPlayerArr]
                } else if (!(payload instanceof Array)) {
                    console.log('payload is not an array')
                    let newClient = []
                    newClient = Array.from(payload, ([id, player]) => ({
                        rotation: player.rotation,
                        position: player.position,
                        id
                    }))
                    state.players = [...state.players, ...newClient]
                } else {
                    console.log(typeof payload)
                    state.players = payload
                    console.log(payload.clients[payload.clients.length - 1])
                }
            }),
        objects: [],
        orbitControlsEnabled: true,
        // Define handlers for the variables
        setOrbitControlsEnabled: (orbitControlsEnabled: boolean) =>
            set((state) => ({ ...state, orbitControlsEnabled })),

        setObjs: (payload: any) =>
            set((state) => {
                console.log('setting objects wee')

                let newObjArr = []

                newObjArr = Array.from(payload, ([id, object]) => ({
                    name: object.name,
                    id,
                    rotation: object.rotation,
                    position: object.position,
                    scale: object.scale
                }))
                console.log(newObjArr)

                state.objects = [...newObjArr]
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
    players: any
    objects: any
    // Declare a boolean value
    orbitControlsEnabled: boolean
    // Declare a handler function to set the boolean value
    setOrbitControlsEnabled: (orbitControlsEnabled: boolean) => void
    setPlayers: (clients: Map<string, any>) => void
    addObject: (obj: Object3d) => void
    setObjects: (objs: Object3d[]) => void
    setObjs: (state: GlobalState) => void
}

const useStore = createStore<GlobalState>(store)

export { useStore, store }

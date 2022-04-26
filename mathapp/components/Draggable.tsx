import { extend, GroupProps, useFrame, useThree } from '@react-three/fiber'
import React, {
    MutableRefObject,
    Ref,
    RefObject,
    useEffect,
    useRef,
    useState
} from 'react'
import { Group, Object3D } from 'three'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { useStore } from '../util/store'

extend({ DragControls })
function Draggable({ socketClient, children }) {
    const groupRef = useRef<Group>()
    const controlRef = useRef<HTMLCanvasElement>()
    const [draggableObjArr, setDraggableObjArr] = useState(null)
    const objects = useStore((state) => state.objects)
    const setObjects = useStore((state) => state.setObjects)
    const setOrbitControlsEnabled = useStore(
        (state) => state.setOrbitControlsEnabled
    )
    const { camera, gl, scene } = useThree()

    useEffect(() => {
        // @ts-ignore
        setDraggableObjArr(groupRef.current.children)
        //setObjects(groupRef.current.children)
    }, [groupRef])

    useFrame(() => {
        // node_modules\typescript\lib\lib.dom.d.ts

        controlRef.current.addEventListener('hoveron', (obj) => {
            console.log('wax on')

            // console.log(obj.object)
            setOrbitControlsEnabled(false) //  t
        })

        controlRef.current.addEventListener('hoveroff', (event) => {
            console.log('wax off')
            console.log(`Sphere position: ${obj.object.position}`)
            console.log(`Sphere rotation: ${obj.object.rotation}`)

            //setObjects(objects)

            //    setObjects({ ...objects, ...event.object })
            //  console.log(event)
            let rotArr = []
            let posArr = []
            // setObjects(event.object)

            if (socketClient) {
                socketClient.emit('update-object-position', {
                    objArr: draggableObjArr,
                    obj: event.object,

                    id: event.object.uuid,
                    position: event.object.position.toArray(posArr),
                    rotation: event.object.rotation.toArray(rotArr)
                })
            }
            //  scene.orbitControls.enabled = true

            setOrbitControlsEnabled(true)
        })
    }, [objects /* objects */])

    return (
        <group ref={groupRef}>
            {/* @ts-ignore */}
            <dragControls
                ref={controlRef}
                args={[draggableObjArr, camera, gl.domElement]}
            />
            {children}
        </group>
    )
}

export default Draggable

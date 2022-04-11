import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useTrimesh } from "@react-three/cannon"

const Model = ({ position }) => {
  const gltf = useLoader(GLTFLoader, "/models/tree.gltf")
  const [ref, api] = useTrimesh(() => ({ mass: 1, position }))
  console.log(gltf)
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      if (node.name !== "Sphere") {
        node.castShadow = true
        node.receiveShadow = true
        node.material.metalness = 0 // undo ths change if you apply an env map
        console.log("Spawned")
      }
    }
  })
  return (
    <>
      <primitive
        ref={ref}
        position={position || [0, 0, 5]}
        object={gltf.scene}
        scale={1}
      />
    </>
  )
}

export default Model

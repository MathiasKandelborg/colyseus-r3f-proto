import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useTrimesh } from "@react-three/cannon"
const Apple = ({ position }) => {
  const gltf = useLoader(GLTFLoader, "/models/apple.gltf")
const [ref, api] = useTrimesh(() => ({ mass: 1, position }))
  console.log(gltf)
  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true
      node.receiveShadow = true
      node.material.metalness = 0 // undo this change if you apply an env map
    }
  })
  return (
    <>
      <primitive
        position={position || [0, 0, 0]}
        object={gltf.scene}
        scale={3}
      />
    </>
  )
}

export default Apple

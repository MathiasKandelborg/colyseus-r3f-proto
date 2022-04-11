import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Model = ({ position }) => {
  const gltf = useLoader(GLTFLoader, "/models/plane.gltf")

  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true
      node.receiveShadow = true
      node.material.metalness = 0 // undo this change if you apply an env map
      console.log("Halluja")
      node.color = "black"
    }
  })

  return (
    <>
      <primitive
        position={position || [0, 0, 0]}
        object={gltf.scene}
        scale={1}
      />
    </>
  )
}

export default Model

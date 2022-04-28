/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function GltfLoader(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/MathClass.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        scale={2}
        geometry={nodes.MathRoom.geometry}
        material={materials["Material.012"]}
      />
    </group>
  );
}

useGLTF.preload("/models/MathClass.gltf");

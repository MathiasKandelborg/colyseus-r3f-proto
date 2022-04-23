import { Text } from '@react-three/drei'
import { MeshNormalMaterial, BoxBufferGeometry } from 'three'

const UserWrapper = ({ position, rotation, id }) => {
    return (
        <mesh
            position={position}
            rotation={rotation}
            geometry={new BoxBufferGeometry()}
            material={new MeshNormalMaterial()}
        >
            {/* Optionally show the ID above the user's mesh */}
            <Text
                position={[0, 1.0, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {id}
            </Text>
        </mesh>
    )
}

export { UserWrapper }

import PlayerModel from './playerModel'

const UserWrapper = ({ position, rotation, id }) => {
    return (
        <PlayerModel position={position} rotation={rotation}>
            {/*    <Text
                position={[0, 1.0, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {id}
            </Text> */}
        </PlayerModel>
    )
}

export { UserWrapper }

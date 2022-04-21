import { useXR, useXRFrame, useController } from '@react-three/xr'

function movement() {
    const { player, controllers } = useXR()
    const leftController = useController('left')

    useXRFrame((time, xrFrame) => {
        const leftaxes = leftController.inputSource.gamepad.axes
        const leftbuttons = leftController.inputSource.gamepad.buttons
        const lefttrigger = leftbuttons[6].value
        if (leftaxes[3] > 0.5) {
            player.position.z += leftaxes[3] / 3
        }
        if (leftaxes[3] < 0.5) {
            player.position.z += leftaxes[3] / 3
        }
        if (leftaxes[2] > 0.5) {
            player.position.x += leftaxes[2] / 3
        }
        if (leftaxes[2] < 0.5) {
            player.position.x += leftaxes[2] / 3
        }
        player.children[0]
    })
}

export { movement }

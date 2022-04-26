import { XRController } from '@react-three/xr'
import { Group } from 'three'

function movement(isNull: Boolean, player: Group, controllers: XRController[]) {
    if (isNull) {
        return
    }
    const leftController = controllers ? controllers[0] : undefined

    const leftaxes = leftController?.inputSource.gamepad.axes
    const leftbuttons = leftController?.inputSource.gamepad.buttons
    // const lefttrigger = leftbuttons[6].value
    if (leftaxes) {
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
    }
    // npx create-next-app
    //npx create-next-app websocket-example
    //  player.children[0]
}

export { movement }

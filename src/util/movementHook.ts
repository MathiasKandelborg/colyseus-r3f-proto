import { useXR, useXRFrame, useController } from '@react-three/xr'
import { Group} from 'three'

function movement(isNull: null, player: Group, controllers) {
    if (isNull) {
        return
    }//we are closing down so I think I am done for today
// No problem :) it might be in next.js then :D
Okay se you tmr then
//Yes Thomas and me are ony here and he said that he must go 
//tomorrow I will be late cause I have  a lot of meetings    
const leftController = controllers[0]

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

  //  player.children[0]
}

export { movement }

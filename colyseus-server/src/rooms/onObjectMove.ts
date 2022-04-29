import {Command} from "@colyseus/command";
import {MyRoom} from "./MyRoom";
import {Geometry, Position, Rotation, Scale} from "./schema/MyRoomState";

export class OnObjectMoveCommand extends Command<
  MyRoom,
  {
    id: string
    sessionId: string;
    name: string;
    position: [number, number, number];
    rotation: [number, number, number, string];
    scale: [number, number, number];
  }
> {
  execute({
    id,
    sessionId,
    name,
    scale,
    position,
    rotation,
  }: {
    id: string
    name: string;
    sessionId: string;
    scale: [number, number, number];
    position: [number, number, number];
    rotation: [number, number, number, string];
  }) {
    console.log(name)
    // If the player exists
    if (this.state.objects.get(id)) {
      const object = this.state.objects.get(id);

      object.assign({
        name,
        id,
        position: new Position({x: position[0], y: position[1], z: position[2]}),
        rotation: new Rotation({x: rotation[0], y: rotation[1], z: rotation[2], order: rotation[3]}),
        scale: new Scale({x: scale[0], y: scale[1], z: scale[2]})
      })
      

      this.state.objects.set(id, object);
      console.log(object)

    } else {
      // Otherwise
      this.state.objects.set(
        id,
        new Geometry({name, id, rotation, position, scale})
      );
    }
  }
}

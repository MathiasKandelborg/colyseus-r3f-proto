import {Command} from "@colyseus/command";
import {MyRoom} from "./MyRoom";
import {Player, Position, Rotation} from "./schema/MyRoomState";

export class OnMoveCommand extends Command<
  MyRoom,
  {
    sessionId: string;
    position: [number, number, number];
    rotation: [number, number, number, string];
  }
> {
  execute({
    sessionId,
    position,
    rotation,
  }: {
    sessionId: string;
    position: [number, number, number];
    rotation: [number, number, number, string];
  }) {
    console.log(position);
    // If the player exists
    if (this.state.players.get(sessionId)) {
      const player = this.state.players.get(sessionId);
      // console.log(player.position);
      player.assign({
        position: new Position({x: position[0], y: position[1], z: position[2]}),
        rotation: new Rotation({x: rotation[0], y: rotation[1], z: rotation[2], order: rotation[3]})
      })

      this.state.players.set(sessionId, player);
      //  player.assign({ position: position, rotation: rotation }) 

      //  player.position = new Position(position);
      //  player.rotation = new Rotation(rotation);

      // console.log(this.state.players.get(sessionId));
    } else {
      // Otherwise
      this.state.players.set(
        sessionId,
        new Player({id: sessionId, rotation, position})
      );
    }
  }
}

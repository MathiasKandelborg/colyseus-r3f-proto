import { Command } from "@colyseus/command";
import { MyRoom } from "./MyRoom";
import { Player, Position, Rotation } from "./schema/MyRoomState";

export class OnMoveCommand extends Command<
  MyRoom,
  {
    parentThis: any;
    sessionId: string;
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
  }
> {
  execute({
    parentThis,
    sessionId,
    position,
    rotation,
  }: {
    state: any;
    sessionId: string;
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
  }) {
    console.log(position);
    // If the player exists
    if (this.state.players.find((p) => p.id === sessionId)) {
      const player = this.state.players.find((p) => p.id === sessionId);
      // console.log(player.position);
      player.position = new Position(position);
      player.rotation = new Rotation(rotation);

      parentThis(this.state);
      // console.log(this.state.players.get(sessionId));
    } else {
      // Otherwise
      this.state.players.set(
        sessionId,
        new Player({ id: sessionId, rotation, position })
      );
    }
  }
}

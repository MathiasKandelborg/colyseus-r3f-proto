import { Command } from "@colyseus/command";
import { MyRoom } from "./MyRoom";
import { Player, Position, Rotation } from "./schema/MyRoomState";

export class OnJoinCommand extends Command<
  MyRoom,
  {
    sessionId: string;
  }
> {
  execute({ sessionId }) {
    const player = new Player({
      id: sessionId
    });

    player.position.assign({ x: 0.0, y: 0.0, z: 0.0 }),
    player.rotation.assign({ x: 0.0, y: 0.0, z: 0.0, order: "XYZ" }),
    

    this.state.players.set(sessionId, player);
  }
}

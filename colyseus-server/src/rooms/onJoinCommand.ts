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
      id: sessionId,
      position: { x: 0.0, y: 0.0, z: 0.0 },
      rotation: { x: 0.0, y: 0.0, z: 0.0, order: "XYZ" },
    });
    this.state.players.push(player);
  }
}

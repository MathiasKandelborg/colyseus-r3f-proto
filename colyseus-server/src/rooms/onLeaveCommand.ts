import { Command } from "@colyseus/command";
import { MyRoom } from "./MyRoom";
import { Player } from "./schema/MyRoomState";


export class OnLeaveCommand extends Command<
  MyRoom,
  {
    sessionId: string;
  }
> {
  execute({ sessionId }) {
    
    
    if(!this.state.players.delete(sessionId)){
        console.log("player not found");
    }
  }
}

import { Command } from "@colyseus/command";
import { MyRoom } from "./MyRoom";


export class OnLeaveCommand extends Command<
  MyRoom,
  {
    sessionId: string;
  }
> {
  execute({ sessionId }) {
    
    
    if(!this.state.players.delete(sessionId)){
        console.log("player not found");
    } else {
        console.log("player deleted");
    }
  }
}

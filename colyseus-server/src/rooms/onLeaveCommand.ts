import { Command } from "@colyseus/command";
import { MyRoom } from "./MyRoom";


export class OnLeaveCommand extends Command<
  MyRoom,
  {
    sessionId: string;
  }
> {
  execute({ sessionId }) {
    
    
    this.state.players.delete(sessionId);
  }
}

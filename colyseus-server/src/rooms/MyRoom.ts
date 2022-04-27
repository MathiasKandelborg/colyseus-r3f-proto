import { Room, Client } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import { IncomingMessage } from "http";

import { MyRoomState } from "./schema/MyRoomState";
import { OnJoinCommand } from "./onJoinCommand";
import { OnMoveCommand } from "./onMoveCommand";
import { OnLeaveCommand } from "./onLeaveCommand";

export class MyRoom extends Room<MyRoomState> {
  dispatcher = new Dispatcher(this);

  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage("move", (client, message) => {
      this.dispatcher.dispatch(new OnMoveCommand(), {
        sessionId: client.sessionId,
        position: message.position,
        rotation: message.rotation,
      });

      // this.setState(this.state);
      /*     console.log(
        `${client.sessionId} sent a move message:\n ${JSON.stringify(
          message,
          null,
          2
        )}`
      ); */
    });
  }

  onAuth(client: Client, options: any, request?: IncomingMessage) {
    console.log(`${client.sessionId} is authenticating`);

    return true;
  }

  onJoin(client: Client, options: any) {
    this.dispatcher.dispatch(new OnJoinCommand(), {
      sessionId: client.sessionId,
    });
    console.log(client.sessionId, "joined!");
  }

  onLeave(client: Client, consented: boolean) {
    this.dispatcher.dispatch(new OnLeaveCommand(), {
    sessionId: client.sessionId,
  });
  console.log(client.sessionId, "left!");
}

  onDispose() {
    console.log("room", this.roomId, "disposing...");
    this.dispatcher.stop();
  }
}

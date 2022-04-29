import { Room, Client } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import { IncomingMessage } from "http";

import { MyRoomState, Geometry, Position, Rotation, Scale } from "./schema/MyRoomState";
import { OnJoinCommand } from "./onJoinCommand";
import { OnMoveCommand } from "./onMoveCommand";
import { OnLeaveCommand } from "./onLeaveCommand";
import {OnObjectMoveCommand} from "./onObjectMove";

export class MyRoom extends Room<MyRoomState> {
  dispatcher = new Dispatcher(this);

  onCreate(options: any) {
    console.log(`room ${this.roomId} created!`);

    const initialObject = new Geometry({
      id: "25jk-jkh3-k115-fsf5",
      name: "test-object",
    });
    initialObject.position.assign({ x: 0, y: 0, z: 0 });
    initialObject.rotation.assign({ x: 0, y: 0, z: 0, order: 'XYZ' });
    initialObject.scale.assign({ x: 0.5, y: 0.5, z: 0.5 });

    this.setState(new MyRoomState());
    this.state.objects.set(initialObject.id, initialObject);

    this.onMessage("move", (client, message) => {
      this.dispatcher.dispatch(new OnMoveCommand(), {
        sessionId: client.sessionId,
        position: message.position,
        rotation: message.rotation,
      });

      this.onMessage("object-position-update", (client, object) => {
        this.dispatcher.dispatch(new OnObjectMoveCommand(), {
          id: object.id,
          sessionId: client.sessionId,
          name: object.name,
          position: object.position,
          rotation: object.rotation,
          scale: object.scale,
        });
      })

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
    console.log(`${client.sessionId} joined!`);
  }

  onLeave(client: Client, consented: boolean) {
    this.dispatcher.dispatch(new OnLeaveCommand(), {
    sessionId: client.sessionId,
  });
  console.log(`${client.sessionId} left!`);
}

  onDispose() {
    console.log(`room ${this.roomId} disposing...`);
    this.dispatcher.stop();
  }
}

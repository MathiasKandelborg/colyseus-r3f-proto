import {
  Schema,
  MapSchema,
  type,
} from "@colyseus/schema";

export class Position extends Schema {
  @type("float32") x: number;
  @type("float32") y: number;
  @type("float32") z: number;
}

export class Rotation extends Schema {
  @type("float32") x: number;
  @type("float32") y: number;
  @type("float32") z: number;
  @type("string") order: string;
}

export class Scale extends Schema {
  @type("float32") x: number;
  @type("float32") y: number;
  @type("float32") z: number;
}

export class Player extends Schema {
  @type("string") id: string;
  @type(Position) position: Position = new Position();
  @type(Rotation) rotation: Rotation = new Rotation();
}

export class Geometry extends Schema {
  @type("string") id: string;
  @type("string") name: string;
  @type(Position) position: Position = new Position();
  @type(Rotation) rotation: Rotation = new Rotation();
  @type(Scale) scale: Scale = new Scale();
}

export class MyRoomState extends Schema {
  @type({map: Player}) players = new MapSchema<Player>();
  @type({map: Geometry}) objects = new MapSchema<Geometry>();
  @type("string") mySynchronizedProperty: string = "Hello world";

  //  @type("array") myArray: string[] = ["a", "b", "c"];
}
// what doesn't?
//looks like it detects only ours, thats weird.
// Do you get any errors in console

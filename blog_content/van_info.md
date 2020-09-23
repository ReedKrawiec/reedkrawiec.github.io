Van Info
8/20/20

Van aims to be a game engine that simplifies and streamlines the creation of 2D games, targeting the HTML5 canvas. The engine conceptualizes the game environment as consisting of "rooms" that contain game logic alongside with "objects". Objects are used to represent any sort of ingame item, character or construct, such as a player  character, a door to another room, or pieces on a chess board. Through use of objects, their state, and the room's state, full-fledged, high-quality games can be created with ease and speed.

# Examples
![shooter](https://i.gyazo.com/438f938c63bf78a3354752887656520b.png)
[Link](http://reedkrawiec.github.io/subpages/van/shooter/)

![chess](https://i.gyazo.com/267e310895fb95103f967463f59b0028.png)
[Link](http://reedkrawiec.github.io/subpages/van/chess/)

The engine also contains other features that accelerate a game's rate of development. An easy to use Camera module allows for explict control, and a highly dynamic viewport. Van is able to target any resolution as needed, and can accomodate the stretching of the canvas through CSS, still providing accurate rendering and mouse control. Creating controls and binding game events to the mouse or keyboard is simple, the engine will manage an object's or room's associated binds, and each control bind is a simple function that has access to any room or object state needed.

The first central concept within Van is the idea of the "Room". A room is a compartmentalization of a game's environment and the game logic involving the environment.

``` js

interface room_state{
  test:boolean;
}

export class TestRoom extends obj<room_state>{
  background_url = "BACKGROUND_URL";
  objects = [...];
  constructor(){
    this.state = {
      test:true
    }
  }
  statef(time:number){
    ...
  }
  register_controls(){
    this.bindControl("Mouse1",()=>{
      ...
    })
    this.bindControl("KeyW",()=>{
      ...
    })
  }
}
```

This room's name is "TestRoom", and it's state is the interface room_state, passed into the generic obj. A room must define a background_url, which is a link to the background for the room. The property "objects" is an array containing the objects contained within the room. It is also possible to dynamically add objects into a room. Inside the constructor, the inital state for the room should be defined, alongside other code that's intended to be run on room load. Van internally runs a loop that calculates the game logic separately from the rendering. This loop runs and calls the statef function for the room 60 times a second. Within register_controls, the controls for the room should be defined using the bindControl function.
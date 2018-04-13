import React, { Component } from "react";
import * as BABYLON from "babylonjs";

import BabylonScene from "./BabylonSceneComponent";

export default class BabylonEthereum extends Component {
  constructor(props) {
    super(props);
    this.actions = props.actions;
    this.ethereum = props.ethereum;
    this.ethService = props.ethereumService;

    this.cameraTypeParam = props.cameraType;
    this.blocks = [];
  }


  onSceneMount(e) {
    const { canvas, scene, engine } = e;
    this.scene = scene;
    this.startPhysics(scene);
    scene.debugLayer.show();

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 50, -100),
      scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    
    // var camera = new BABYLON.FollowCamera(
    //   "FollowCam",
    //   new BABYLON.Vector3(0, 10, -10),
    //   scene
    // );
    // camera.radius = 50
    // camera.heightOffset = 10;
    // camera.rotationOffset = 0;
    // camera.cameraAcceleration = 0.005;
    // camera.maxCameraSpeed = 10;

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.7;
    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    new BABYLON.PhysicsImpostor(
      sphere,
      BABYLON.PhysicsImpostor.SphereImpostor,
      {
        mass: 10,
        restitution: 0.0
      },
      scene
    );

    //lock the follow cam
    // camera.lockedTarget = sphere;

    // Move the sphere upward 1/2 its height
    sphere.position.y = 40;
    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    ground.isVisible = true;

    // this.enviroment = scene.createDefaultEnvironment();

    new BABYLON.PhysicsImpostor(
      ground,
      BABYLON.PhysicsImpostor.PlaneImpostor,
      {
        mass: 0,
        restitution: 0.0
      },
      scene
    );

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });

    window.setInterval(this.makePysicsBox.bind(this), 3000);
  }

  makePysicsBox() {
    let box = BABYLON.MeshBuilder.CreateBox(
      "box",
      {
        height: 2,
        width: 3,
        depth: 2
      },
      this.scene
    );

    new BABYLON.PhysicsImpostor(
      box,
      BABYLON.PhysicsImpostor.BoxImpostor,
      {
        mass: 1,
        restitution: 0.02,
        ignoreParent: true
      },
      this.scene
    );
    // box.position.y = 10;
    box.position.y = Math.random();
    box.position.x = Math.random();
    box.position.z = Math.random();
    // let myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);

    // myMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    // myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    // myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

    // box.material = myMaterial;
  }

  newBlock(block) {
    let parent = new BABYLON.Mesh.CreateBox(
      `block${block.number}`,
      0,
      this.scene
    );
    this.blocks.push(parent);
    const BLOCKWIDTH = 10;
    parent.position.x = 0;
    parent.position.y = 0;
    parent.position.z = 0;
    parent.isVisible = false;
    parent.visible = false;
    block.transactions.map((transaction, i) => {
      let x = i % BLOCKWIDTH;
      let y = 0;
      let z = i / BLOCKWIDTH;
      let colour = new BABYLON.Color4(`#${transaction.hash.substring(2, 8)}`);
      this.makeTransaction(
        transaction,
        {
          x,
          y,
          z
        },
        colour,
        parent
      );
    });
    parent.position.x = this.blocks.length * 30;
  }

  makeTransaction(transaction, position, colour, parent) {
    let height = (transaction.value / 1000000000000000000).toFixed(4);
    // height = Math.min( 100, height)
    // height = Math.max( 1, height)
    let block = BABYLON.MeshBuilder.CreateBox(
      "myBox",
      {
        height: height,
        width: 2,
        depth: 2
      },
      this.scene
    );
    block.diffuseColor = colour;
    block.specularColor = colour;
    block.position = new BABYLON.Vector3(
      position.x * 3,
      height / 2,
      position.z * 3
    );
    block.parent = parent;

    let blockImposter = new BABYLON.PhysicsImpostor(
      block,
      BABYLON.PhysicsImpostor.BoxImpostor,
      {
        mass: 10,
        restitution: 0.9
      },
      this.scene
    );
  }

  startPhysics(scene) {
    let gravityVector = new BABYLON.Vector3(0, -9.8, 0);
    let physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    // scene.enablePhysics()
    // use osimo
    // scene.enablePhysics(
    //   new BABYLON.Vector3(0, -10, 0),
    //   new BABYLON.OimoJSPlugin()
    // );
  }

  render() {
    return (
      <div className="babylon-scene-loader">
        <BabylonScene onSceneMount={this.onSceneMount.bind(this)} />{" "}
      </div>
    );
  }
}

// loadEnvironment() {
//   // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
//   let ground = BABYLON.Mesh.CreateGround(
//     "ground1",
//     1000,
//     1000,
//     2,
//     scene,
//     false
//   );
//   let groundMAterial = new BABYLON.BackgroundMaterial("groundMAterial", scene);
//   ground.material = groundMAterial

//   // groundMAterial = true;
//   ground.physicsImpostor = new BABYLON.PhysicsImpostor(
//     ground,
//     BABYLON.PhysicsImpostor.BoxImpostor,
//     { mass: 0, restitution: 0.5 },
//     scene
//   );
// }

// turnOnGravity() {
//   scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
//   camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

//   // camera.applyGravity = true;
//   scene.collisionsEnabled = true;
//   camera.checkCollisions = true;
//   scene.workerCollisions = true;
// }

// configureFog() {
//   scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
//   scene.fogDensity = 0.01;
//   scene.fogStart = 10.0;
//   scene.fogEnd = 600.0;
//   scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
// }

//   createScene(engine, canvas) {
//     scene = new BABYLON.Scene(engine);
//     // scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
//     scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
//     const cameraStartPos = new BABYLON.Vector3(0, 50, -50);
//     const cameraTarget = new BABYLON.Vector3(0, 0, 0);
//     switch (this.cameraTypeParam) {
//       case "vr":
//         camera = new BABYLON.VRDeviceOrientationFreeCamera(
//           "Camera",
//           cameraStartPos,
//           scene
//         );
//         break;
//       case "universal":
//       default:
//         camera = new BABYLON.UniversalCamera(
//           "UniversalCamera",
//           cameraStartPos,
//           scene
//         );
//         break;
//     }
//     //  camera = new BABYLON.ArcRotateCamera("camera1", 0, 10, -30, BABYLON.Vector3.Zero(), scene);

//     // camera = new BABYLON.DeviceOrientationCamera(
//     //   "DevOr_camera",
//     //   new BABYLON.Vector3(0, 30, -60),
//     //   scene
//     // );
//     // Sets the sensitivity of the camera to movement and rotation
//     // camera.angularSensibility = 10;
//     // camera.moveSensibility = 10;
//     // let camera = new BABYLON.FreeCamera(
//     //   "camera1",
//     //   new BABYLON.Vector3(0, 20, -60),
//     //   scene
//     // );
//     // Target the camera to scene origin
//     // camera.setTarget(BABYLON.Vector3.Zero());
//     camera.setTarget(cameraTarget);
//     camera.attachControl(canvas, true);
//     // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
//     let light = new BABYLON.HemisphericLight(
//       "light1",
//       new BABYLON.Vector3(0, 1, 0),
//       scene
//     );

//     // Return the created scene
//     return scene;
//   }
// }

// export default BabylonEthereum;

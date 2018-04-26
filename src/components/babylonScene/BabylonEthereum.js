import React, {
  Component
} from "react";
import * as BABYLON from "babylonjs";

import fuelImage from "../../images/Etherparty-150x150.png";
// import ethImage from "../../images/eth-black.png";
import ethImage from "../../images/ethereum_black_logo_sticker.jpg";

import BabylonScene from "./BabylonSceneComponent";

const BLOCK_DISPLAY_WIDTH = 5
const Y_DISPLACEMENT = 30
const BLOCK_LIFE_SPAN = 45000

export default class BabylonEthereum extends Component {
  constructor(props) {
    super(props);
    this.actions = props.actions;
    this.ethereum = props.ethereum;
    this.ethService = props.ethereumService;

    this.cameraTypeParam = props.cameraType;
    this.blocks = [];
    this.firstBlockRendered = Number.MAX_SAFE_INTEGER
  }
  congfigFog(scene) {
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.01;
    scene.fogStart = 20.0;
    scene.fogEnd = 60.0;
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);

  }
  onSceneMount(e) {
    const {
      canvas,
      scene,
      engine
    } = e;
    this.scene = scene;
    this.startPhysics(scene);
    // this.congfigFog(scene)
    // scene.debugLayer.show();

    this.blockMeshes = []
    this.cameraFocus = BABYLON.MeshBuilder.CreateBox(
      'cameraFollow', {
        height: 1,
        width: 1,
        depth: 1
      },
      this.scene
    );
    this.cameraFocus.isVisible = false

    // This creates and positions a free camera (non-mesh)
    // this.camera = new BABYLON.FreeCamera(
    //   "camera1",
    //   new BABYLON.Vector3(0, 15, -35),
    //   scene
    // );
    // this.camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);
    this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    this.camera.setPosition(new BABYLON.Vector3(0, 15, -30));
    this.camera.useAutoRotationBehavior = true;
    this.camera.setTarget(BABYLON.Vector3.Zero());

    // this.camera = new BABYLON.FollowCamera(
    //   "FollowCam",
    //   new BABYLON.Vector3(0, 10, -10),
    //   scene
    // );
    // this.camera.radius = 25
    // this.camera.heightOffset = 25;
    // this.camera.rotationOffset = 0;
    // this.camera.cameraAcceleration = 0.005;
    // this.camera.maxCameraSpeed = 10;
    // this.camera.lockedTarget = this.cameraFocus

    // This attaches the camera to the canvas
    this.camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.7;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    ground.isVisible = false;

    // this.enviroment = scene.createDefaultEnvironment();

    new BABYLON.PhysicsImpostor(
      ground,
      BABYLON.PhysicsImpostor.PlaneImpostor, {
        mass: 0,
        restitution: 0,
        friction: 10,
      },
      scene
    );

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
    window.requestAnimationFrame(this.gameLoop.bind(this))
  }

  gameLoop() {
    window.requestAnimationFrame(this.gameLoop.bind(this))

    if (this.ethereum.blockArray.length && (this.lastBlockRendered !== this.ethereum.blockArray[this.ethereum.blockArray.length - 1].number)) {
      // grab the last block and render it
      this.renderBlock(this.ethereum.blockArray[this.ethereum.blockArray.length - 1])
      //record the block number of the block we just rendered
      this.lastBlockRendered = this.ethereum.blockArray[this.ethereum.blockArray.length - 1].number
    }
    // debugger

    this.blockMeshes.map((e, i, a) => {
      if (e && (Date.now() - e.createdAt) > BLOCK_LIFE_SPAN) {
        this.pruneBlockMesh(e, this.scene)
        delete a[i]
      }
    })
  }

  pruneBlockMesh(obj, scene) {
    obj.meshes.map((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
      mesh.dispose()
    })

  }
  componentWillReceiveProps(newProps) {
    this.firstBlockRendered = Math.min(this.ethereum.latestBlock.number, this.firstBlockRendered)
  }

  renderBlock(block) {
    // get the block number relative to the number of blocks were have rendered in the life of this session
    let relativeBlock = this.firstBlockRendered - (this.ethereum.latestBlock.number || 0) || 0
    let blockMeshObj = {
      createdAt: Date.now(),
      meshes: [],
      relBlockNumber: relativeBlock
    }
    //init the slot to store these meshes and timetamp for killing
    block.transactions.forEach((transaction, index) => {

      let pos = {}

      let xOffset = this.blockMeshes.length * (BLOCK_DISPLAY_WIDTH * 2)
      let x = (index % BLOCK_DISPLAY_WIDTH) //+ xOffset
      let z = Math.floor(index / BLOCK_DISPLAY_WIDTH) % BLOCK_DISPLAY_WIDTH
      let y = Math.floor(z / BLOCK_DISPLAY_WIDTH)

      let verticalStack = Math.floor(index / (BLOCK_DISPLAY_WIDTH * BLOCK_DISPLAY_WIDTH))
      y += verticalStack + Y_DISPLACEMENT

      blockMeshObj.meshes.push(this.makePhysicsBox(transaction, {
        x,
        y,
        z
      }))

    })
    //lock the follow cam
    // debugger
    this.cameraFocus.position.x = (this.blockMeshes.length + 2) * BLOCK_DISPLAY_WIDTH

    this.blockMeshes.push(blockMeshObj)
  }
  makePhysicsBox(transaction, pos) {
    let value = Math.max(1, (transaction.value / 1000000000000000000).toFixed(4))
    let tokenImage = ethImage
    if (transaction.fromToken) tokenImage = `https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${transaction.from}.png`
    if (transaction.toToken) tokenImage = `https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${transaction.to}.png`
    let box = BABYLON.MeshBuilder.CreateBox(
      transaction.hash, {
        height: 1,
        width: 1,
        depth: 1
      },
      this.scene
    );
    box.position.y = pos.y
    box.position.x = pos.x
    box.position.z = pos.z

    let myMaterial = new BABYLON.StandardMaterial(`material-${transaction.hash}`, this.scene);
    myMaterial.diffuseTexture = new BABYLON.Texture(tokenImage, this.scene);
    myMaterial.specularTexture = new BABYLON.Texture(tokenImage, this.scene);
    myMaterial.emissiveTexture = new BABYLON.Texture(tokenImage, this.scene);
    myMaterial.ambientTexture = new BABYLON.Texture(tokenImage, this.scene);
    box.material = myMaterial;
    if (!transaction.fromToken && !transaction.toToken) myMaterial.wireframe = true
    box.physicsImpostor = new BABYLON.PhysicsImpostor(
      box,
      BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: value,
        restitution: 0,
        // ignoreParent: true,
        friction: 10,
      },
      this.scene
    );


    return box
  }

  startPhysics(scene) {
    let gravityVector = new BABYLON.Vector3(0, -30, 0);
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
    return ( <
      div className = "babylon-scene-loader" >
      <
      BabylonScene onSceneMount = {
        this.onSceneMount.bind(this)
      }
      />{" "} <
      /div>
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
import * as CANNON from "cannon";
import * as BABYLON from "babylonjs";
// import * as BABYLON from '../../../node_modules/babylonjs/es6.js'
import "babylonjs-materials";

let scene;
let engine;
let camera;

class BabylonEthereum {
  constructor(props) {
    this.actions = props.actions;
    this.ethereum = props.ethereum;
    this.ethService = props.ethereumService;

    this.cameraTypeParam = props.cameraType;
  }

  mount(opts) {
    this.blocks = [];
    this.canvasId = opts.canvasId;
    // Get the canvas DOM element
    this.canvas = document.getElementById(this.canvasId);
    // Load the 3D engine
    engine = new BABYLON.Engine(this.canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true
    });

    // scene = this.createScene(engine, this.canvas);
    scene = new BABYLON.Scene(engine);
    engine.runRenderLoop(() => scene.render());
    
    scene.createDefaultCameraOrLight(true, true, true);
    scene.activeCamera.useAutoRotationBehavior = true;
    scene.activeCamera.beta -= 0.2;

    // this.turnOnGravity();
    // this.configureFog();
    this.startPhysics();
    // this.loadEnvironment();
    let helper = scene.createDefaultEnvironment( {
      sizeAuto: true,
      // groundSize: 250,
      groundColor: BABYLON.Color3.Black()
,    });
      // helper.setMainColor(BABYLON.Color3.Teal());

    // this.createSkyBox();
    // window.addEventListener("resize", engine.resize.bind(this));

    scene.debugLayer.show();
    // window.setInterval(this.makePysicsBox, 500)
    // for( let i = 0 ; i < 1000 ; i++ ) {
    //   this.makePysicsBox()
    // }
  }

  makePysicsBox() {
    let sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 10, diameterX: 10 },
      scene
    );
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
      sphere,
      BABYLON.PhysicsImpostor.SphereImpostor,
      { mass: 100, restitution: 0.09 },
      scene
    );
    sphere.position.y = 100;
    sphere.position.x = Math.random();
    sphere.position.z = Math.random();
    let myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

    myMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

    sphere.material = myMaterial;
  }

  newBlock(block) {

    let parent = new BABYLON.Mesh.CreateBox(`block${block.number}`, 0, scene);
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
      this.makeTransaction(transaction, { x, y, z }, colour, parent);
    });
    parent.position.x = this.blocks.length * 30;

  }

  makeTransaction(transaction, position, colour, parent) {
    let height = (transaction.value / 1000000000000000000).toFixed(4);
    // height = Math.min( 100, height)
    // height = Math.max( 1, height)
    let block = BABYLON.MeshBuilder.CreateBox(
      "myBox",
      { height: height, width: 2, depth: 2 },
      scene
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
      { mass: 10, restitution: 0.9 },
      scene
    );
  }

  loadEnvironment() {
    // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
    let ground = BABYLON.Mesh.CreateGround(
      "ground1",
      1000,
      1000,
      2,
      scene,
      false
    );
    let groundMAterial = new BABYLON.BackgroundMaterial("groundMAterial", scene);
    ground.material = groundMAterial

    // groundMAterial = true;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
      ground,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.5 },
      scene
    );
  }

  startPhysics() {
    // let gravityVector = new BABYLON.Vector3(0, -25, 0);
    // let physicsPlugin = new BABYLON.CannonJSPlugin();
    // scene.enablePhysics(gravityVector, physicsPlugin);

    // scene.enablePhysics()
    // use osimo
    scene.enablePhysics(new BABYLON.Vector3(0,-30, 0), new BABYLON.OimoJSPlugin());
  }

  turnOnGravity() {
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

    // camera.applyGravity = true;
    scene.collisionsEnabled = true;
    camera.checkCollisions = true;
    scene.workerCollisions = true;
  }

  configureFog() {
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.01;
    scene.fogStart = 10.0;
    scene.fogEnd = 600.0;
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
  }

  createSkyBox() {
    let envTexture = new BABYLON.CubeTexture(
      "/assets/textures/SpecularHDR.dds",
      scene
    );
    scene.createDefaultSkybox(envTexture, true, 1000);

    // let skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
    // let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;
    // skybox.infiniteDistance = true;
    // skyboxMaterial.disableLighting = true;
    // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
    //   "textures/skybox",
    //   scene
    // );
    // skyboxMaterial.reflectionTexture.coordinatesMode =
    //   BABYLON.Texture.SKYBOX_MODE;
  }

  createScene(engine, canvas) {
    scene = new BABYLON.Scene(engine);
    // scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    const cameraStartPos = new BABYLON.Vector3(0, 50, -50);
    const cameraTarget = new BABYLON.Vector3(0, 0, 0);
    switch (this.cameraTypeParam) {
      case "vr":
        camera = new BABYLON.VRDeviceOrientationFreeCamera(
          "Camera",
          cameraStartPos,
          scene
        );
        break;
      case "universal":
      default:
        camera = new BABYLON.UniversalCamera(
          "UniversalCamera",
          cameraStartPos,
          scene
        );
        break;
    }
    //  camera = new BABYLON.ArcRotateCamera("camera1", 0, 10, -30, BABYLON.Vector3.Zero(), scene);

    // camera = new BABYLON.DeviceOrientationCamera(
    //   "DevOr_camera",
    //   new BABYLON.Vector3(0, 30, -60),
    //   scene
    // );
    // Sets the sensitivity of the camera to movement and rotation
    // camera.angularSensibility = 10;
    // camera.moveSensibility = 10;
    // let camera = new BABYLON.FreeCamera(
    //   "camera1",
    //   new BABYLON.Vector3(0, 20, -60),
    //   scene
    // );
    // Target the camera to scene origin
    // camera.setTarget(BABYLON.Vector3.Zero());
    camera.setTarget(cameraTarget);
    camera.attachControl(canvas, true);
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    let light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    // Return the created scene
    return scene;
  }
}

export default BabylonEthereum;

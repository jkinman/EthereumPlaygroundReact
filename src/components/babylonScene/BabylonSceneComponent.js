import React from "react";
import * as BABYLON from "babylonjs";

let scene;
let engine;
let canvas;

export default class Scene extends React.Component {
  onResizeWindow = () => {
    if (engine) {
      engine.resize();
    }
  };

  componentDidMount() {
    engine = new BABYLON.Engine(
      canvas,
      true,
      this.props.engineOptions,
      this.props.adaptToDeviceRatio
    );

    let scene = new BABYLON.Scene(engine);
    scene = scene;

    if (typeof this.props.onSceneMount === "function") {
      this.props.onSceneMount({
        scene,
        engine: engine,
        canvas: canvas
      });
    } else {
      console.error("onSceneMount function not available");
    }

    // Resize the babylon engine when the window is resized
    window.addEventListener("resize", this.onResizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResizeWindow);
  }

  onCanvasLoaded(c) {
    if (c !== null) {
      canvas = c;
    }
  }

  render() {
    // 'rest' can contain additional properties that you can flow through to canvas:
    // (id, className, etc.)
    let { width, height, ...rest } = this.props;

    let opts = {};

    if (width !== undefined && height !== undefined) {
      opts.width = width;
      opts.height = height;
    }

    return <canvas {...opts} ref={this.onCanvasLoaded} />;
  }
}

import React, { Component } from "react";
import ParticleBurst from "../../utils/ParticleBurst";

import "aframe";
import "aframe-environment-component";
import "aframe-animation-component";
import "aframe-event-set-component";
// import "aframe-forcegraph-component";
import "aframe-sprite-label";
import "aframe-effects";
import "./AframeLowpoly";
import "./AframeForceGraph-component";

import { Entity, Scene } from "aframe-react";

const COLORS = ["#D92B6A", "#9564F2", "#FFCF59"];

class Blockchain extends Component {
  constructor(props) {
    super(props);

    // We'll use this state later on in the tutorial
    this.state = {
      colorIndex: 0,
      spherePosition: { x: 0.0, y: 4, z: -10.0 }
    };
  }

  shouldComponentUpdate(newProps, newState) {
    if (
      newProps.ethereum.latestBlock.number !==
      this.props.ethereum.latestBlock.number
    ) {
      return true;
    }
    return false;
  }
  _handleClick() {
    this.setState({
      colorIndex: (this.state.colorIndex + 1) % COLORS.length
    });
  }
  // none, default, contact, egypt, checkerboard, forest, goaland, yavapai, goldmine, threetowers, poison, arches, tron, japan, dream, volcano, starry, osiris
  render() {
    const nodes = this.props.ethereum.blockArray.map(e => ({
      id: e.number,
      hash: e.hash
    }));
    let links = [];
    this.props.ethereum.blockArray.forEach((e, i, a) => {
      if (a.length > i + 1) {
        links.push({ source: e.number, target: a[i + 1].number });
      }
    });

    return (
      <Scene
        stats
        effects="bloom, film, fxaa"
        fxaa
        bloom={{
          radius: 0.99
        }}
        film={{
          sIntensity: 0.15,
          nIntensity: 0.25
        }}
        // embedded
        environment={{
          preset: "starry",
          skyType: 'atmosphere',
          lighting: 'distant',
          flatShading: false,
          dressing: "none",
          seed: 1,
          lightPosition: { x: 200.0, y: 1.0, z: -50.0 },
          fog: 0,
          ground: "none",
          groundYScale: 2.0,
          groundTexture: "none",
          groundColor: "#755b5c",
          grid: "1x1"
        }}
      >
        <Entity
          primitive="a-light"
          type="directional"
          color="#FFF"
          intensity={1}
          position={{ x: 2.5, y: 0.0, z: 0.0 }}
          animation__oscillate={{
            property: "position",
            dur: 2000,
            dir: "alternate",
            easing: "linear",
            loop: true,
            from: { x: 2.5, y: 0.0, z: 0.0 },
            to: { x: 3.0, y: 1.25, z: 0.0 }
          }}
        />

        <Entity
          primitive="a-light"
          type="ambient"
          color="#FFF"
          intensity={0.3}
        />

        <Entity primitive="a-camera" 
        look-controls={{pointerLockEnabled:false}}
        position="0 15 100"
        far={20000}
        fov={80}
        zoom={0.9}
        >
          <Entity
            primitive="a-cursor"
            cursor={{ fuse: false }}
            material={{ color: "white", shader: "flat", opacity: 0.75 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
            event-set__1={{
              _event: "mouseenter",
              scale: { x: 1.4, y: 1.4, z: 1.4 }
            }}
            event-set__2={{
              _event: "mouseleave",
              scale: { x: 1, y: 1, z: 1 }
            }}
            raycaster={{
              objects: ".clickable"
            }}
          />
        </Entity>

        <Entity forcegraph={{ nodes: nodes, links: links }} class="clickable" />

        {/* {this.props.ethereum &&
          this.props.ethereum.blockArray.map((block, i) => {
            return (
              <Entity
                class="clickable"
                lowpoly={{
                color: "#3333dd",
                // color: COLORS[this.state.colorIndex],
                  nodes: true,
                  opacity: 0.15,
                  wireframe: true,
                  radius:1,
                position:{ x: 4 * i, y: 0, z: -8 }
                }}
                primitive="a-box"
                detail={2}
                events={{
                  click: console.log
                }}
                radius={1}
                position={{ x: 4 * i, y: 0, z: -8 }}
                color="#3333dd"
                animation__rotate={{
                  property: "rotation",
                  dur: 60000,
                  easing: "linear",
                  loop: true,
                  to: { x: 0, y: 360, z: 0 }
                }}
                // animation__oscillate={{
                //   property: "position",
                //   dur: 2000,
                //   dir: "alternate",
                //   easing: "linear",
                //   loop: true,
                //   from: { x: 2 * i, y: 0, z: -8 },
                //   to: {
                //     x: 2 * i,
                //     y: 0.25,
                //     z: -8
                //   }
                // }}
              />

            );
          })} */}
      </Scene>
    );
  }
}

export default Blockchain;

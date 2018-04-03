import * as $ from 'jquery'

let things = [];

class ParticleBurst {

	constructor( settings) {
		this.settings = settings
	}

  spawnRandom(event) {
    let i = Math.round(Math.random() * 15);
    for (; i > 0; i--) {
      spawnThing(event);
    }
  }

  spawnThing(event) {
    let thing = $(document.createElement("span"));
    let addedEl = $("#spawnedthings").append(thing);

    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    $(thing)
      .addClass("spawnedthing")
      .text("*");

    $(thing).css({
      transform: `translate(${event.pageX}px,${
        event.pageY
      }px) scale(${Math.random() * 3 - 1.5})`,
      color: `rgb(${r},${g},${b})`
    });

    let thingInstance = {
      el: thing,
      speedx: Math.random() * 6 - 3,
      speedy: Math.random() * 5 - 12,
      speedz: Math.random() * 0.2 - 0.1,
      scale: 1.5,
      x: event.pageX,
      y: event.pageY,
      spin: Math.random() * 10 - 5,
      rotation: 0
    };
    things.push(thingInstance);
  }

  tick() {
    let windowHeight = $(window).height();
    things.forEach((e, i, a) => {
      //apply acceleration
      e.speedy += 1;
      e.scale += e.speedz;
      e.y += e.speedy;
      e.x += e.speedx;
      e.rotation += e.spin;
      e.el.css({
        transform: `translate(${Math.round(e.x)}px,${Math.round(
          e.y
        )}px) scale(${e.scale}) rotate(${e.rotation}deg)`
      });

      // off screen
      if (
        windowHeight < e.el.offset().top ||
        windowHeight < e.y - e.el.height()
      ) {
        e.el.remove();
        a.splice(i, 1);
      }
    });

    window.requestAnimationFrame(this.tick.bind(this));
  }
}

export default ParticleBurst;

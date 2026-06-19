// src/physics/footerPhysics.ts

declare const Matter: any;
export function initFooterPhysics(container: HTMLElement) {
  const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Body } =
    Matter;

  const engine = Engine.create();
  engine.world.gravity.y = 1.2;

  const width = window.innerWidth;
  const height = 640;

  const render = Render.create({
    element: container,
    engine,
    options: {
      width,
      height,
      wireframes: false,

      background: "transparent",
    },
  });

  // SVG logo
  const svg = `
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 106.9230804 107.3076935" style="enable-background:new 0 0 106.9230804 107.3076935;" xml:space="preserve">
<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="17.175724" y1="18.3020115" x2="88.5935059" y2="89.7197952" gradientTransform="matrix(1 0 0 -1 0 106.3185959)">
	<stop  offset="0" style="stop-color:#E73793"/>
	<stop  offset="1" style="stop-color:#EC3F96"/>
</linearGradient>
<circle style="fill:url(#SVGID_1_);" cx="52.8846169" cy="52.3076935" r="50.5"/>
<path style="fill:#FFFFFF;" d="M93.4846115,59.3076935L67.884613,45.707695V16.1076927L12.5846148,45.5076942l27.1000023,14.6000023
	v27.6999969L93.4846115,59.3076935z M67.884613,56.207695l5.0999985,2.7000008l-5.0999985,2.7000008V56.207695z M76.58461,58.907692
	l-8.5999985-4.5999985v-6.7000008l22,11.7000008L41.3846169,85.1076965V60.907692l6.9000015,3.6999969v9.3000031L76.58461,58.907692
	z M49.9846153,71.1076965v-5.5999985l5.4000015,2.8000031L49.9846153,71.1076965z M16.1846161,45.5076942l23.6000023-12.5v6.2000008
	l-10.2000027,5.9000015l29.5000019,15.7000008V29.407692L48.2846184,35.207695l-6.4000015-3.4000034l24.3999977-13V62.407692
	l-9.1999969,4.9000015L16.1846161,45.5076942z M39.6846161,41.6076927v7.0999985l-6.7000008-3.5999985L39.6846161,41.6076927z
	 M57.3846169,40.1076927l-7.4000015-4l7.4000015-3.9000015V40.1076927z M57.3846169,50.6076927v7.5l-7.4000015-4v-7.5999985
	L57.3846169,50.6076927z M57.3846169,41.907692v6.7000008l-9.0999985-4.7999992l0.0999985,9.5l-7-3.7000008V33.407692
	L57.3846169,41.907692z"/>
</svg>

  `;

  const svgUrl = URL.createObjectURL(
    new Blob([svg], { type: "image/svg+xml" }),
  );

  // walls
  const ground = Bodies.rectangle(width / 2, height + 20, width, 40, {
    isStatic: true,
    render: {
      visible: false,
    },
  });

  const leftWall = Bodies.rectangle(0, height / 2, 40, height, {
    isStatic: true,
    render: {
      visible: false,
    },
  });

  const rightWall = Bodies.rectangle(width, height / 2, 40, height, {
    isStatic: true,
    render: {
      visible: false,
    },
  });

  function createBall(x: number, y: number) {
    return Bodies.circle(x, y, 54, {
      restitution: 0.85,
      friction: 0.1,
      render: {
        sprite: {
          texture: svgUrl,
          xScale: 0.8,
          yScale: 0.8,
        },
      },
    });
  }

  const balls = Array.from({ length: 18 }).map(() =>
    createBall(Math.random() * width, Math.random() * -300),
  );

  // mouse interaction
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false },
    },
  });
  mouse.element.removeEventListener("wheel", mouse.mousewheel);

  World.add(engine.world, [
    ground,
    leftWall,
    rightWall,
    ...balls,
    mouseConstraint,
  ]);

  // click impulse
  render.canvas.addEventListener("click", (e: any) => {
    const rect = render.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    balls.forEach((ball) => {
      const dx = ball.position.x - mx;
      const dy = ball.position.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        Body.applyForce(ball, ball.position, {
          x: dx * 0.0005,
          y: dy * 0.0005,
        });
      }
    });
  });

  Engine.run(engine);
  Render.run(render);

  // return cleanup (viktig!)
  return () => {
    Render.stop(render);
    World.clear(engine.world, false);
    Engine.clear(engine);
    render.canvas.remove();
    render.textures = {};
  };
}

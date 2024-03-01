const cv = document.querySelector("canvas");
const c = cv.getContext("2d");

cv.width = window.innerWidth;
cv.height = window.innerHeight;

let mouse = {
  x: undefined,
  y: undefined,
};

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.raduis = r;
  }

  draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.raduis, 0, 2 * Math.PI);
    c.fillStyle = "#ff8";
    c.fill();

    this.update();
  };

  update = () => {
    this.x = mouse.x;
    this.y = mouse.y;
  };
}

let ccc = new Circle(100, 100, 25);

class Shape {
  constructor(x, y, dx, dy, width, deadtime = 10000) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.minWidth = width;
    this.maxWidth = width * 3;

    this.og_deadtime = deadtime;
    this.deadtime = deadtime;

    this.initialX = x;
    this.initialY = y;
    this.xDir = 1;
    this.yDir = 1;

    let colors = ["rgba(255, 255, 255, 0.5)"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw = () => {
    c.beginPath();
    c.moveTo(this.x, this.y);

    //1
    c.lineTo(this.x - this.width / 2, this.y);
    //2
    c.lineTo(this.x, this.y - this.width / 2);
    //3
    c.lineTo(this.x + this.width / 2, this.y);
    //4
    c.lineTo(this.x, this.y + this.width / 2);
    //5
    c.lineTo(this.x - this.width / 2, this.y);
    //6
    c.closePath();
    c.fillStyle = this.color;
    c.fill();

    this.update();
  };

  update = () => {
    if (
      this.x + this.width / 2 >= window.innerWidth ||
      this.x - this.width / 2 <= 0
    ) {
      this.xDir *= -1;
    }
    if (
      this.y + this.width / 2 >= window.innerHeight ||
      this.y - this.width / 2 <= 0
    ) {
      this.yDir *= -1;
    }
    this.x += this.dx * this.xDir;
    this.y += this.dy * this.yDir;

    //Interactive:

    if (
      mouse.x - this.x < 180 &&
      mouse.x - this.x > -180 &&
      mouse.y - this.y < 180 &&
      mouse.y - this.y > -180
    ) {
      if (this.width < this.maxWidth) {
        this.width += 20;
      }
    } else if (this.width > this.minWidth) {
      this.width -= 20;
    }
  };
}

let shapes = [];
for (let i = 0; i <= 400; i++) {
  let width = Math.random() * 15 + 4;
  let x = Math.random() * window.innerWidth;
  let dx = (Math.random() - 0.5) * 10;
  let y = Math.random() * window.innerHeight;
  let dy = (Math.random() - 0.5) * 10;

  shapes.push(new Shape(x, y, dx, dy, width));
}

/*EVENTS*/

window.addEventListener("resize", () => {
  cv.width = window.innerWidth;
  cv.height = window.innerHeight;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function animation() {
  requestAnimationFrame(animation);

  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  shapes.forEach((shape) => {
    shape.draw();
  });

  ccc.draw();
}
animation();

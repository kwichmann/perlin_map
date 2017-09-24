const granularity = 5;
let seed = 42;
const noiseMesh = 1 / 100;
let mapmatrix;

function setup() {
  createCanvas(600, 400);
  make_map();
}

function draw() {
    draw_map();
}

function make_map() {
  noiseSeed(seed);
  mapmatrix = [];

  for (let y = 0; y < height; y += granularity) {
    let row = [];
    for (let x = 0; x < width; x += granularity) {
      row.push(noise(x * noiseMesh, y * noiseMesh));
    }
    mapmatrix.push(row);
  }
}

function draw_map() {
  noStroke();

  for (let i = 0; i < mapmatrix.length; i++) {
    for (let j = 0; j < mapmatrix[i].length; j++) {
      let terrain = mapmatrix[i][j];

      let c = map(terrain, 0, 0.3, 0, 100);
      fill(c, c, 255);

      if (terrain > 0.3) {
        fill(200, 200, 100);
      }
      if (terrain > 0.33) {
        fill(0, 255, 0);
      }
      if (terrain > 0.65) {
        c = map(terrain, 0.65, 1, 180, 255);
        fill(c);
      }
      rect(j * granularity, i * granularity, granularity, granularity);

    }
  }
}

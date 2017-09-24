const granularity = 5;
let e_seed = 42;
let v_seed = 113;
const noiseMesh = 1 / 100;
let elevation, vegetation;

function setup() {
  createCanvas(600, 400);
  make_map();
}

function draw() {
    draw_map();
}

function make_map() {
  noiseSeed(e_seed);
  elevation = [];

  for (let y = 0; y < height; y += granularity) {
    let row = [];
    for (let x = 0; x < width; x += granularity) {
      row.push(noise(x * noiseMesh, y * noiseMesh));
    }
    elevation.push(row);
  }

  noiseSeed(v_seed);
  vegetation = [];

  for (let y = 0; y < height; y += granularity) {
    let row = [];
    for (let x = 0; x < width; x += granularity) {
      row.push(noise(x * noiseMesh, y * noiseMesh));
    }
    vegetation.push(row);
  }
}

function draw_map() {
  noStroke();

  for (let i = 0; i < elevation.length; i++) {
    for (let j = 0; j < elevation[i].length; j++) {
      let terrain = elevation[i][j];
      let flora = vegetation[i][j]

      let c = map(terrain, 0, 0.3, 0, 100);
      fill(c, c, 255);

      if (terrain > 0.3) {
        fill(200, 200, 100);
      }
      if (terrain > 0.33) {
        fill(0, 255, 0);
        if (flora * terrain > 0.25) {
          fill(0, 180, 0);
        }
      }
      if (terrain > 0.65) {
        c = map(terrain, 0.65, 1, 180, 255);
        fill(c);
      }
      rect(j * granularity, i * granularity, granularity, granularity);

    }
  }
}

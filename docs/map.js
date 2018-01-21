const granularity = 1;
let e_seed = 42;
let v_seed = 113;
const noiseMesh = 1 / 100;

let col_map;

function setup() {
  createCanvas(600, 400);
  col_map = make_map(e_seed, v_seed, 0.25, 0.3, 0.33, 0.65, 0.25, 0.75);
}

function draw() {
    draw_map(col_map);
}

function make_map(elevation_seed, vegetation_seed, deep_sea, sea, swamp, grass, forest, mountains) {

  // Make elevation map
  noiseSeed(elevation_seed);
  let elevation = [];

  for (let y = 0; y < height; y += granularity) {
    let row = [];
    for (let x = 0; x < width; x += granularity) {
      row.push(noise(x * noiseMesh, y * noiseMesh));
    }
    elevation.push(row);
  }

  // Make vegetation map
  noiseSeed(vegetation_seed);
  vegetation = [];

  for (let y = 0; y < height; y += granularity) {
    let row = [];
    for (let x = 0; x < width; x += granularity) {
      row.push(noise(x * noiseMesh, y * noiseMesh));
    }
    vegetation.push(row);
  }

  // Turn into actual terrain map
  let terrain_map = [];

  for (let i = 0; i < elevation.length; i++) {
    let row = [];
    for (let j = 0; j < elevation[i].length; j++) {
      let terrain = elevation[i][j];
      let flora = terrain * vegetation[i][j]

      // Check for deep sea
      if (terrain <= deep_sea) {
        row.push(0);
      }

      // Check for sea
      if (terrain > deep_sea && terrain <= sea) {
        row.push(1);
      }

      // Check for swamp
      if (terrain > sea && terrain <= swamp) {
        row.push(2);
      }

      // Check for grasslands
      if (terrain > swamp && terrain <= grass) {
        // ... unless it's a forest
        if (flora > forest) {
          row.push(4);
        } else {
          row.push(3);
        }
      }

      // Check for mountains
      if (terrain > grass && terrain <= mountains) {
        row.push(5);
      }

      // Check for snow
      if (terrain > mountains) {
        row.push(6);
      }
    }
    terrain_map.push(row);
  }
  return terrain_map;
}

function draw_map(terrain_map) {
  noStroke();
  const map_colors = [
    color(0, 0, 255),       // Color of deep sea
    color(100, 100, 255),   // Color of sea
    color(200, 200, 100),   // Color of swamp
    color(0, 255, 0),       // Color of grasslands
    color(0, 180, 0),       // Color of forests
    color(180, 180, 180),   // Color or mountains
    color(255, 255, 255)    // Color of snow
  ];

  for (let i = 0; i < terrain_map.length; i++) {
    for (let j = 0; j < terrain_map[i].length; j++) {
      fill(map_colors[terrain_map[i][j]]);
      rect(j * granularity, i * granularity, granularity, granularity);
    }
  }
}

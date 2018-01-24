let capitals = [
  {
    name: "Imstadt",
    terrain: "grasslands"
  },
  {
    name: "Rockhome",
    terrain: "mountains"
  },
  {
    name: "Stittle Woad",
    terrain: "forest"
  },
  {
    name: "Shireton",
    terrain: "grasslands"
  },
  {
    name: "Nozelgard",
    terrain: "marsh"
  },
  {
    name: "Altai",
    terrain: "grasslands"
  },
  {
    name: "Cirith Ungol",
    terrain: "ice"
  }
];

const terrainCode = {
      marsh: 2,
      grasslands: 3,
      forest: 4,
      mountains: 5,
      ice: 6
};

// Needs to be in setup or draw
function capitalPosition() {
  return [round(random(20, 380)),
    round(random(20, 180))];
}

function checkCapitalPosition(pos, terrain) {
  const t = [col_map[pos[1], pos[2]], col_map[pos[1] + 1, pos[2]],
             col_map[pos[1], pos[2] + 1], col_map[pos[1] + 1, pos[2] + 1]];
  // No cities in the ocean
  if (t.includes(0) || t.includes(1)) {
    return false;
  }
  return t.includes(terrain);
}

capitals.forEach(function(capital) {
  let pos = capitalPosition();
  while (!checkCapitalPosition(pos, terrainCode[capital.terrain])) {
    pos = capitalPosition();
  }
  capital.pos = pos;
});

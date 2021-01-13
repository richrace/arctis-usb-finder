import KnownHeadphone from './models/known_headphone';

export default [
  new KnownHeadphone('Arctis 7 2019', 4152, 0x12ad, 2, [0x06, 0x18]),
  new KnownHeadphone('Arctis 7 2017', 4152, 0x1260, 2, [0x06, 0x18]),
  new KnownHeadphone('Arctis Pro', 4152, 0x1252, 2, [0x06, 0x18]),
  new KnownHeadphone('Arctis 1 Wireless', 4152, 0x12b3, 2, [0x06, 0x18]),
  new KnownHeadphone('Arctis 9', 4152, 0x12c2, 3, [0x06, 0x12]),
  new KnownHeadphone('Arctis 7X', 4152, 0x12d7, 3, [0x06, 0x12], 4, 5),
];

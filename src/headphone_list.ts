import KnownHeadphone from './models/known_headphone';

export default [
  new KnownHeadphone('Arctis 7 2019', KnownHeadphone.Arctis7_2019_ProductID, 2, [0x06, 0x18]),
  new KnownHeadphone('Arctis 7 2017', KnownHeadphone.Arctis7_2017_ProductID, 2, [0x06, 0x18]),
  new KnownHeadphone('Arctis 7 Plus 2022', KnownHeadphone.Arctis7_Plus_2022_ProductID, 2, [0x06, 0x12]),
  new KnownHeadphone('Arctis Pro', KnownHeadphone.ArctisProProductID, 2, [0x06, 0x18]),
  new KnownHeadphone('Arctis 1 Wireless', KnownHeadphone.Arctis1WProductID, 2, [0x06, 0x18]),
  new KnownHeadphone('Arctis 9', KnownHeadphone.Arctis9ProductID, 3, [0x06, 0x12]),
  new KnownHeadphone('Arctis 7X', KnownHeadphone.Arctis7XProductID, 3, [0x06, 0x12], 4, 5),
];

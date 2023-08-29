import KnownHeadphone from './models/known_headphone';

export default [
  new KnownHeadphone('Arctis Pro Wireless', KnownHeadphone.ArctisPro_Wirelress, 0, [0x40, 0xaa]),

  new KnownHeadphone('Arctis 7 2017', KnownHeadphone.Arctis7_2017_ProductID, 2, [0x06, 0x18]),
  new KnownHeadphone('Arctis 7 2019', KnownHeadphone.Arctis7_2019_ProductID, 2, [0x06, 0x18]),
  new KnownHeadphone('Arctis Pro 2019', KnownHeadphone.ArctisPro_2019_ProductID, 2, [0x06, 0x18]),
  new KnownHeadphone('Arctis Pro GameDac', KnownHeadphone.ArctisPro_GameDac_ProductID, 2, [0x06, 0x18]),

  new KnownHeadphone('Arctis 9', KnownHeadphone.Arctis9_ProductID, 3, [0x0, 0x20]),

  new KnownHeadphone('Arctis 1 Wireless', KnownHeadphone.Arctis1W_ProductID, 3, [0x06, 0x12]),
  new KnownHeadphone('Arctis 1 Xbox', KnownHeadphone.Arctis1X_ProductID, 3, [0x06, 0x12]),
  new KnownHeadphone('Arctis 7X', KnownHeadphone.Arctis7X_ProductID, 3, [0x06, 0x12], 4, 5),

  new KnownHeadphone('Arctis 7 Plus', KnownHeadphone.Arctis7_Plus_ProductID, 2, [0x00, 0xb0]),
  new KnownHeadphone('Arctis 7P Plus', KnownHeadphone.Arctis7P_Plus_ProductID, 2, [0x00, 0xb0]),
  new KnownHeadphone('Arctis 7X Plus', KnownHeadphone.Arctis7X_Plus_ProductID, 2, [0x00, 0xb0]),
  new KnownHeadphone('Arctis 7 Destiny Plus', KnownHeadphone.Arctis7_Plus_Destiny_ProductID, 2, [0x00, 0xb0]),

  new KnownHeadphone('Arctis Nova 7', KnownHeadphone.ArctisNova7_ProductID, 2, [0x00, 0xb0]),
  new KnownHeadphone('Arctis Nova 7X', KnownHeadphone.ArctisNova7X_ProductID, 2, [0x00, 0xb0]),
  new KnownHeadphone('Arctis Nova 7P', KnownHeadphone.ArctisNova7P_ProductID, 2, [0x00, 0xb0]),
];

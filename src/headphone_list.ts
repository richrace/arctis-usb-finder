import KnownHeadphone from './models/known_headphone';

const list: KnownHeadphone[] = [
  new KnownHeadphone('Arctis Pro Wireless', KnownHeadphone.ArctisPro_Wirelress_ProductID, [0x40, 0xaa], 0, 0, 0, 0),

  new KnownHeadphone('Arctis 7 2017', KnownHeadphone.Arctis7_2017_ProductID, [0x06, 0x18], 0, 0, 0x05, 2),
  new KnownHeadphone('Arctis 7 2019', KnownHeadphone.Arctis7_2019_ProductID, [0x06, 0x18], 0, 0, 0x05, 2),
  new KnownHeadphone('Arctis Pro 2019', KnownHeadphone.ArctisPro_2019_ProductID, [0x06, 0x18], 0, 0, 0x05, 2),
  new KnownHeadphone('Arctis Pro GameDac', KnownHeadphone.ArctisPro_GameDac_ProductID, [0x06, 0x18], 0, 0, 0x05, 2),

  new KnownHeadphone('Arctis 9', KnownHeadphone.Arctis9_ProductID, [0x0, 0x20], 0, 0, 0, 3, 4),

  new KnownHeadphone('Arctis 1 Wireless', KnownHeadphone.Arctis1W_ProductID, [0x06, 0x12], 0xff43, 0x202, 0x03, 3, 4),
  new KnownHeadphone('Arctis 1 Xbox', KnownHeadphone.Arctis1X_ProductID, [0x06, 0x12], 0xff43, 0x202, 0x03, 3, 4),
  new KnownHeadphone('Arctis 7X', KnownHeadphone.Arctis7X_ProductID, [0x06, 0x12], 0xff43, 0x202, 0x03, 3, 4, 5),
  new KnownHeadphone('Arctis 7P', KnownHeadphone.Arctis7P_ProductID, [0x06, 0x12], 0xff43, 0x0202, 3, 3, 4),

  new KnownHeadphone('Arctis 7 Plus', KnownHeadphone.Arctis7_Plus_ProductID, [0x00, 0xb0], 0xffc0, 0x1, 3, 2, 3),
  new KnownHeadphone('Arctis 7P Plus', KnownHeadphone.Arctis7P_Plus_ProductID, [0x00, 0xb0], 0xffc0, 0x1, 3, 2, 3),
  new KnownHeadphone('Arctis 7X Plus', KnownHeadphone.Arctis7X_Plus_ProductID, [0x00, 0xb0], 0xffc0, 0x1, 3, 2, 3),
  new KnownHeadphone(
    'Arctis 7 Destiny Plus',
    KnownHeadphone.Arctis7_Plus_Destiny_ProductID,
    [0x00, 0xb0],
    0xffc0,
    0x1,
    2,
    3
  ),

  new KnownHeadphone('Arctis Nova 7', KnownHeadphone.ArctisNova7_ProductID, [0x00, 0xb0], 0xffc0, 0x1, 3, 2, 3),
  new KnownHeadphone('Arctis Nova 7X', KnownHeadphone.ArctisNova7X_ProductID, [0x00, 0xb0], 0xffc0, 0x1, 3, 2, 3),
  new KnownHeadphone('Arctis Nova 7P', KnownHeadphone.ArctisNova7P_ProductID, [0x00, 0xb0], 0xffc0, 0x1, 3, 2, 3),
];

export default list;

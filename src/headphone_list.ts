import KnownHeadphone, { KnownHeadphoneFactory } from './models/known_headphone';

const writeBytes6and24 = {
  writeBytes: [0x06, 0x18],
  usagePage: 0,
  usage: 0,
  interfaceNum: 0x05,
  batteryPercentIdx: 2
};
const writeBytes6and18 = {
  writeBytes: [0x06, 0x12],
  usagePage: 0xff43,
  usage: 0x202,
  interfaceNum: 0x03,
  batteryPercentIdx: 3,
  chargingStatusIdx: 4
};
const writeBytes6and176 = {
  writeBytes: [0x00, 0xb0],
  usagePage: 0xffc0,
  usage: 0x1,
  interfaceNum: 3,
  batteryPercentIdx: 2,
  chargingStatusIdx: 3
};

const list: KnownHeadphone[] = [
  KnownHeadphoneFactory({
    name: 'Arctis Pro Wireless',
    productId: KnownHeadphone.ArctisPro_Wireless_ProductID,
    writeBytes: [0x40, 0xaa],
    usagePage: 0,
    usage: 0,
    interfaceNum: 0,
    batteryPercentIdx: 0
  }),
  KnownHeadphoneFactory({
    name: 'Arctis Nova Pro Wireless',
    productId: KnownHeadphone.Arctis_Nova_Pro_Wireless_ProductID,
    writeBytes: [0x06, 0xb0],
    usagePage: 0,
    usage: 0,
    interfaceNum: 4,
    batteryPercentIdx: 6,
    chargingStatusIdx: 15
  }),

  KnownHeadphoneFactory({
    name: 'Arctis 7 2017',
    productId: KnownHeadphone.Arctis7_2017_ProductID,
    ...writeBytes6and24
  }),
  KnownHeadphoneFactory({
    name: 'Arctis 7 2019',
    productId: KnownHeadphone.Arctis7_2019_ProductID,
    ...writeBytes6and24
  }),
  KnownHeadphoneFactory({
    name: 'Arctis Pro 2019',
    productId: KnownHeadphone.ArctisPro_2019_ProductID,
    ...writeBytes6and24
  }),
  KnownHeadphoneFactory({
    name: 'Arctis Pro GameDac',
    productId: KnownHeadphone.ArctisPro_GameDac_ProductID,
    ...writeBytes6and24
  }),

  KnownHeadphoneFactory({
    name: 'Arctis 9',
    productId: KnownHeadphone.Arctis9_ProductID,
    writeBytes: [0x0, 0x20],
    usagePage: 0,
    usage: 0,
    interfaceNum: 0,
    batteryPercentIdx: 3,
    chargingStatusIdx: 4
  }),

  KnownHeadphoneFactory({
    name: 'Arctis 1 Wireless',
    productId: KnownHeadphone.Arctis1W_ProductID,
    ...writeBytes6and18
  }),
  KnownHeadphoneFactory({
    name: 'Arctis 1 Xbox',
    productId: KnownHeadphone.Arctis1X_ProductID,
    ...writeBytes6and18
  }),
  KnownHeadphoneFactory({
    name: 'Arctis 7X',
    productId: KnownHeadphone.Arctis7X_ProductID,
    ...writeBytes6and18,
    micStatusIdx: 5
  }),
  KnownHeadphoneFactory({
    name: 'Arctis 7P',
    productId: KnownHeadphone.Arctis7P_ProductID,
    ...writeBytes6and18
  }),

  KnownHeadphoneFactory({
    name: 'Arctis 7 Plus',
    productId: KnownHeadphone.Arctis7_Plus_ProductID,
    ...writeBytes6and176
  }),
  KnownHeadphoneFactory({
    name: 'Arctis 7P Plus',
    productId: KnownHeadphone.Arctis7P_Plus_ProductID,
    ...writeBytes6and176
  }),
  KnownHeadphoneFactory({
    name: 'Arctis 7X Plus',
    productId: KnownHeadphone.Arctis7X_Plus_ProductID,
    ...writeBytes6and176
  }),
  KnownHeadphoneFactory({
    name: 'Arctis 7 Destiny Plus',
    productId: KnownHeadphone.Arctis7_Plus_Destiny_ProductID,
    ...writeBytes6and176
  }),

  KnownHeadphoneFactory({
    name: 'Arctis Nova 7',
    productId: KnownHeadphone.ArctisNova7_ProductID,
    ...writeBytes6and176
  }),
  KnownHeadphoneFactory({
    name: 'Arctis Nova 7X',
    productId: KnownHeadphone.ArctisNova7X_ProductID,
    ...writeBytes6and176
  }),
  KnownHeadphoneFactory({
    name: 'Arctis Nova 7P',
    productId: KnownHeadphone.ArctisNova7P_ProductID,
    ...writeBytes6and176
  }),
  KnownHeadphoneFactory({
    name: 'Arctis Nova 7X V2',
    productId: KnownHeadphone.ArctisNova7X_V2_ProductID,
    ...writeBytes6and176
  }),
  KnownHeadphoneFactory({
    name: 'Arctis Nova 7 Diablo IV',
    productId: KnownHeadphone.ArctisNova7_Diablo_IV_ProductID,
    ...writeBytes6and176
  })
];

export default list;

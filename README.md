# Arctis USB Finder

[![CI](https://github.com/richrace/arctis-usb-finder/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/richrace/arctis-usb-finder/actions/workflows/ci.yml)
[![Publish to NPM](https://github.com/richrace/arctis-usb-finder/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/richrace/arctis-usb-finder/actions/workflows/npm-publish.yml)
[![NPM Version](https://badge.fury.io/js/arctis-usb-finder.svg?style=flat)](https://npmjs.org/package/arctis-usb-finder)
[![Code Climate](https://codeclimate.com/github/richrace/arctis-usb-finder/badges/gpa.svg)](https://codeclimate.com/github/richrace/arctis-usb-finder)
[![codecov](https://codecov.io/gh/richrace/arctis-usb-finder/branch/main/graph/badge.svg?token=T3QMYY47AT)](https://codecov.io/gh/richrace/arctis-usb-finder)

Finds known Arctis headsets that are currently plugged in via the USB dongle.

## Usage

Install the package:
```
npm install arctis-usb-finder
```

Require the package:
```js
const { getHeadphones, refreshHeadphones } = require('arctis-usb-finder');
```

Use it:
```js
const headphones = getHeadphones();
```

Data structure:
```js
[
  {
    isMuted: false,
    isCharging: false,
    isDischarging: true,
    isConnected: true,
    modelName: 'Arctis 7X',
    batteryPercent: 58,
    path: 'IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS06@14100000/USB2.0 Hub             @14100000/AppleUSB20Hub@14100000/AppleUSB20HubPort@14120000/SteelSeries Arctis 7X@14120000/SteelSeries Arctis 7X@3/AppleUserUSBHostHIDDevice'
  }
]
```

And using the data structure we get back, as long as we have the path, we can refresh the devices we have connected

```js
const headphones = refreshHeadphones(
  [
    {
      // Not required
      isMuted: true, // Changed
      isCharging: false,
      isDischarging: true,
      isConnected: true,
      modelName: 'Arctis 7X',
      batteryPercent: 50, // Changed
      // Required
      path: 'IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS06@14100000/USB2.0 Hub             @14100000/AppleUSB20Hub@14100000/AppleUSB20HubPort@14120000/SteelSeries Arctis 7X@14120000/SteelSeries Arctis 7X@3/AppleUserUSBHostHIDDevice'
    }
  ]
)
```

### Note

* If the `isMuted`, `isCharging`, `isDischarging` or `isConnected` flags not supported they would return `undefined`. They are defined per Model you can see which headphones are supported [here](src/headphone_list.ts). The `path` is the `HID` path.
* `refreshHeadphones` requires a `path` value, it will not pick up additional headphones or headphones moved to another port.

## Development

Use `npm install` to install all the dependencies and `npm test` to run the tests.

### Probe

This package will give you access to the executable `arctis-usb-finder-probe`. This will search for known USB dongles and will report the technical details so it can be added via an Issue.

E.g.

```
Product: SteelSeries Arctis 7X
Product ID: 4823
Bytes: [ 6, 18 ]
Report: [
  6, 18, 1, 0, 0, 1, 34, 142, 1,
  0,  0, 0, 0, 0, 0,  0,   0, 0,
  0,  0, 0, 0, 0, 0,  0,   0, 0,
  0,  0, 0, 0
]
path: 'IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS06@14100000/USB2.0 Hub             @14100000/AppleUSB20Hub@14100000/AppleUSB20HubPort@14120000/SteelSeries Arctis 7X@14120000/SteelSeries Arctis 7X@3/AppleUserUSBHostHIDDevice'
```

You may get something like this:

```
Product: SteelSeries Arctis 7X
Product ID: 4823
Bytes: undefined
Report: undefined
Path: IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS06@14100000/USB2.0 Hub             @14100000/AppleUSB20Hub@14100000/AppleUSB20HubPort@14120000/SteelSeries Arctis 7X@14120000/SteelSeries Arctis 7X@3/AppleUserUSBHostHIDDevice
```

This means that we know what the `Product ID` is but not what the `Bytes` are to get the information via the `report`. Create an Issue with this text.

To confirm a Product ID you can open your system information, copy the highlighted text in the screen shot below and Google `0x12d7 to decimal`.

![macOS of System Information showing the Product ID](docs/lookup_product_id.png)

# Credits

Inspired by https://github.com/atagulalan/arctis-battery-percentage

Original work done by [Fabien LOISON](https://blog.flozz.fr/2020/05/25/reverse-engineering-recuperer-le-niveau-de-batterie-du-casque-sans-fil-steelseries-arctis-7/)

# Arctis USB Finder

Finds known Arctis headsets that are currently plugged in via the USB dongle.

## Development

Use `npm install` to install all the dependencies and `npm test` to run the tests.

## Usage

Install the package:
```
npm install arctis-usb-finder
```

Require the package:
```js
const { getHeadphones } = require('arctis-usb-finder');
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
    batteryPercent: 58
  }
]
```

If the `isMuted`, `isCharging`, `isDischarging` or `isConnected` flags not supported they would return `undefined`. They are defined per Model you can see which headphones are supported [here](src/headphone_list.ts).

## Probe

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
```

## Credits

Inspired by https://github.com/atagulalan/arctis-battery-percentage

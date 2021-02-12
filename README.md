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

If the `isMuted`, `isCharging`, `isDischarging` or `isConnected` flags not supported they would return `undefined`. They are defiend per Model you can see which headphones are supported [here](src/headphone_list.ts).

## Credits

Inspired by https://github.com/atagulalan/arctis-battery-percentage
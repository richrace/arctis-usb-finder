#!/usr/bin/env node

import HID from 'node-hid';
import * as readline from 'readline';

import HidGateway from '../adapters/human_interface_device/gateway';
import HidDevice from '../adapters/human_interface_device/device';
import KnownHeadphone from '../models/known_headphone';
import UsbDevice from '../models/usb_device';

interface ProbeResult {
  device: UsbDevice;
  matchedBytes: number[] | undefined;
  matchedReport: number[] | undefined;
}

function testUnknownHeadset(headsets: UsbDevice[]): ProbeResult[] {
  return headsets.map((device: UsbDevice) => {
    const knownBytes = [
      [0x06, 0x18],
      [0x06, 0x12],
    ];
    let matchedReport, matchedBytes;

    console.log('Testing', device.realDevice().product);

    knownBytes.some((byteArray) => {
      const report = device.fetchInfo(byteArray);

      if (report.length > 0) {
        matchedBytes = byteArray;
        matchedReport = report;
        console.log('\tSuccess!');

        return true;
      }
    });

    return {
      device,
      matchedBytes,
      matchedReport,
    } as ProbeResult;
  });
}

function printPreamble() {
  console.log('Welcome to Arctis USB Finder Probe');
  console.log(' ');
  console.log('This tool will probe USB devices that look like they are SteelSeries USB devices.');
  console.log('**** It will write/send a command to the USB device. ****');
  console.log('**** It may have side effects / potentially (worst case) brick your device. ****');
  console.log('');
}

function exitMessage() {
  console.log('Exiting...');

  process.exit(0);
}

function probe() {
  console.log(' ');
  console.log('About to look for SteelSeries USB devices...');
  console.log(' ');

  const gateway = new HidGateway(HID, HidDevice);
  const devices = gateway.getUsbDevices();

  const steelseriesHeadsets = devices.filter((device: UsbDevice) => {
    return device.vendorId === KnownHeadphone.ArctisVendorID;
  });

  if (steelseriesHeadsets.length < 0) {
    console.log("Didn't find any SteelSeries Headset");

    exitMessage();
  }

  console.log(' ');
  console.log('Found SteelSeries USB devices:');
  console.log(' ');
  steelseriesHeadsets.forEach((device: UsbDevice) => console.log(device.realDevice().product));
  console.log(' ');
  console.log(' ');
  console.log('About to Probe...');
  console.log(' ');

  const foundHeadphones = testUnknownHeadset(steelseriesHeadsets);

  console.log(' ');
  console.log('**** Finished Probing ****');
  console.log(' ');
  console.log(' ');

  if (foundHeadphones.length > 0) {
    console.log(
      'Use can use the following information to create a develop your own solution and create a PR.'
    );
    console.log(
      'Or please copy / paste the following information and create an issue on the GitHub repo.'
    );
    console.log('Go to: https://github.com/richrace/arctis-usb-finder/');
    console.log('You can look for values changing when press mute/changing chat mixer/charging');
    console.log(' ');
    console.log(' ');
    console.log('Devices found:');
    console.log(' ');

    foundHeadphones.forEach((result: ProbeResult) => {
      console.log('Product:', result.device.realDevice().product);
      console.log('Product ID:', result.device.productId);
      console.log('Bytes:', result.matchedBytes);
      console.log('Report:', result.matchedReport);
      console.log('Path:', result.device.path());
      console.log(' ');
    });
  }

  exitMessage();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

printPreamble();

rl.question('Do you understand the risks and are happy to proceed? (Y/n): ', (answer) => {
  const agreeToContinue = answer.replace(/ /g, '').toLowerCase();

  if (['y', 'yes', 'continue'].indexOf(agreeToContinue) === -1) {
    console.log(' ');
    console.log('Aborting...');
    process.exit(1);
  }

  rl.close();

  probe();
});

#!/usr/bin/env node

import * as readline from 'readline';

import UsbDevice from '../interfaces/usb_device';
import Probe from '../use_cases/probe';
import ProbeResult from '../interfaces/probe_result';

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

  const probe = new Probe();

  const steelseriesHeadsets = probe.steelseriesHeadsets();

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

  const foundHeadphones = probe.testUnknownHeadset(steelseriesHeadsets);

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

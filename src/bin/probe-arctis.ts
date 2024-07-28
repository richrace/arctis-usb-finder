#!/usr/bin/env node
import HID from 'node-hid';
import * as readline from 'readline';
import Probe from '../use_cases/probe';

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

  const outputMessage = true;
  const probe = new Probe(outputMessage);

  const steelseriesHeadsets: HID.Device[] = probe.devices;

  if (steelseriesHeadsets.length < 0) {
    console.log("Didn't find any SteelSeries Headset");

    exitMessage();
  }

  console.log(' ');
  console.log('Found SteelSeries USB devices:');
  console.log(' ');
  steelseriesHeadsets.forEach((device: HID.Device) => console.log(device.product));
  console.log(' ');
  console.log(' ');
  console.log('About to Probe...');
  console.log(' ');

  probe.testUnknownHeadset();

  console.log(' ');
  console.log('**** Finished Probing ****');
  console.log(' ');
  console.log(' ');

  exitMessage();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
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

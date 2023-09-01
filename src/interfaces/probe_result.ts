interface ProbeResult {
  deviceProductName: string;
  deviceProductId: number;
  matchedBytes: number[] | undefined;
  matchedReport: number[] | undefined;
  devicePath: string | undefined;
}

export default ProbeResult;

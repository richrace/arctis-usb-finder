# Future Testing

## Acroname USB3 Hub Testing
- Use Acroname USB3 hub to manipulate port states programmatically
- Intercept and monitor USB traffic to better understand:
  - Nova Pro charging slot battery communication issues
  - Why HID reports differ from OLED display data
  - Timing/sequencing of battery detection
  - Differences between base stations that detect batteries via HID vs those that don't
- Test battery insertion/removal events with controlled timing
- Compare Elite vs Nova Pro USB communication patterns

### Key Findings from Manual Testing (2026-01-27)
- Nova Pro charging slot HID readings are unreliable (varies 0%, 25%, 50%, 100% for same ~35-40% battery)
- Elite readings are consistent and accurate (direct 0-100% values)
- Nova Pro uses 0-8 scale mapped to 0-100%
- OLED display shows correct battery presence even when HID doesn't detect it
- One base showed idx8=1, idx10=0 for dead battery; others showed idx8=8, idx10=2 (empty) even with battery present
- All Nova Pro bases had identical firmware (0000.003.08200)

`regulatory-exposure-command-center` has two layers:

1. analyzer
   - reads synthetic regulatory exposure snapshots and packets
   - scores exposure, evidence quality, and readiness posture
   - emits a deterministic report used by every other interface

2. presentation
   - turns the same findings into regulatory-lane, exposure-findings, and board-brief views
   - prerenders a static site and JSON APIs for buyer-readable review
   - keeps the same synthetic payload available to the CLI and the live surface

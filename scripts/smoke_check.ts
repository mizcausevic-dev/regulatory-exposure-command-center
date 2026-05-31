import { boardBrief, exposureFindings, payload, regulatoryLane, summary, verification } from "../src/services/regulatoryExposureCommandCenterService.js";

const checks = [
  ["/regulatory-lane", regulatoryLane().length > 0],
  ["/exposure-findings", exposureFindings().length > 0],
  ["/board-brief", boardBrief().length > 0],
  ["/verification", verification().length === 5],
  ["/api/dashboard/summary", summary().systems > 0],
  ["/api/regulatory-lane", regulatoryLane().length === 4],
  ["/api/exposure-findings", exposureFindings().length > 0],
  ["/api/board-brief", boardBrief().length === 4],
  ["/api/sample", Boolean(payload().sample)]
] as const;

const failures = checks.filter(([, ok]) => !ok).map(([name]) => name);

if (failures.length > 0) {
  console.error("smoke check failed");
  for (const failure of failures) {
    console.error(` - ${failure}`);
  }
  process.exit(1);
}

console.log("smoke check passed");

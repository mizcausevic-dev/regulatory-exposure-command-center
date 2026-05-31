import { boardBrief, exposureFindings, regulatoryLane, summary } from "../src/services/regulatoryExposureCommandCenterService.js";

console.log("regulatory-exposure-command-center demo");
console.log(summary());
console.log(`${regulatoryLane().length} regulatory lanes`);
console.log(`${exposureFindings().length} findings`);
console.log(`${boardBrief().length} board brief packets`);

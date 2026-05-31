import fs from "node:fs";

import { analyze } from "./analyze.js";
import { formatMarkdown, formatSummary } from "./format.js";
import type { RegulatoryExposureExport } from "./types.js";

function usage() {
  console.log(`regulatory-exposure-command-center

Usage:
  npx regulatory-exposure-command-center <input.json> [--format summary|markdown|json]

Examples:
  npx regulatory-exposure-command-center fixtures/regulatory-exposure.json --format summary
  npx regulatory-exposure-command-center fixtures/regulatory-exposure-clean.json --format markdown`);
}

const args = process.argv.slice(2);
if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  usage();
  process.exit(0);
}

const input = args[0];
const formatArgIndex = args.indexOf("--format");
const format = formatArgIndex >= 0 ? args[formatArgIndex + 1] ?? "summary" : "summary";

const raw = fs.readFileSync(input, "utf8");
const payload = JSON.parse(raw) as RegulatoryExposureExport;
const report = analyze(payload);

if (format === "json") {
  console.log(JSON.stringify(report, null, 2));
} else if (format === "markdown") {
  console.log(formatMarkdown(report));
} else {
  console.log(formatSummary(report));
}

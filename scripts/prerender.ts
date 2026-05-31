import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { boardBrief, exposureFindings, payload, regulatoryLane, summary, verification } from "../src/services/regulatoryExposureCommandCenterService.js";
import { renderBoardBrief, renderDocs, renderExposureFindings, renderOverview, renderRegulatoryLane, renderVerification } from "../src/services/render.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const site = path.join(root, "site");

rmSync(site, { recursive: true, force: true });

const files: Record<string, string> = {
  "index.html": renderOverview(),
  [path.join("regulatory-lane", "index.html")]: renderRegulatoryLane(),
  [path.join("exposure-findings", "index.html")]: renderExposureFindings(),
  [path.join("board-brief", "index.html")]: renderBoardBrief(),
  [path.join("verification", "index.html")]: renderVerification(),
  [path.join("docs", "index.html")]: renderDocs(),
  "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://regulatory.kineticgain.com/sitemap.xml\n",
  "sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://regulatory.kineticgain.com/</loc></url>
  <url><loc>https://regulatory.kineticgain.com/regulatory-lane/</loc></url>
  <url><loc>https://regulatory.kineticgain.com/exposure-findings/</loc></url>
  <url><loc>https://regulatory.kineticgain.com/board-brief/</loc></url>
  <url><loc>https://regulatory.kineticgain.com/verification/</loc></url>
  <url><loc>https://regulatory.kineticgain.com/docs/</loc></url>
</urlset>`,
  [path.join("api", "dashboard", "summary.json")]: JSON.stringify(summary(), null, 2),
  [path.join("api", "regulatory-lane.json")]: JSON.stringify(regulatoryLane(), null, 2),
  [path.join("api", "exposure-findings.json")]: JSON.stringify(exposureFindings(), null, 2),
  [path.join("api", "board-brief.json")]: JSON.stringify(boardBrief(), null, 2),
  [path.join("api", "verification.json")]: JSON.stringify(verification(), null, 2),
  [path.join("api", "sample.json")]: JSON.stringify(payload(), null, 2)
};

for (const [relativePath, contents] of Object.entries(files)) {
  const fullPath = path.join(site, relativePath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, contents);
}

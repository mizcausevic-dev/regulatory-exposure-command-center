import express from "express";

import { boardBrief, exposureFindings, payload, regulatoryLane, summary, verification } from "./services/regulatoryExposureCommandCenterService.js";
import { renderBoardBrief, renderDocs, renderExposureFindings, renderOverview, renderRegulatoryLane, renderVerification } from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/regulatory-lane", (_req, res) => res.type("html").send(renderRegulatoryLane()));
  app.get("/exposure-findings", (_req, res) => res.type("html").send(renderExposureFindings()));
  app.get("/board-brief", (_req, res) => res.type("html").send(renderBoardBrief()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/regulatory-lane", (_req, res) => res.json(regulatoryLane()));
  app.get("/api/exposure-findings", (_req, res) => res.json(exposureFindings()));
  app.get("/api/board-brief", (_req, res) => res.json(boardBrief()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload()));

  return app;
}

const app = createApp();
export default app;

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT || 5544);
  app.listen(port, () => {
    console.log(`regulatory-exposure-command-center listening on http://127.0.0.1:${port}`);
  });
}

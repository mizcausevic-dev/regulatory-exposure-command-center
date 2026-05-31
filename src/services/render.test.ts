import { describe, expect, it } from "vitest";

import { renderBoardBrief, renderDocs, renderExposureFindings, renderOverview, renderRegulatoryLane, renderVerification } from "./render.js";

describe("render", () => {
  it("renders the overview", () => {
    expect(renderOverview()).toContain("Regulatory Exposure Command Center");
  });

  it("renders the regulatory lane route", () => {
    expect(renderRegulatoryLane()).toContain("Regulatory Lane");
    expect(renderRegulatoryLane()).toContain("Disclosure and filing lane");
  });

  it("renders docs with api details", () => {
    expect(renderDocs()).toContain("/api/regulatory-lane");
    expect(renderDocs()).toContain("regulatory-exposure-command-center");
  });

  it("renders board brief and verification", () => {
    expect(renderBoardBrief()).toContain("Board Brief");
    expect(renderExposureFindings()).toContain("Exposure Findings");
    expect(renderVerification()).toContain("Verification");
  });
});

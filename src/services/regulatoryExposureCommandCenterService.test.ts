import { describe, expect, it } from "vitest";

import { boardBrief, exposureFindings, payload, regulatoryLane, summary, verification } from "./regulatoryExposureCommandCenterService.js";

describe("regulatoryExposureCommandCenterService", () => {
  it("returns a stable summary shape", () => {
    expect(summary().systems).toBeGreaterThan(0);
    expect(summary().impactedPrograms).toBeGreaterThan(0);
    expect(summary().estimatedPenaltyUsd).toBeGreaterThan(0);
  });

  it("returns one regulatory-lane item per executive lane", () => {
    expect(regulatoryLane()).toHaveLength(4);
    expect(regulatoryLane()[0]?.lane).toContain("lane");
  });

  it("sorts exposure findings by severity", () => {
    const items = exposureFindings();
    expect(items[0]?.severity).toBe("high");
  });

  it("returns board brief packets", () => {
    expect(boardBrief()).toHaveLength(4);
    expect(boardBrief()[0]?.packetId).toContain("REG-");
  });

  it("returns a full payload", () => {
    expect(payload().regulatoryLane).toHaveLength(4);
    expect(payload().exposureFindings.length).toBeGreaterThan(0);
    expect(verification()).toHaveLength(5);
  });
});

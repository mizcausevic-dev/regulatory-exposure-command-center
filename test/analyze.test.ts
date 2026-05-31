import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { analyze } from "../src/analyze.js";
import { formatMarkdown, formatSummary } from "../src/format.js";
import type { RegulatoryExposureExport } from "../src/types.js";

const here = fileURLToPath(new URL(".", import.meta.url));
const fixture = (name: string): RegulatoryExposureExport =>
  JSON.parse(readFileSync(`${here}/../fixtures/${name}`, "utf8")) as RegulatoryExposureExport;

const NOW = "2026-05-31T08:00:00Z";

describe("analyze", () => {
  it("counts systems and regulatory packets", () => {
    const report = analyze(fixture("regulatory-exposure.json"), { now: NOW });
    expect(report.systems).toBe(3);
    expect(report.currentSnapshots).toBe(2);
    expect(report.packets).toBe(7);
    expect(report.blockingPackets).toBe(4);
    expect(report.criticalPackets).toBe(3);
    expect(report.filingPackets).toBe(1);
    expect(report.policyPackets).toBe(1);
    expect(report.impactedPrograms).toBe(29);
    expect(report.estimatedPenaltyUsd).toBe(1345000);
  });

  it("flags filing and cross-border exposure as high", () => {
    const report = analyze(fixture("regulatory-exposure.json"), { now: NOW });
    expect(report.findingsList.find((item) => item.code === "filing-readiness-gap")?.severity).toBe("high");
    expect(report.findingsList.find((item) => item.code === "cross-border-transfer-exposed")?.severity).toBe("high");
  });

  it("flags board reporting and policy drift gaps", () => {
    const report = analyze(fixture("regulatory-exposure.json"), { now: NOW });
    expect(report.findingsList.find((item) => item.code === "board-reporting-gap")).toBeDefined();
    expect(report.findingsList.find((item) => item.code === "policy-drift-uncontained")).toBeDefined();
  });

  it("returns ok=true on a clean fixture", () => {
    const report = analyze(fixture("regulatory-exposure-clean.json"), { now: NOW });
    expect(report.ok).toBe(true);
    expect(report.findingsList.filter((item) => item.severity === "high")).toEqual([]);
  });
});

describe("formatters", () => {
  it("renders findings in markdown", () => {
    const markdown = formatMarkdown(analyze(fixture("regulatory-exposure.json"), { now: NOW }));
    expect(markdown).toContain("# Regulatory Exposure Command Center");
    expect(markdown).toContain("filing-readiness-gap");
  });

  it("renders clean markdown and summary", () => {
    const report = analyze(fixture("regulatory-exposure-clean.json"), { now: NOW });
    expect(formatMarkdown(report)).toContain("No findings generated.");
    expect(formatSummary(report)).toContain("systems: 2");
  });
});

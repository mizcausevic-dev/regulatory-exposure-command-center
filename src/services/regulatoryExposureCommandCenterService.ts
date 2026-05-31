import { analyze } from "../analyze.js";
import { sampleRegulatoryExposure } from "../data/sampleRegulatoryExposure.js";

const report = analyze(sampleRegulatoryExposure, { now: "2026-05-31T08:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    systems: report.systems,
    currentSnapshots: report.currentSnapshots,
    packets: report.packets,
    blockingPackets: report.blockingPackets,
    criticalPackets: report.criticalPackets,
    evidenceScore: report.evidenceScore,
    filingPackets: report.filingPackets,
    policyPackets: report.policyPackets,
    impactedPrograms: report.impactedPrograms,
    estimatedPenaltyUsd: report.estimatedPenaltyUsd,
    highFindings,
    recommendation:
      "Tighten filing readiness, consent disclosures, retention controls, cross-border commitments, and board-pack costing before telling a clean board or investor story."
  };
}

export function regulatoryLane() {
  return [
    {
      lane: "Disclosure and filing lane",
      owner: "Privacy operations",
      status: "red",
      relatedFindings: 2,
      focus: "Bring filing packets and public disclosures back into one reviewable and attested path.",
      nextAction: "Close unresolved disclosure exceptions and publish one owner-signed filing packet.",
      note: "Board exposure rises fast when disclosure posture drifts from what leadership thinks is live."
    },
    {
      lane: "Records and retention lane",
      owner: "Compliance engineering",
      status: "red",
      relatedFindings: 2,
      focus: "Replace manual recordkeeping and legal-hold workarounds with governed control evidence.",
      nextAction: "Reconcile hold exceptions and reissue the retention proof pack with deletion evidence.",
      note: "Retention weakness makes diligence claims expensive to defend."
    },
    {
      lane: "Cross-border vendor lane",
      owner: "Legal and procurement",
      status: "red",
      relatedFindings: 2,
      focus: "Refresh transfer commitments, subprocessor evidence, and vendor attestations before the next board cycle.",
      nextAction: "Re-certify transfer commitments and tie each subprocessor lane to a current vendor packet.",
      note: "Cross-border posture weakens the investor story if the vendor paper trail is stale."
    },
    {
      lane: "Board reporting lane",
      owner: "Executive operations",
      status: "yellow",
      relatedFindings: 2,
      focus: "Turn manual board packs into one consistent exposure, costing, and remediation narrative.",
      nextAction: "Replace partial remediation costing with one funded regulatory exposure memo.",
      note: "Leadership needs one board brief that ties exposure, savings, and investment to named actions."
    }
  ];
}

export function exposureFindings() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return report.findingsList
    .map((finding) => ({
      ...finding,
      owner:
        finding.scope === "POLICY_LAYER"
          ? "Privacy operations"
          : finding.scope === "CONTROL_LAYER"
            ? "Compliance engineering"
            : finding.scope === "VENDOR_LAYER"
              ? "Legal and procurement"
              : "Executive operations"
    }))
    .sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function boardBrief() {
  return [
    {
      packetId: "REG-11",
      lane: "Disclosure and filing",
      completenessScore: 54,
      status: "red",
      blocker: "The flagship filing packet still depends on unresolved disclosure exceptions and draft commentary.",
      owner: "Privacy operations",
      decisionNote: "Fund the filing-readiness closeout now because it is the cleanest path to lower board and investor friction.",
      launchWindowHours: 72
    },
    {
      packetId: "REG-24",
      lane: "Retention controls",
      completenessScore: 59,
      status: "red",
      blocker: "Legal-hold exceptions and manual retention controls still weaken the diligence narrative.",
      owner: "Compliance engineering",
      decisionNote: "This lane is investment-worthy because remediation cost is concrete and the current exposure is measurable.",
      launchWindowHours: 84
    },
    {
      packetId: "REG-31",
      lane: "Cross-border commitments",
      completenessScore: 49,
      status: "red",
      blocker: "Transfer commitments and vendor evidence are too stale for a confident executive statement.",
      owner: "Legal and procurement",
      decisionNote: "Leadership should not oversell global readiness until the vendor and subprocessor evidence path is refreshed.",
      launchWindowHours: 96
    },
    {
      packetId: "REG-42",
      lane: "Board reporting",
      completenessScore: 71,
      status: "yellow",
      blocker: "The board pack still uses partial costing and inconsistent scoring language.",
      owner: "Executive operations",
      decisionNote: "A cleaner board brief becomes possible once one costed remediation frame replaces the manual patchwork.",
      launchWindowHours: 48
    }
  ];
}

export function verification() {
  return [
    "Synthetic sample data only - no live filing systems, regulator portals, or vendor credentials are shipped.",
    "Exposure findings come from modeled regulatory packets and snapshots, not hidden production compliance data.",
    "The command center is read-only and built for executive review, board prep, and diligence packaging.",
    "Every score, penalty estimate, and finding is reproducible from the exported regulatory packets.",
    "Board-facing conclusions stay bounded to the synthetic evidence shown in this repo."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    regulatoryLane: regulatoryLane(),
    exposureFindings: exposureFindings(),
    boardBrief: boardBrief(),
    verification: verification(),
    sample: sampleRegulatoryExposure
  };
}

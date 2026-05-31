import type { RegulatoryExposureExport } from "../types.js";

export const sampleRegulatoryExposure: RegulatoryExposureExport = {
  snapshots: [
    {
      id: "state-privacy-disclosures",
      name: "State privacy disclosures",
      scope: "POLICY_LAYER",
      riskStatus: "CRITICAL",
      snapshotStatus: "CURRENT",
      reviewPath: "disclosures/state-privacy/current-quarter",
      owner: "Privacy operations",
      openObligationScore: 78,
      collectedAt: "2026-05-31T07:00:00Z"
    },
    {
      id: "retention-and-records",
      name: "Retention and records",
      scope: "CONTROL_LAYER",
      riskStatus: "WATCH",
      snapshotStatus: "CURRENT",
      reviewPath: "records/retention/legal-hold",
      owner: "Compliance engineering",
      openObligationScore: 64,
      collectedAt: "2026-05-31T07:00:00Z"
    },
    {
      id: "vendor-cross-border-commitments",
      name: "Vendor cross-border commitments",
      scope: "VENDOR_LAYER",
      riskStatus: "WATCH",
      snapshotStatus: "STALE",
      reviewPath: "vendors/transfers/subprocessors",
      owner: "Legal and procurement",
      openObligationScore: 59,
      collectedAt: "2026-05-26T07:00:00Z"
    }
  ],
  packets: [
    {
      id: "REG-11",
      snapshotId: "state-privacy-disclosures",
      resourcePath: "state-disclosure-filing-pack",
      scope: "POLICY_LAYER",
      evidenceFamily: "FilingReadiness",
      status: "DEGRADED",
      expectedState: "board-ready filing packet with reviewed disclosure evidence and attested owner signoff",
      observedState: "draft filing packet with unresolved disclosure exceptions and unreviewed control commentary",
      riskWindowHours: 74,
      impactedPrograms: 6,
      estimatedPenaltyUsd: 275000,
      blocksExecutiveReadiness: true,
      note: "Leadership would overstate readiness if the board packet went out today."
    },
    {
      id: "REG-18",
      snapshotId: "state-privacy-disclosures",
      resourcePath: "consent-and-disclaimer-change-log",
      scope: "POLICY_LAYER",
      evidenceFamily: "ConsentDisclosure",
      status: "CHANGED",
      expectedState: "aligned consent language and current public disclosures across all active product surfaces",
      observedState: "disclosure lag across active pages with inconsistent consent language and untracked copy drift",
      riskWindowHours: 46,
      impactedPrograms: 5,
      estimatedPenaltyUsd: 180000,
      blocksExecutiveReadiness: true,
      note: "Disclosure drift weakens the board story and raises cleanup cost."
    },
    {
      id: "REG-24",
      snapshotId: "retention-and-records",
      resourcePath: "retention-schedule-enforcement",
      scope: "CONTROL_LAYER",
      evidenceFamily: "RetentionControl",
      status: "DEGRADED",
      expectedState: "current retention map, hold exceptions, and deletion evidence for material systems",
      observedState: "manual retention controls with unresolved hold exceptions and delayed destruction evidence",
      riskWindowHours: 62,
      impactedPrograms: 4,
      estimatedPenaltyUsd: 220000,
      blocksExecutiveReadiness: true,
      note: "Recordkeeping posture is not strong enough for diligence claims yet."
    },
    {
      id: "REG-31",
      snapshotId: "vendor-cross-border-commitments",
      resourcePath: "subprocessor-transfer-commitments",
      scope: "VENDOR_LAYER",
      evidenceFamily: "CrossBorderTransfer",
      status: "DEGRADED",
      expectedState: "verified transfer commitments and current subprocessor evidence for each cross-border lane",
      observedState: "stale transfer commitments with missing subprocessor evidence and unverified vendor commitments",
      riskWindowHours: 89,
      impactedPrograms: 3,
      estimatedPenaltyUsd: 315000,
      blocksExecutiveReadiness: true,
      note: "Cross-border statements would be hard to defend under diligence."
    },
    {
      id: "REG-37",
      snapshotId: "vendor-cross-border-commitments",
      resourcePath: "vendor-policy-attestation-pack",
      scope: "VENDOR_LAYER",
      evidenceFamily: "VendorCommitment",
      status: "CHANGED",
      expectedState: "current vendor attestations linked to policies, retention duties, and transfer controls",
      observedState: "missing vendor attestation evidence with delayed procurement follow-up and open commitment gaps",
      riskWindowHours: 27,
      impactedPrograms: 2,
      estimatedPenaltyUsd: 95000,
      blocksExecutiveReadiness: false,
      note: "The procurement story is incomplete even if direct exposure is moderate."
    },
    {
      id: "REG-42",
      snapshotId: "retention-and-records",
      resourcePath: "quarterly-board-regulatory-pack",
      scope: "BOARD_LAYER",
      evidenceFamily: "BoardReporting",
      status: "CHANGED",
      expectedState: "current board pack with filing posture, open gaps, estimated exposure, and funded remediation path",
      observedState: "manual board pack with inconsistent risk scoring and partial remediation costing",
      riskWindowHours: 18,
      impactedPrograms: 5,
      estimatedPenaltyUsd: 120000,
      blocksExecutiveReadiness: false,
      note: "The pack exists, but it still needs one coherent executive scoring frame."
    },
    {
      id: "REG-45",
      snapshotId: "state-privacy-disclosures",
      resourcePath: "policy-change-register",
      scope: "POLICY_LAYER",
      evidenceFamily: "PolicyDrift",
      status: "CHANGED",
      expectedState: "current policy map with reviewed control changes and tracked exception history",
      observedState: "policy drift with untracked change history and manual exception handling across active disclosure controls",
      riskWindowHours: 34,
      impactedPrograms: 4,
      estimatedPenaltyUsd: 140000,
      blocksExecutiveReadiness: false,
      note: "The exposure is moderate, but the drift story is too manual for a clean board narrative."
    }
  ]
};

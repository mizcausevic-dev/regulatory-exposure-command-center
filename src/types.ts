export type ScopeKind =
  | "POLICY_LAYER"
  | "CONTROL_LAYER"
  | "JURISDICTION_LAYER"
  | "VENDOR_LAYER"
  | "BOARD_LAYER";

export type RiskHealth = "HEALTHY" | "WATCH" | "CRITICAL";
export type SnapshotStatus = "CURRENT" | "STALE";
export type PacketStatus = "ADDED" | "REMOVED" | "CHANGED" | "DEGRADED";
export type EvidenceFamily =
  | "FilingReadiness"
  | "PolicyDrift"
  | "ConsentDisclosure"
  | "RetentionControl"
  | "CrossBorderTransfer"
  | "VendorCommitment"
  | "EnforcementResponse"
  | "BoardReporting";

export interface RegulatorySnapshot {
  id: string;
  name: string;
  scope: ScopeKind;
  riskStatus: RiskHealth;
  snapshotStatus: SnapshotStatus;
  reviewPath: string;
  owner: string;
  openObligationScore: number;
  collectedAt: string;
}

export interface RegulatoryExposurePacket {
  id: string;
  snapshotId: string;
  resourcePath: string;
  scope: ScopeKind;
  evidenceFamily: EvidenceFamily;
  status: PacketStatus;
  expectedState: string;
  observedState: string;
  riskWindowHours: number;
  impactedPrograms: number;
  estimatedPenaltyUsd: number;
  blocksExecutiveReadiness?: boolean;
  note?: string;
}

export interface RegulatoryExposureExport {
  snapshots?: RegulatorySnapshot[];
  packets?: RegulatoryExposurePacket[];
}

export type FindingSeverity = "high" | "medium" | "low" | "info";

export type FindingCode =
  | "no-current-regulatory-snapshot"
  | "stale-regulatory-snapshot"
  | "filing-readiness-gap"
  | "policy-drift-uncontained"
  | "consent-disclosure-misaligned"
  | "retention-control-gap"
  | "cross-border-transfer-exposed"
  | "vendor-commitment-unverified"
  | "board-reporting-gap"
  | "long-lived-exposure-window";

export interface Finding {
  code: FindingCode;
  severity: FindingSeverity;
  message: string;
  subject: string;
  subjectName?: string;
  scope?: ScopeKind;
  evidenceFamily?: EvidenceFamily;
}

export interface PostureReport {
  generatedAt: string;
  systems: number;
  currentSnapshots: number;
  packets: number;
  blockingPackets: number;
  criticalPackets: number;
  filingPackets: number;
  policyPackets: number;
  evidenceScore: number;
  impactedPrograms: number;
  estimatedPenaltyUsd: number;
  findingsList: Finding[];
  ok: boolean;
}

export interface PostureOptions {
  now?: string;
  stalePacketAfterHours?: number;
}

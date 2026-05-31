import type { Finding, PostureOptions, PostureReport, RegulatoryExposureExport, RegulatorySnapshot } from "./types.js";

function isCurrent(snapshot: RegulatorySnapshot): boolean {
  return snapshot.snapshotStatus === "CURRENT";
}

function includesAny(text: string, needles: string[]): boolean {
  const haystack = text.toLowerCase();
  return needles.some((needle) => haystack.includes(needle));
}

export function analyze(payload: RegulatoryExposureExport, options: PostureOptions = {}): PostureReport {
  const now = options.now ?? new Date().toISOString();
  const stalePacketAfterHours = options.stalePacketAfterHours ?? 24;
  const snapshots = payload.snapshots ?? [];
  const packets = payload.packets ?? [];
  const findingsList: Finding[] = [];

  const currentSnapshots = snapshots.filter(isCurrent).length;
  if (currentSnapshots === 0) {
    findingsList.push({
      code: "no-current-regulatory-snapshot",
      severity: "high",
      message: "No current regulatory exposure snapshot is available for executive review.",
      subject: "regulatory-snapshot-currentness"
    });
  }

  for (const snapshot of snapshots) {
    if (snapshot.snapshotStatus === "STALE") {
      findingsList.push({
        code: "stale-regulatory-snapshot",
        severity: snapshot.riskStatus === "CRITICAL" ? "high" : "medium",
        message: `Exposure snapshot for "${snapshot.name}" is stale and should not anchor a board brief without refresh.`,
        subject: snapshot.id,
        subjectName: snapshot.reviewPath,
        scope: snapshot.scope
      });
    }
  }

  for (const packet of packets) {
    const observed = packet.observedState.toLowerCase();

    if (
      packet.evidenceFamily === "FilingReadiness" &&
      includesAny(observed, ["draft filing packet", "unresolved disclosure", "unreviewed control commentary", "late filing"])
    ) {
      findingsList.push({
        code: "filing-readiness-gap",
        severity: packet.blocksExecutiveReadiness ? "high" : "medium",
        message: `Filing posture on "${packet.resourcePath}" is not board-ready enough for executive signoff.`,
        subject: packet.id,
        subjectName: packet.resourcePath,
        scope: packet.scope,
        evidenceFamily: packet.evidenceFamily
      });
    }

    if (
      packet.evidenceFamily === "PolicyDrift" &&
      includesAny(observed, ["policy drift", "untracked change", "manual exception", "uncontained drift"])
    ) {
      findingsList.push({
        code: "policy-drift-uncontained",
        severity: packet.blocksExecutiveReadiness ? "high" : "medium",
        message: `Policy drift on "${packet.resourcePath}" is too loose to support the current board story.`,
        subject: packet.id,
        subjectName: packet.resourcePath,
        scope: packet.scope,
        evidenceFamily: packet.evidenceFamily
      });
    }

    if (
      packet.evidenceFamily === "ConsentDisclosure" &&
      includesAny(observed, ["disclosure lag", "inconsistent consent", "copy drift", "misaligned disclaimer"])
    ) {
      findingsList.push({
        code: "consent-disclosure-misaligned",
        severity: packet.blocksExecutiveReadiness ? "high" : "medium",
        message: `Consent and disclosure coverage on "${packet.resourcePath}" is too inconsistent for a clean external narrative.`,
        subject: packet.id,
        subjectName: packet.resourcePath,
        scope: packet.scope,
        evidenceFamily: packet.evidenceFamily
      });
    }

    if (
      packet.evidenceFamily === "RetentionControl" &&
      includesAny(observed, ["manual retention", "hold exceptions", "delayed destruction", "missing recordkeeping"])
    ) {
      findingsList.push({
        code: "retention-control-gap",
        severity: packet.blocksExecutiveReadiness ? "high" : "medium",
        message: `Retention control evidence on "${packet.resourcePath}" is too weak for diligence-safe claims.`,
        subject: packet.id,
        subjectName: packet.resourcePath,
        scope: packet.scope,
        evidenceFamily: packet.evidenceFamily
      });
    }

    if (
      packet.evidenceFamily === "CrossBorderTransfer" &&
      includesAny(observed, ["stale transfer", "missing subprocessor", "unverified vendor", "cross-border"])
    ) {
      findingsList.push({
        code: "cross-border-transfer-exposed",
        severity: packet.blocksExecutiveReadiness ? "high" : "medium",
        message: `Cross-border transfer evidence on "${packet.resourcePath}" is too stale for executive comfort.`,
        subject: packet.id,
        subjectName: packet.resourcePath,
        scope: packet.scope,
        evidenceFamily: packet.evidenceFamily
      });
    }

    if (
      packet.evidenceFamily === "VendorCommitment" &&
      includesAny(observed, ["missing vendor attestation", "commitment gaps", "delayed procurement", "unverified vendor"])
    ) {
      findingsList.push({
        code: "vendor-commitment-unverified",
        severity: packet.blocksExecutiveReadiness ? "high" : "medium",
        message: `Vendor commitment evidence on "${packet.resourcePath}" is too incomplete for board-ready reporting.`,
        subject: packet.id,
        subjectName: packet.resourcePath,
        scope: packet.scope,
        evidenceFamily: packet.evidenceFamily
      });
    }

    if (
      packet.evidenceFamily === "BoardReporting" &&
      includesAny(observed, ["manual board pack", "partial remediation costing", "inconsistent risk scoring", "late executive packet"])
    ) {
      findingsList.push({
        code: "board-reporting-gap",
        severity: packet.blocksExecutiveReadiness ? "high" : "medium",
        message: `Board reporting on "${packet.resourcePath}" is too manual to support clean investor or board communication.`,
        subject: packet.id,
        subjectName: packet.resourcePath,
        scope: packet.scope,
        evidenceFamily: packet.evidenceFamily
      });
    }

    if (packet.riskWindowHours > stalePacketAfterHours) {
      findingsList.push({
        code: "long-lived-exposure-window",
        severity: packet.riskWindowHours > stalePacketAfterHours * 2 ? "medium" : "low",
        message: `Regulatory exposure packet on "${packet.resourcePath}" has remained open for ${packet.riskWindowHours} hours.`,
        subject: packet.id,
        subjectName: packet.resourcePath,
        scope: packet.scope,
        evidenceFamily: packet.evidenceFamily
      });
    }
  }

  const blockingPackets = packets.filter((packet) => packet.blocksExecutiveReadiness).length;
  const criticalPackets = packets.filter((packet) => packet.status === "DEGRADED").length;
  const filingPackets = packets.filter((packet) => packet.evidenceFamily === "FilingReadiness").length;
  const policyPackets = packets.filter((packet) => packet.evidenceFamily === "PolicyDrift").length;
  const impactedPrograms = packets.reduce((sum, packet) => sum + packet.impactedPrograms, 0);
  const estimatedPenaltyUsd = packets.reduce((sum, packet) => sum + packet.estimatedPenaltyUsd, 0);
  const avgExposure = snapshots.length > 0 ? snapshots.reduce((sum, snapshot) => sum + snapshot.openObligationScore, 0) / snapshots.length : 100;
  const evidencePenalty = blockingPackets * 6 + findingsList.filter((item) => item.severity === "high").length * 4;
  const evidenceScore = Math.max(0, Math.round(100 - avgExposure / 2 - evidencePenalty));
  const ok = !findingsList.some((finding) => finding.severity === "high");

  return {
    generatedAt: now,
    systems: snapshots.length,
    currentSnapshots,
    packets: packets.length,
    blockingPackets,
    criticalPackets,
    filingPackets,
    policyPackets,
    evidenceScore,
    impactedPrograms,
    estimatedPenaltyUsd,
    findingsList,
    ok
  };
}

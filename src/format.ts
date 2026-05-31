import type { PostureReport } from "./types.js";

export function formatSummary(report: PostureReport) {
  return [
    `generatedAt: ${report.generatedAt}`,
    `systems: ${report.systems}`,
    `currentSnapshots: ${report.currentSnapshots}`,
    `packets: ${report.packets}`,
    `blockingPackets: ${report.blockingPackets}`,
    `criticalPackets: ${report.criticalPackets}`,
    `evidenceScore: ${report.evidenceScore}`,
    `impactedPrograms: ${report.impactedPrograms}`,
    `estimatedPenaltyUsd: ${report.estimatedPenaltyUsd}`,
    `highFindings: ${report.findingsList.filter((finding) => finding.severity === "high").length}`
  ].join("\n");
}

export function formatMarkdown(report: PostureReport) {
  const rows = report.findingsList
    .map(
      (finding) =>
        `| ${finding.severity} | ${finding.code} | ${finding.subjectName ?? finding.subject} | ${finding.message.replace(/\|/g, "\\|")} |`
    )
    .join("\n");

  return [
    "# Regulatory Exposure Command Center",
    "",
    `- Generated at: \`${report.generatedAt}\``,
    `- Evidence score: **${report.evidenceScore}**`,
    `- Blocking packets: **${report.blockingPackets}**`,
    `- Impacted programs: **${report.impactedPrograms}**`,
    `- Estimated penalty USD: **${report.estimatedPenaltyUsd}**`,
    "",
    "## Findings",
    "",
    "| Severity | Code | Subject | Message |",
    "| --- | --- | --- | --- |",
    rows || "| info | none | none | No findings generated. |"
  ].join("\n");
}

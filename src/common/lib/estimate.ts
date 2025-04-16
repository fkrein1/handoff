import { Estimate } from "@/data";

export function calculateSectionTotal(
  section: Estimate["sections"][0],
): number {
  return section.rows.reduce(
    (total, row) => total + row.price * row.quantity,
    0,
  );
}

export function calculateEstimateTotal(estimate: Estimate): number {
  return estimate.sections.reduce(
    (total, section) => total + calculateSectionTotal(section),
    0,
  );
}

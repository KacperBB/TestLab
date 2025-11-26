import { useMemo } from "react";

export default function useTestStats(testCases) {
  const stats = useMemo(() => {
    const total = testCases.length;
    const passed = testCases.filter((tc) => tc.status === "passed").length;
    const failed = testCases.filter((tc) => tc.status === "failed").length;
    const notRun = testCases.filter((tc) => tc.status === "not_run").length;

    const byTypeMap = testCases.reduce((acc, tc) => {
      const type = tc.type || "unknown";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const byType = Object.entries(byTypeMap).map(([type, count]) => ({
      type,
      count,
    }));

    return {
      total,
      passed,
      failed,
      notRun,
      byType,
    };
  }, [testCases]);

  return stats;
}

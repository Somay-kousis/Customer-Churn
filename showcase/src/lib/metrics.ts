export interface ThresholdMetrics {
  threshold: number;
  precision: number;
  recall: number;
  f1: number;
  tp: number;
  fp: number;
  fn: number;
  tn: number;
  businessReport: string;
  badge: "VULNERABLE" | "BALANCED" | "SECURE";
}

export const thresholdData: ThresholdMetrics[] = [
  {
    threshold: 0.10,
    precision: 0.350,
    recall: 0.980,
    f1: 0.516,
    tp: 26227,
    fp: 48707,
    fn: 536,
    tn: 43369,
    badge: "VULNERABLE",
    businessReport: "Hyper-vigilant protocol. The engine flags almost everyone showing minor friction. Churn leak is practically zero, but we waste massive retention budget offering discounts to 48,000 active, loyal users."
  },
  {
    threshold: 0.20,
    precision: 0.480,
    recall: 0.920,
    f1: 0.630,
    tp: 24622,
    fp: 26674,
    fn: 2141,
    tn: 65402,
    badge: "VULNERABLE",
    businessReport: "Aggressive outreach campaign. Captures 92% of churn risk. However, the budget remains bloated due to false alarms outnumbering actual churn events."
  },
  {
    threshold: 0.30,
    precision: 0.6038,
    recall: 0.8297,
    f1: 0.6989,
    tp: 22205,
    fp: 14573,
    fn: 4558,
    tn: 77503,
    badge: "BALANCED",
    businessReport: "Tuned Risk Profile. Recommended by product engineering. Achieves optimal business economics: captures 83% of churners while keeping marketing discount waste within acceptable operational limits."
  },
  {
    threshold: 0.35,
    precision: 0.6305,
    recall: 0.7905,
    f1: 0.7015,
    tp: 21157,
    fp: 12401,
    fn: 5606,
    tn: 79675,
    badge: "BALANCED",
    businessReport: "Standard Model Cutoff. Slightly more cautious. Lowers false alarm rate by 15% but begins leaking high-risk users who slip past the 0.35 probability barrier."
  },
  {
    threshold: 0.40,
    precision: 0.6591,
    recall: 0.7482,
    f1: 0.7008,
    tp: 20025,
    fp: 10359,
    fn: 6738,
    tn: 81717,
    badge: "BALANCED",
    businessReport: "Conservative Baseline. Minimizes false positives further. This is ideal if discount margins are thin, but leaves 6,738 churners undetected."
  },
  {
    threshold: 0.45,
    precision: 0.6854,
    recall: 0.7000,
    f1: 0.6926,
    tp: 18734,
    fp: 8599,
    fn: 8029,
    tn: 83477,
    badge: "SECURE",
    businessReport: "Skeptical Outreach. Only alerts when there is clear, double-reinforced churn signaling. Keeps false alarms low, but allows 8,000 customers to walk away without retention offers."
  },
  {
    threshold: 0.50,
    precision: 0.7145,
    recall: 0.6418,
    f1: 0.6762,
    tp: 17177,
    fp: 6863,
    fn: 9586,
    tn: 85213,
    badge: "SECURE",
    businessReport: "Strict Classical Cutoff. The standard default classifier setting. It completely ignores asymmetric costs, leading to high precision on paper but severe customer leakage in practice."
  },
  {
    threshold: 0.60,
    precision: 0.770,
    recall: 0.510,
    f1: 0.614,
    tp: 13649,
    fp: 4075,
    fn: 13114,
    tn: 88001,
    badge: "SECURE",
    businessReport: "Critical Risk Only. Requires extreme indicators of service abandonment (e.g. service cancellation processes or complete lack of auto-pay + high charges). Misses nearly half of all churners."
  },
  {
    threshold: 0.70,
    precision: 0.820,
    recall: 0.380,
    f1: 0.519,
    tp: 10170,
    fp: 2231,
    fn: 16593,
    tn: 90845,
    badge: "SECURE",
    businessReport: "Deep Friction Filter. Alerts only when the user is practically gone. False positives are near zero, but churn remains highly unmitigated."
  },
  {
    threshold: 0.80,
    precision: 0.870,
    recall: 0.240,
    f1: 0.376,
    tp: 6423,
    fn: 20340,
    fp: 960,
    tn: 91116,
    badge: "SECURE",
    businessReport: "Extreme Isolation. Minimizes discount budget, targeting only the top 5% most clear-cut churners. Leaves 20,000 customers to disappear silently."
  },
  {
    threshold: 0.90,
    precision: 0.920,
    recall: 0.090,
    f1: 0.164,
    tp: 2408,
    fn: 24355,
    fp: 209,
    tn: 91867,
    badge: "SECURE",
    businessReport: "Absolute Certainty. The model is effectively dormant, firing only on catastrophic accounts. Maximizes efficiency of discount codes, but fails at predictive risk management."
  }
];

export function getMetricsForThreshold(val: number): ThresholdMetrics {
  // Clamp value between 0.1 and 0.9
  const t = Math.max(0.1, Math.min(0.9, val));
  
  // Find lower and upper bounds
  let lower = thresholdData[0];
  let upper = thresholdData[thresholdData.length - 1];
  
  for (let i = 0; i < thresholdData.length; i++) {
    if (thresholdData[i].threshold === t) {
      return thresholdData[i];
    }
    if (thresholdData[i].threshold < t) {
      lower = thresholdData[i];
    }
    if (thresholdData[i].threshold > t) {
      upper = thresholdData[i];
      break;
    }
  }
  
  // Interpolation fraction
  const fraction = (t - lower.threshold) / (upper.threshold - lower.threshold);
  
  const tp = Math.round(lower.tp + fraction * (upper.tp - lower.tp));
  const fp = Math.round(lower.fp + fraction * (upper.fp - lower.fp));
  const fn = Math.round(lower.fn + fraction * (upper.fn - lower.fn));
  const tn = Math.round(lower.tn + fraction * (upper.tn - lower.tn));
  
  const precision = lower.precision + fraction * (upper.precision - lower.precision);
  const recall = lower.recall + fraction * (upper.recall - lower.recall);
  const f1 = lower.f1 + fraction * (upper.f1 - lower.f1);
  
  // Use lower bound text or interpolate text based on cutoff
  const businessReport = t < 0.25 ? thresholdData[0].businessReport :
                         t < 0.42 ? thresholdData[2].businessReport :
                         t < 0.55 ? thresholdData[6].businessReport :
                         t < 0.75 ? thresholdData[7].businessReport :
                         thresholdData[10].businessReport;
  
  const badge = t < 0.25 ? "VULNERABLE" : t < 0.45 ? "BALANCED" : "SECURE";

  return {
    threshold: Number(t.toFixed(2)),
    precision,
    recall,
    f1,
    tp,
    fp,
    fn,
    tn,
    businessReport,
    badge
  };
}

export interface BusinessCostConfig {
  customerLtv: number;
  retentionCost: number;
}

export const defaultBusinessConfig: BusinessCostConfig = {
  customerLtv: 80,
  retentionCost: 15
};

export function calculateBusinessImpact(metrics: ThresholdMetrics, config = defaultBusinessConfig) {
  const { tp, fp, fn } = metrics;
  const { customerLtv, retentionCost } = config;
  
  // Cost of Churn if we do absolutely nothing (everyone who would churn leaves)
  const baseCost = (tp + fn) * customerLtv;
  
  // Cost of the model's campaign:
  // - Missed Churners leave (FN * LTV)
  // - Caught Churners get discount (TP * retentionCost)
  // - False Alarms get discount (FP * retentionCost)
  const campaignCost = (fn * customerLtv) + ((tp + fp) * retentionCost);
  
  const netSavings = baseCost - campaignCost;
  const falseAlarmCost = fp * retentionCost;
  const lostRevenue = fn * customerLtv;
  
  return {
    baseCost,
    campaignCost,
    netSavings,
    falseAlarmCost,
    lostRevenue
  };
}

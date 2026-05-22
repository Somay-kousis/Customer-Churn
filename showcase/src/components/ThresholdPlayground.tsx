"use client";

import { useState } from "react";
import { getMetricsForThreshold, calculateBusinessImpact, thresholdData } from "../lib/metrics";
import { DollarSign, Calculator, Info, Compass } from "lucide-react";

export default function ThresholdPlayground() {
  const [threshold, setThreshold] = useState<number>(0.30);
  
  // Calculate current stats
  const metrics = getMetricsForThreshold(threshold);
  const impact = calculateBusinessImpact(metrics);

  const { tp, fp, fn, tn, precision, recall, f1, badge, businessReport } = metrics;
  const { baseCost, campaignCost, netSavings, falseAlarmCost, lostRevenue } = impact;

  // SVG dimensions for chart
  const padding = 35;
  const chartWidth = 485;
  const chartHeight = 170;

  // Convert threshold value to chart X coordinate
  const getX = (t: number) => {
    // scale from [0.1, 0.9] to [padding, chartWidth - padding]
    return padding + ((t - 0.1) / 0.8) * (chartWidth - 2 * padding);
  };

  // Convert score (0 to 1) to chart Y coordinate (inverted)
  const getY = (val: number) => {
    return chartHeight - padding - (val * (chartHeight - 2 * padding));
  };

  // Build SVG paths for Precision and Recall curves
  const precisionPath = thresholdData.map(d => `${getX(d.threshold)},${getY(d.precision)}`).join(" L ");
  const recallPath = thresholdData.map(d => `${getX(d.threshold)},${getY(d.recall)}`).join(" L ");

  // Tick marks for slider calibration
  const ticks = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

  return (
    <section id="playground" className="py-24 px-6 md:px-12 border-b border-zinc-800 bg-zinc-950 relative overflow-hidden bg-grid-lines">
      
      {/* Visual blueprint overlay */}
      <div className="absolute top-0 right-[25%] w-px h-full bg-zinc-900/40 pointer-events-none" />
      
      {/* Marginal handwritten notes */}
      <div className="absolute top-[8%] right-[5%] font-handwriting text-base text-red-500/80 rotate-2 select-none z-20 pointer-events-none hidden xl:block max-w-[220px] leading-tight">
        &ldquo;The standard 0.50 cutoff is a trap. It looks balanced, but cost asymmetry makes it a million-dollar leak.&rdquo;
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-850 pb-8">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">{"// AUDIT DEPT: RISK CALIBRATION"}</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-100 font-sans">
              Chapter 6: How Wrong Can We Afford To Be?
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs font-mono text-zinc-500 leading-relaxed">
            Standard metrics assume all errors are equal. They are not. Letting a subscriber escape costs five times more than offering an unnecessary incentive. We must tune our boundaries to the shape of our losses.
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mechanical Risk Dial / Calibration & Curves (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8 border border-zinc-800 bg-zinc-900/10 p-6 md:p-8 relative">
            
            {/* Calibration Ruler (Slider styled as physical rule) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="text-[10px] font-mono font-bold text-zinc-400 flex items-center gap-2">
                  <Compass className="h-4 w-4 text-zinc-500" />
                  ERROR BOUNDARY CALIBRATION DIAL
                </span>
                <span className={`px-2 py-0.5 border text-[9px] font-mono font-black tracking-wider ${
                  badge === "VULNERABLE" ? "border-red-900/80 bg-red-950/20 text-red-400" :
                  badge === "BALANCED" ? "border-zinc-500/80 bg-zinc-900 text-zinc-350" :
                  "border-emerald-950/45 bg-emerald-950/20 text-emerald-400"
                }`}>
                  {badge} PROFILE
                </span>
              </div>

              {/* The mechanical slider representation */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-mono text-zinc-600">DECISION WEIGHT (t)</span>
                  <div className="text-3xl font-black font-mono tracking-tighter text-zinc-100 bg-zinc-950 border border-zinc-900 px-3 py-1 rounded-sm relative">
                    <span className="text-xs text-zinc-650 absolute top-1 left-2 font-light">VAL</span>
                    <span className="pl-6">{threshold.toFixed(2)}</span>
                  </div>
                </div>

                <div className="relative py-4">
                  {/* Ruler Ticks Background */}
                  <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-800 transform -translate-y-1/2" />
                  
                  {/* Ticks */}
                  <div className="flex justify-between px-2 relative z-0">
                    {ticks.map((tVal) => (
                      <div key={tVal} className="flex flex-col items-center">
                        <div className={`w-0.5 h-3 ${tVal === 0.3 || tVal === 0.5 ? "bg-red-500 h-4.5" : "bg-zinc-800"} mt-0.5`} />
                        <span className="text-[8px] font-mono text-zinc-700 mt-1 font-bold">
                          {tVal.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* HTML Range Input overlayed on top, styled transparently except for thumb */}
                  <input
                    type="range"
                    min="0.10"
                    max="0.90"
                    step="0.05"
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                  />

                  {/* Absolute visual marker thumb */}
                  <div 
                    className="absolute top-1.5 h-12 w-1 border-r-2 border-red-500 z-10 pointer-events-none transition-all duration-75 flex items-center justify-center"
                    style={{ left: `${((threshold - 0.1) / 0.8) * 94 + 3}%` }}
                  >
                    <div className="absolute top-0 w-2 h-2 bg-red-500 transform rotate-45 -translate-x-0.5" />
                    <div className="absolute bottom-0 w-2 h-2 bg-red-500 transform rotate-45 -translate-x-0.5" />
                  </div>
                </div>
                
                <div className="flex justify-between text-[9px] font-mono text-zinc-600">
                  <span className="font-handwriting text-red-500/80 -rotate-2 select-none">
                    * Aggressive (High Cost FP)
                  </span>
                  <span className="font-handwriting text-red-500/80 rotate-1 select-none">
                    * Conservative (High Cost FN)
                  </span>
                </div>
              </div>
            </div>

            {/* Trade-off curve charts styled as blueprint paper */}
            <div className="space-y-2 pt-4 border-t border-zinc-900">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                {"// PLOTTED DISCRIMINATION LIMITS"}
              </span>
              <div className="border border-zinc-900 bg-zinc-950 p-2 overflow-x-auto rounded-xs">
                <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
                  {/* Grid Lines */}
                  <line x1={padding} y1={getY(0.5)} x2={chartWidth - padding} y2={getY(0.5)} stroke="rgba(255,255,255,0.03)" />
                  <line x1={getX(0.3)} y1={padding} x2={getX(0.3)} y2={chartHeight - padding} stroke="rgba(255,255,255,0.03)" />
                  <line x1={getX(0.5)} y1={padding} x2={getX(0.5)} y2={chartHeight - padding} stroke="rgba(255,255,255,0.03)" />
                  <line x1={getX(0.7)} y1={padding} x2={getX(0.7)} y2={chartHeight - padding} stroke="rgba(255,255,255,0.03)" />

                  {/* Axes */}
                  <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="rgba(255,255,255,0.15)" />
                  <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="rgba(255,255,255,0.15)" />

                  {/* Recall line (Red) */}
                  <path d={`M ${recallPath}`} fill="none" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="1.5" />
                  
                  {/* Precision line (Muted Zinc) */}
                  <path d={`M ${precisionPath}`} fill="none" stroke="rgba(161, 161, 170, 0.6)" strokeWidth="1.5" />

                  {/* Current threshold vertical slider indicator */}
                  <line 
                    x1={getX(threshold)} 
                    y1={padding} 
                    x2={getX(threshold)} 
                    y2={chartHeight - padding} 
                    stroke="rgba(239, 68, 68, 0.3)" 
                    strokeWidth="1.5" 
                    strokeDasharray="2,2" 
                  />

                  {/* Intersect Dots */}
                  <circle cx={getX(threshold)} cy={getY(recall)} r="4.5" fill="#ef4444" />
                  <circle cx={getX(threshold)} cy={getY(precision)} r="4.5" fill="#a1a1aa" />

                  {/* Label tags */}
                  <text x={padding + 10} y={padding + 12} fill="#ef4444" fontSize="8.5" fontFamily="monospace" fontWeight="bold">RECALL (SENSITIVITY)</text>
                  <text x={padding + 10} y={padding + 24} fill="#a1a1aa" fontSize="8.5" fontFamily="monospace" fontWeight="bold">PRECISION (ACCURACY)</text>
                  
                  {/* Values */}
                  <text x={getX(threshold) + 8} y={getY(recall) - 4} fill="#ef4444" fontSize="9.5" fontFamily="monospace" fontWeight="bold">R:{(recall * 100).toFixed(0)}%</text>
                  <text x={getX(threshold) + 8} y={getY(precision) + 10} fill="#a1a1aa" fontSize="9.5" fontFamily="monospace" fontWeight="bold">P:{(precision * 100).toFixed(0)}%</text>

                  {/* Axis labels */}
                  <text x={chartWidth - padding} y={chartHeight - padding + 12} fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="monospace" textAnchor="end">t = 0.90</text>
                  <text x={padding} y={chartHeight - padding + 12} fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="monospace">t = 0.10</text>
                </svg>
              </div>
            </div>

            {/* Performance Statistics Grid */}
            <div className="grid grid-cols-3 gap-3 text-center font-mono">
              <div className="border border-zinc-900 bg-zinc-950 p-3">
                <span className="text-[8px] text-zinc-500 block uppercase">PRECISION</span>
                <span className="text-sm font-bold text-zinc-200">{(precision * 100).toFixed(1)}%</span>
              </div>
              <div className="border border-zinc-900 bg-zinc-950 p-3">
                <span className="text-[8px] text-zinc-500 block uppercase">RECALL</span>
                <span className="text-sm font-bold text-zinc-200">{(recall * 100).toFixed(1)}%</span>
              </div>
              <div className="border border-zinc-900 bg-zinc-950 p-3">
                <span className="text-[8px] text-zinc-500 block uppercase">F1-SCORE</span>
                <span className="text-sm font-bold text-zinc-200">{(f1 * 100).toFixed(1)}%</span>
              </div>
            </div>

          </div>

          {/* Center Column: Confusion Matrix as Internal Log Sheet (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-6">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block px-1">
              {"// CONFUSION MATRIX CLASSIFICATION"}
            </span>
            
            <div className="border border-zinc-800 bg-zinc-900/10 p-4 space-y-4 font-mono relative">
              <div className="absolute top-2 right-2 text-[7px] text-zinc-700">LOG_SYS_V4</div>
              
              <div className="grid grid-cols-2 gap-2 text-center text-[9px] text-zinc-500 border-b border-zinc-900 pb-2">
                <div>PREDICTED ACTIVE</div>
                <div>PREDICTED CHURN</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* True Negative */}
                <div className="border border-zinc-900 bg-zinc-950/80 p-3 flex flex-col justify-between h-22 text-left relative overflow-hidden">
                  <span className="text-[8px] text-zinc-650 block leading-none font-bold">TRUE NEGATIVE (TN)</span>
                  <span className="text-lg font-black text-zinc-400 tracking-tight">{tn.toLocaleString()}</span>
                  <span className="text-[7.5px] text-zinc-600 leading-tight">Correctly left alone. No cost.</span>
                </div>

                {/* False Positive */}
                <div className="border border-zinc-900 bg-zinc-950/80 p-3 flex flex-col justify-between h-22 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-2 bg-amber-900/40" />
                  <span className="text-[8px] text-amber-500/80 block leading-none font-bold">FALSE ALARM (FP)</span>
                  <span className="text-lg font-black text-amber-500/90 tracking-tight">{fp.toLocaleString()}</span>
                  <span className="text-[7.5px] text-zinc-600 leading-tight">Wasted promotion ($15 offer).</span>
                </div>

                {/* False Negative */}
                <div className="border border-zinc-900 bg-zinc-950/80 p-3 flex flex-col justify-between h-22 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-950/60" />
                  <span className="text-[8px] text-red-500/80 block leading-none font-bold">LEAKED CHURN (FN)</span>
                  <span className="text-lg font-black text-red-500/90 tracking-tight">{fn.toLocaleString()}</span>
                  <span className="text-[7.5px] text-zinc-600 leading-tight">Lost customer ($80 loss).</span>
                </div>

                {/* True Positive */}
                <div className="border border-zinc-900 bg-zinc-950/80 p-3 flex flex-col justify-between h-22 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-950/45" />
                  <span className="text-[8px] text-emerald-500/80 block leading-none font-bold">RESCUED USER (TP)</span>
                  <span className="text-lg font-black text-emerald-500/90 tracking-tight">{tp.toLocaleString()}</span>
                  <span className="text-[7.5px] text-zinc-600 leading-tight">Saved customer. Net positive.</span>
                </div>
              </div>

              <div className="text-[9px] text-zinc-500 border-t border-zinc-900 pt-3 leading-relaxed">
                <span className="text-zinc-400 font-bold block mb-1 uppercase tracking-wider">Operational Subset:</span>
                Active: 92,076 accounts <br />
                Churned: 26,763 accounts <br />
                <span className="text-zinc-350 font-bold">Total Operations: 118,839</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Invoice Ledger Sheet (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block px-1">
              {"// FINANCIAL AUDIT LEDGER"}
            </span>
            
            <div className="border border-zinc-800 bg-zinc-900/20 p-6 font-mono space-y-6 text-xs relative">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                <span className="font-bold text-zinc-300 flex items-center gap-1.5 uppercase">
                  <Calculator className="h-4 w-4 text-zinc-450" />
                  Cost-Benefit Ledger
                </span>
                <span className="text-[9px] text-zinc-600">T_VAL = {threshold}</span>
              </div>

              {/* Calculations ledger styled like a thermal printer output */}
              <div className="space-y-3.5 leading-normal text-[11px]">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Unmitigated Baseline Loss:</span>
                  <span className="text-zinc-350">${baseCost.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-amber-500/95">
                  <span>(-) False Alarm Costs (FP × $15):</span>
                  <span>-${falseAlarmCost.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-red-500/95">
                  <span>(-) Leaked Revenue Loss (FN × $80):</span>
                  <span>-${lostRevenue.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-emerald-500/95">
                  <span>(+) Salvaged LTV (TP × $80):</span>
                  <span>+${(tp * 80).toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-zinc-500 border-t border-zinc-900 pt-3">
                  <span>Campaign Promo Cost (TP × $15):</span>
                  <span>-${(tp * 15).toLocaleString()}</span>
                </div>

                <div className="flex justify-between font-bold text-zinc-300">
                  <span>Reconstructed Campaign Cost:</span>
                  <span>${campaignCost.toLocaleString()}</span>
                </div>
              </div>

              {/* Saved Cash Highlights Box */}
              <div className="border-t border-zinc-800 pt-4 mt-2">
                <div className="p-4 bg-zinc-950 border border-zinc-900 flex flex-col justify-center gap-1 relative overflow-hidden">
                  <span className="text-[9px] text-zinc-500">NET TREASURY GAINS RECLAIMED</span>
                  <div className="text-3xl font-black text-zinc-100 tracking-tighter flex items-center">
                    <DollarSign className="h-6 w-6 text-zinc-400 -ml-1.5 shrink-0 animate-pulse" />
                    <span>{netSavings.toLocaleString()}</span>
                  </div>
                  <span className="text-[7.5px] text-zinc-600 uppercase mt-1">
                    NET GAINS VS. ZERO MITIGATION STRATEGY
                  </span>
                </div>
              </div>

              {/* Dynamic Narrative Diagnostic report */}
              <div className="border border-zinc-900 bg-zinc-950 p-4 rounded-sm text-[10px] text-zinc-500 space-y-1.5 leading-relaxed">
                <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase tracking-wider">
                  <Info className="h-3.5 w-3.5 text-zinc-500" />
                  DIAGNOSTIC TELEMETRY LOG
                </div>
                <p className="italic text-zinc-400">
                  &quot;{businessReport}&quot;
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Tradeoff Summary note with physical stamp */}
        <div className="border border-zinc-900 bg-zinc-950 p-6 flex flex-col md:flex-row gap-6 items-center justify-between font-mono text-[11px] leading-relaxed text-zinc-500 relative">
          <div className="max-w-3xl">
            <span className="text-zinc-400 font-bold block uppercase mb-1">
              INVESTIGATOR NOTES ON MITIGATION calibration
            </span>
            Observe the mathematical truth: at standard default <span className="text-zinc-300">0.50</span> cutoff, we claim high precision (71%) but leak 9,586 customers, resulting in net gains of <span className="text-zinc-300">$1,013,560</span>. Tuning down to <span className="text-zinc-300">0.30</span> triggers 14,573 false alarms, but rescues 22,205 churners, yielding <span className="text-zinc-300">$1,224,730</span> in saved resources. We choose the messy, profitable margin.
          </div>
          
          {/* Calibrated dial target stamp */}
          <div className="border-2 border-red-500/40 text-red-500/80 bg-red-950/5 font-black text-xs px-4 py-3 tracking-widest text-center uppercase rotate-2 shrink-0">
            SWEET SPOT CALIBRATION
            <span className="block text-lg mt-0.5 text-red-400">t = 0.30</span>
          </div>
        </div>

      </div>
    </section>
  );
}

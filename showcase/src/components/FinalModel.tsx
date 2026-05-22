"use client";

import { Cpu, Terminal, ShieldCheck, BadgeCheck } from "lucide-react";

export default function FinalModel() {
  const hyperparams = {
    n_estimators: 560,
    learning_rate: 0.216,
    max_depth: 3,
    subsample: 0.790,
    colsample_bytree: 0.702,
    gamma: 0.202,
    min_child_weight: 2,
    reg_alpha: 0.403,
    reg_lambda: 2.687
  };

  return (
    <section className="py-24 px-6 md:px-12 border-b border-zinc-800 bg-zinc-950/60 relative overflow-hidden bg-grid-dots">
      
      {/* Absolute positioning handwriting marginal notes */}
      <div className="absolute top-[12%] left-[8%] font-handwriting text-lg text-red-500/80 -rotate-2 select-none z-20 pointer-events-none hidden xl:block max-w-xs leading-none">
        &ldquo;We don&apos;t have a perfect truth.<br />
        This is just our current best explanation.&rdquo;
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* Container styled as a recovered declassified file folder */}
        <div className="border border-zinc-800 bg-zinc-900/10 p-6 md:p-10 relative overflow-hidden">
          
          {/* Manila file folder visual tab */}
          <div className="absolute top-0 left-0 bg-zinc-900 border-b border-r border-zinc-800 text-[8px] font-mono text-zinc-500 px-3 py-1 uppercase tracking-widest">
            ARCHIVAL_DOCKET // PLD_881
          </div>

          {/* Top-Right Red Stamp (DECLASSIFIED) */}
          <div className="absolute top-4 right-4 md:right-8 md:top-6 px-4 py-2 border-3 border-red-500/40 text-red-500/80 bg-red-950/5 font-black text-xs md:text-sm tracking-widest uppercase rotate-12 pointer-events-none select-none z-20">
            DECLASSIFIED
          </div>

          {/* Technical Spec Plate Layout */}
          <div className="space-y-8 font-mono pt-4">
            
            {/* Header Plate */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-zinc-950 border border-zinc-850 text-zinc-400">
                  <Cpu className="h-6 w-6 text-red-500/80" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest">{"// RECONSTRUCTED MODEL SPECIFICATION"}</span>
                    <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black uppercase text-zinc-100 tracking-tight font-sans mt-0.5">
                    Chapter 7: Current Best Explanation
                  </h3>
                </div>
              </div>
              
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] text-zinc-650 uppercase block font-bold">RELEASE STATUS</span>
                <span className="text-xs text-zinc-400">APPROVED FOR PRODUCTION</span>
              </div>
            </div>

            {/* Main Stats Callout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
              
              {/* Massive Score Block */}
              <div className="md:col-span-6 border border-zinc-900 bg-zinc-950/80 p-6 flex flex-col justify-center gap-1.5 text-left relative overflow-hidden min-h-[160px]">
                <div className="absolute top-0 right-0 px-2 py-0.5 bg-zinc-900 text-[8px] font-bold text-zinc-500 border-b border-l border-zinc-850">
                  ROC-AUC PROBABILITY LIMIT
                </div>
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">DISCRIMINATIVE RESOLUTION</span>
                <span className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 to-zinc-400 leading-none">
                  0.9176
                </span>
                <p className="text-[9.5px] text-zinc-500 leading-relaxed mt-3 border-t border-zinc-900 pt-3">
                  This mathematical construct achieves 91.76% probability ranking confidence. In layman terms, it accurately sorts a future churner above an active customer 9 out of 10 times.
                </p>
              </div>

              {/* Core metrics comparison */}
              <div className="md:col-span-6 space-y-4">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">
                  TARGET METRICS CALIBRATED AT t = 0.30
                </span>
                
                <div className="space-y-3">
                  {/* Recall */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500 text-xs">Recall (True Alarm Rate):</span>
                    <span className="text-zinc-200 font-bold text-sm font-mono">83.1%</span>
                  </div>
                  {/* Precision */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500 text-xs">Precision (Alarm Veracity):</span>
                    <span className="text-zinc-200 font-bold text-sm font-mono">60.8%</span>
                  </div>
                  {/* F1 Score */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500 text-xs">F1 Score (Balanced Weight):</span>
                    <span className="text-zinc-200 font-bold text-sm font-mono">70.3%</span>
                  </div>
                  {/* Accuracy */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500 text-xs">Overall Accuracy Baseline:</span>
                    <span className="text-zinc-200 font-bold text-sm font-mono">85.0%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Hyperparameters Block */}
            <div className="space-y-2.5 pt-4">
              <span className="text-[10px] text-zinc-500 uppercase flex items-center gap-1.5 font-bold">
                <Terminal className="h-3.5 w-3.5 text-zinc-500" />
                TUNED MODEL CONFIGURATION ARTIFACT (JSON)
              </span>
              <div className="p-4 bg-zinc-950 border border-zinc-900 text-zinc-400 rounded-xs text-[11.5px] overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar">
                {JSON.stringify(hyperparams, null, 2)}
              </div>
            </div>

            {/* Field Critique marginal note style */}
            <div className="p-4 bg-zinc-950 border border-zinc-900 text-xs text-zinc-500 leading-relaxed font-mono relative">
              <span className="absolute top-2 right-2 text-[7px] text-zinc-700">COM_FILE_88</span>
              <span className="text-zinc-450 font-bold block uppercase tracking-wider mb-1">
                SUMMARY INVESTIGATIVE VERDICT
              </span>
              This model does not capture human emotion, nor does it resolve customer service failures. It is simply an engine designed to spot the footprints of silent decay—early contract fatigue, auto-pay abandonment, and billing friction. It is the current best explanation of why our subscribers disappear.
            </div>

            {/* Bottom Signature Section */}
            <div className="pt-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-[9px] text-zinc-650 gap-4">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/80" />
                SYSTEM_PIPELINE: PROD_MODEL_DEPLOYMENT_ACTIVE
              </span>
              <span className="font-handwriting text-base text-red-500/80 leading-none">
                Verified: Internal Research Division, Sub-Sec 9
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

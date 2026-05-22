"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert } from "lucide-react";

interface ModelRecord {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  rocAuc: number;
  parameters: string;
  isChampion?: boolean;
  verdict: string;
  verdictStyle: string; // "rejected" | "insufficient" | "viable"
  critique: string;
}

const modelsData: ModelRecord[] = [
  {
    id: "xgboost",
    name: "XGBoost Ensemble",
    type: "Gradient Boosted Trees (Trial #309)",
    accuracy: 0.850,
    precision: 0.608,
    recall: 0.831,
    f1: 0.703,
    rocAuc: 0.9176,
    parameters: "n_estimators: 560, max_depth: 3, learning_rate: 0.216, subsample: 0.79",
    isChampion: true,
    verdict: "VIABLE",
    verdictStyle: "viable",
    critique: "The ensemble captures the interactive effects. Best fit for non-linear decay curves."
  },
  {
    id: "catboost",
    name: "CatBoost Classifier",
    type: "Categorical Gradient Boosting (Trial #214)",
    accuracy: 0.846,
    precision: 0.598,
    recall: 0.812,
    f1: 0.689,
    rocAuc: 0.9120,
    parameters: "iterations: 600, depth: 4, learning_rate: 0.15, l2_leaf_reg: 3.0",
    verdict: "INSUFFICIENT",
    verdictStyle: "insufficient",
    critique: "Decent fit, but XGBoost edges it out on precision and execution speed."
  },
  {
    id: "logistic",
    name: "Logistic Regression",
    type: "Balanced Linear Classification (Trial #082)",
    accuracy: 0.808,
    precision: 0.547,
    recall: 0.878,
    f1: 0.674,
    rocAuc: 0.9090,
    parameters: "penalty: l2, solver: lbfs, C: 100, class_weight: balanced",
    verdict: "REJECTED",
    verdictStyle: "rejected",
    critique: "Assumed risk increases linearly... completely missed the compound friction spikes."
  },
  {
    id: "decision_tree",
    name: "Decision Tree (Shallow)",
    type: "Single Recursive Partition (Trial #041)",
    accuracy: 0.790,
    precision: 0.521,
    recall: 0.887,
    f1: 0.656,
    rocAuc: 0.9000,
    parameters: "max_depth: 5, min_samples_split: 10, class_weight: balanced",
    verdict: "REJECTED",
    verdictStyle: "rejected",
    critique: "Splits were too rigid. Shifted wildly on test subsets. Unstable."
  }
];

type MetricKey = "rocAuc" | "precision" | "recall" | "f1" | "accuracy";

export default function Leaderboard() {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("rocAuc");

  const metricsConfig = [
    { key: "rocAuc", label: "ROC-AUC", desc: "Discrimination limit" },
    { key: "f1", label: "F1-SCORE", desc: "Harmonic balancing" },
    { key: "precision", label: "PRECISION", desc: "False alarm filter" },
    { key: "recall", label: "RECALL", desc: "Escape detection rate" },
    { key: "accuracy", label: "ACCURACY", desc: "Crude guessing accuracy" },
  ];

  const sortedModels = [...modelsData].sort((a, b) => b[selectedMetric] - a[selectedMetric]);

  return (
    <section id="experiments" className="py-24 px-6 md:px-12 border-b border-zinc-800 bg-zinc-950 relative overflow-hidden bg-grid-dots">
      
      {/* Visual background lines */}
      <div className="absolute top-0 left-[45%] w-px h-full bg-gradient-to-b from-zinc-900 via-zinc-800/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-850 pb-8">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">{"// LABORATORY BLUEPRINTS // EVALUATIONS"}</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-100 font-sans">
              Chapter 5: Failed Theories
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs font-mono text-zinc-500 leading-relaxed">
            We chased multiple mathematical models to explain the exodus. Some split the customer base into rigid boxes; others assumed risk increases on a clean, straight line. They failed. Only ensemble decision boundaries could hold the signal.
          </p>
        </div>

        {/* Metric Trial Selectors (styled as checkboxes on a case folder tab) */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block px-1">
            SELECT TRIAL METRIC FOR CORRELATION SORT
          </span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {metricsConfig.map((metric) => {
              const active = selectedMetric === metric.key;
              return (
                <button
                  key={metric.key}
                  onClick={() => setSelectedMetric(metric.key as MetricKey)}
                  className={`px-3 py-4 text-left border font-mono text-xs transition-all relative flex flex-col justify-between h-20 ${
                    active
                      ? "border-zinc-200 bg-zinc-900 text-zinc-100 shadow-[0_2px_8px_rgba(255,255,255,0.05)]"
                      : "border-zinc-850 bg-zinc-950/60 text-zinc-500 hover:border-zinc-850 hover:text-zinc-400"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold uppercase tracking-wider text-[11px]">
                      {metric.label}
                    </span>
                    <div className={`h-2 w-2 rounded-full ${active ? "bg-red-500" : "bg-zinc-800"}`} />
                  </div>
                  <span className="text-[8px] text-zinc-600 block leading-tight mt-2 uppercase">
                    {metric.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Failed Theories Logs Grid */}
        <div className="space-y-8 pt-4">
          <AnimatePresence mode="popLayout">
            {sortedModels.map((model, index) => {
              const score = model[selectedMetric];
              const percentage = score * 100;
              
              // Define carbon booklet rotation style based on indices
              const angle = index % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]";

              return (
                <motion.div
                  layout
                  key={model.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className={`border p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative transition-all ${angle} ${
                    model.isChampion
                      ? "border-zinc-200 bg-zinc-900/10 shadow-[4px_6px_20px_rgba(255,255,255,0.02)]"
                      : "border-zinc-850 bg-zinc-950/20"
                  }`}
                >
                  {/* Ledger Stamp (Brutalist border stamps for rejection/verification) */}
                  <div className={`absolute top-4 right-4 md:right-8 md:top-6 px-3 py-1.5 border-2 text-[10px] font-mono font-black tracking-widest uppercase rotate-6 pointer-events-none select-none z-20 ${
                    model.verdictStyle === "viable"
                      ? "border-emerald-500/50 text-emerald-400/80 bg-emerald-950/5"
                      : model.verdictStyle === "insufficient"
                      ? "border-zinc-700/60 text-zinc-555 bg-zinc-900/5"
                      : "border-red-500/50 text-red-400/80 bg-red-950/5"
                  }`}>
                    {model.verdict}
                  </div>

                  {/* Left: Carbon copy index & parameters */}
                  <div className="space-y-2 lg:w-1/3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] font-mono text-zinc-600">TRIAL LOG 0{index + 1}.</span>
                      <h3 className="text-lg font-black tracking-tight text-zinc-200 font-mono uppercase">
                        {model.name}
                      </h3>
                    </div>
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-tight">
                      METHODOLOGY: {model.type}
                    </div>
                    <div className="p-2 bg-zinc-950 border border-zinc-900 text-[9px] font-mono text-zinc-500 leading-normal max-w-sm">
                      <span className="text-zinc-600 font-bold block text-[8px] mb-0.5">COMPILATION ARGUMENTS:</span>
                      {model.parameters}
                    </div>
                  </div>

                  {/* Center: Live Drawn Metric Bar */}
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                      <span>CALIBRATION DENSITY</span>
                      <span className="font-bold text-zinc-300 uppercase">
                        {selectedMetric}: {score.toFixed(4)}
                      </span>
                    </div>
                    
                    {/* The visual metric bar */}
                    <div className="h-4 bg-zinc-950 border border-zinc-900 rounded-xs overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full ${
                          model.isChampion
                            ? "bg-red-500/70 border-r border-zinc-200"
                            : "bg-zinc-700/50"
                        }`}
                      />
                    </div>

                    {/* Annotation written in margins below the bar */}
                    <div className="pt-2">
                      <span className="font-handwriting text-base text-red-500/80 leading-none">
                        * {model.critique}
                      </span>
                    </div>
                  </div>

                  {/* Right: The forensic metrics log grid */}
                  <div className="grid grid-cols-4 gap-2 lg:w-1/4 text-center font-mono border-t lg:border-t-0 lg:border-l border-zinc-900 pt-4 lg:pt-0 lg:pl-6 shrink-0">
                    <div className="p-1">
                      <span className="text-[8px] text-zinc-600 block uppercase font-bold">ROC-AUC</span>
                      <span className={`text-[12px] font-bold ${selectedMetric === "rocAuc" ? "text-zinc-100" : "text-zinc-500"}`}>
                        {model.rocAuc.toFixed(3)}
                      </span>
                    </div>
                    <div className="p-1">
                      <span className="text-[8px] text-zinc-600 block uppercase font-bold">PREC</span>
                      <span className={`text-[12px] font-bold ${selectedMetric === "precision" ? "text-zinc-100" : "text-zinc-500"}`}>
                        {model.precision.toFixed(3)}
                      </span>
                    </div>
                    <div className="p-1">
                      <span className="text-[8px] text-zinc-600 block uppercase font-bold">REC</span>
                      <span className={`text-[12px] font-bold ${selectedMetric === "recall" ? "text-zinc-100" : "text-zinc-500"}`}>
                        {model.recall.toFixed(3)}
                      </span>
                    </div>
                    <div className="p-1">
                      <span className="text-[8px] text-zinc-600 block uppercase font-bold">F1</span>
                      <span className={`text-[12px] font-bold ${selectedMetric === "f1" ? "text-zinc-100" : "text-zinc-500"}`}>
                        {model.f1.toFixed(3)}
                      </span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footnote on model design - Confident Directive */}
        <div className="border border-zinc-900 bg-zinc-950 p-5 text-[10px] font-mono text-zinc-650 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="h-4.5 w-4.5 text-zinc-500 mt-0.5 shrink-0" />
          <div>
            <span className="text-zinc-400 block font-bold uppercase tracking-wider mb-1">
              CONFIDENTIAL RESEARCH MEMORANDUM: TRADE-OFFS ON DETECTION
            </span>
            Decision Trees and linear classifiers produced high Recall metrics (e.g. 0.887), indicating they caught almost all deserters. However, their Precision was catastrophic (0.521), which means they triggered millions of false alarms. In telecom mitigation, false alarms mean sending expensive discounts to customers who were never planning to leave anyway. The gradient-boosted ensemble (XGBoost) provides the only mathematically viable envelope—maximizing general accuracy (ROC-AUC 0.9176) while protecting margins.
          </div>
        </div>

      </div>
    </section>
  );
}

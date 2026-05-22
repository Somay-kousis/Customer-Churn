"use client";

import { motion } from "framer-motion";
import { Trees, Network, AlertTriangle, GitCompare } from "lucide-react";

export default function Insights() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="insights" className="py-24 px-6 md:px-12 border-b border-zinc-800 bg-zinc-950 relative overflow-hidden bg-grid-lines">
      
      {/* Background tape or stamps */}
      <div className="absolute top-[15%] left-[10%] w-px h-1/2 bg-zinc-900 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-850 pb-8">
          <div>
            <span className="text-[10px] font-mono text-zinc-555 uppercase tracking-widest block mb-2">{"// SUB-SECTOR LOGS: RESEARCH DEVIATIONS"}</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-100 font-sans">
              Critical Discoveries
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs font-mono text-zinc-500 leading-relaxed">
            Four key anomalies uncovered during model building that ran contrary to typical data science assumptions. These discoveries forced us to rewrite our strategy.
          </p>
        </div>

        {/* Grid of Discovery Dossiers */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Discovery 1: Shallow Trees */}
          <motion.div 
            variants={itemVariants}
            className="border border-zinc-850 bg-zinc-900/10 p-6 space-y-4 hover:border-zinc-700 transition-colors relative"
          >
            {/* Staple vector SVG at top */}
            <div className="absolute top-2 left-6 h-3 w-10 bg-zinc-800/40 rounded-sm border border-zinc-700/30 rotate-1 hidden sm:block" />

            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 pt-2">
              <span className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-2">
                <Trees className="h-4 w-4 text-zinc-500" />
                DISCOVERY 01 // SHALLOW TREES WIN
              </span>
              <span className="text-[9px] font-mono text-zinc-600">LIMIT: max_depth = 3</span>
            </div>

            <p className="text-xs font-mono text-zinc-450 leading-relaxed">
              Despite tuning trying deep configurations, the engine preferred a strict limit of <strong className="text-zinc-250">max_depth: 3</strong>. This indicates churn behavior is governed by simple, intersecting linear rules rather than deep, complex interactions. Shallow structures prevent overfitting on historical noise.
            </p>

            {/* Visual representation of a shallow tree */}
            <div className="h-22 w-full bg-zinc-950/70 border border-zinc-900 p-2.5 flex items-center justify-center font-mono text-[9px] text-zinc-650 rounded-xs">
              <div className="flex flex-col items-center gap-2">
                <div className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300">FiberUser?</div>
                <div className="flex gap-10">
                  <div className="flex flex-col items-center">
                    <div className="px-1.5 py-0.5 border border-zinc-900 text-[8px]">Tenure &le; 3</div>
                    <div className="flex gap-2.5 mt-1">
                      <span className="text-red-400 font-bold">Risk 82%</span>
                      <span className="text-zinc-600">Risk 14%</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="px-1.5 py-0.5 border border-zinc-900 text-[8px]">AutoPay?</div>
                    <div className="flex gap-2.5 mt-1">
                      <span className="text-zinc-400">Risk 35%</span>
                      <span className="text-zinc-700">Risk 8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-handwriting text-base text-red-500/80 leading-none block">
                * Simple rules govern exit decisions.
              </span>
            </div>
          </motion.div>

          {/* Discovery 2: Feature Engineering */}
          <motion.div 
            variants={itemVariants}
            className="border border-zinc-850 bg-zinc-900/10 p-6 space-y-4 hover:border-zinc-700 transition-colors relative"
          >
            <div className="absolute top-2 left-6 h-3 w-10 bg-zinc-800/40 rounded-sm border border-zinc-700/30 -rotate-1 hidden sm:block" />

            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 pt-2">
              <span className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-2">
                <Network className="h-4 w-4 text-zinc-500" />
                {"DISCOVERY 02 // DATA > MATH"}
              </span>
              <span className="text-[9px] font-mono text-zinc-600">STRUCTURAL UPLIFT</span>
            </div>

            <p className="text-xs font-mono text-zinc-455 leading-relaxed">
              Moving from raw features to custom engineered variables (like <code className="text-zinc-350">SecurityServices</code>) increased ROC-AUC by <strong className="text-zinc-250">0.068</strong>. In comparison, moving from Linear Regression to XGBoost yielded only <strong className="text-zinc-250">0.008</strong> improvement. Data structure mattered more than the math.
            </p>

            {/* Visual graph of engineered uplift */}
            <div className="h-22 w-full bg-zinc-950/70 border border-zinc-900 p-3 flex flex-col justify-around font-mono text-[9px] text-zinc-650 rounded-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[7.5px]">
                  <span>RAW FEATURES + REGRESSION</span>
                  <span>ROC-AUC: 0.849</span>
                </div>
                <div className="h-2 bg-zinc-900 border border-zinc-850 rounded-xs overflow-hidden">
                  <div className="h-full bg-zinc-700/60 w-[84.9%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[7.5px] text-zinc-300">
                  <span>ENGINEERED FEATURES + REGRESSION</span>
                  <span className="text-red-400">+0.060 (ROC-AUC: 0.909)</span>
                </div>
                <div className="h-2 bg-zinc-900 border border-zinc-850 rounded-xs overflow-hidden">
                  <div className="h-full bg-zinc-450 w-[90.9%]" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-handwriting text-base text-red-500/80 leading-none block">
                * Structuring raw data yielded 7x more predictive power than changing models.
              </span>
            </div>
          </motion.div>

          {/* Discovery 3: Accuracy is Misleading */}
          <motion.div 
            variants={itemVariants}
            className="border border-zinc-850 bg-zinc-900/10 p-6 space-y-4 hover:border-zinc-700 transition-colors relative"
          >
            <div className="absolute top-2 left-6 h-3 w-10 bg-zinc-800/40 rounded-sm border border-zinc-700/30 rotate-2 hidden sm:block" />

            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 pt-2">
              <span className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-zinc-500" />
                DISCOVERY 03 // DECEPTIVE COMPASS
              </span>
              <span className="text-[9px] font-mono text-zinc-600">TARGET CLASS IMBALANCE</span>
            </div>

            <p className="text-xs font-mono text-zinc-450 leading-relaxed">
              If the database contains 78.5% active users, a broken script predicting &quot;No Churn&quot; for every single account achieves <strong className="text-zinc-250">78.5% Accuracy</strong>. This score hides complete blindness. To defend revenue, we ignored accuracy and optimized directly for Recall and ROC-AUC.
            </p>

            {/* Imbalance visual */}
            <div className="h-22 w-full bg-zinc-950/70 border border-zinc-900 p-2.5 flex items-center gap-4 font-mono text-[9px] rounded-xs">
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between text-[7.5px] text-zinc-500">
                  <span>ACTIVE SUBSCRIBERS (78.5%)</span>
                  <span>92,076</span>
                </div>
                <div className="h-2.5 bg-zinc-900 border border-zinc-800" />
              </div>
              <div className="w-1/4 space-y-1.5">
                <div className="flex justify-between text-[7.5px] text-red-400">
                  <span>CHURNERS (21.5%)</span>
                  <span>26,763</span>
                </div>
                <div className="h-2.5 bg-red-950/30 border border-red-900/40" />
              </div>
            </div>

            <div className="pt-2">
              <span className="font-handwriting text-base text-red-500/80 leading-none block">
                * A dead model guessing everyone stays is 78.5% accurate. Ignore overall accuracy.
              </span>
            </div>
          </motion.div>

          {/* Discovery 4: Model Selection vs Threshold Selection */}
          <motion.div 
            variants={itemVariants}
            className="border border-zinc-850 bg-zinc-900/10 p-6 space-y-4 hover:border-zinc-700 transition-colors relative"
          >
            <div className="absolute top-2 left-6 h-3 w-10 bg-zinc-800/40 rounded-sm border border-zinc-700/30 -rotate-3 hidden sm:block" />

            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 pt-2">
              <span className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-2">
                <GitCompare className="h-4 w-4 text-zinc-500" />
                DISCOVERY 04 // SEARCH != OPTIMIZATION
              </span>
              <span className="text-[9px] font-mono text-zinc-600">SEPARATE PROTOCOLS</span>
            </div>

            <p className="text-xs font-mono text-zinc-455 leading-relaxed">
              Selecting the model dictates how cleanly the probability scores are ranked. Calibrating the threshold (e.g. from 0.50 to 0.30) defines how the company acts on those scores. Finding the best classifier (XGBoost) and selecting the optimal business decision point are two separate, distinct decisions.
            </p>

            {/* Split Visual */}
            <div className="h-22 w-full bg-zinc-950/70 border border-zinc-900 p-2.5 flex items-center justify-around font-mono text-[9px] text-zinc-650 text-center rounded-xs">
              <div className="border border-zinc-900 bg-zinc-900/30 p-2 w-[45%]">
                <span className="text-[7.5px] text-zinc-600 block">MODEL SEARCH</span>
                <span className="text-zinc-350 font-bold block mt-0.5">RANKING SKILL</span>
                <span className="text-[7.5px] text-zinc-600 mt-0.5 block">ROC-AUC curves</span>
              </div>
              <div className="text-zinc-700 font-bold text-base">&rarr;</div>
              <div className="border border-zinc-900 bg-red-950/20 border-red-900/40 p-2 w-[45%]">
                <span className="text-[7.5px] text-red-500/80 block">THRESHOLD TUNING</span>
                <span className="text-zinc-200 font-bold block mt-0.5">BUSINESS YIELD</span>
                <span className="text-[7.5px] text-red-400/50 mt-0.5 block">Tuning for cost ($)</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-handwriting text-base text-red-500/80 leading-none block">
                * Mathematical ranking is useless if action is not calibrated to financial asymmetry.
              </span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

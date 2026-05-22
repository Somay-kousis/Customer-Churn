"use client";

import { motion } from "framer-motion";
import { TrendingDown, Scale, AlertOctagon, HelpCircle } from "lucide-react";

export default function Problem() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="problem" className="py-20 px-6 md:px-12 border-b border-zinc-800 bg-zinc-950 relative overflow-hidden bg-grid-dots">
      
      {/* Handwriting marginal notes */}
      <div className="absolute top-[8%] right-[10%] font-handwriting text-xl text-red-500/80 -rotate-3 select-none z-20 pointer-events-none hidden lg:block max-w-xs leading-none">
        &ldquo;We expected complaints...<br />
        We found absolute silence instead.&rdquo;
      </div>
      
      <div className="absolute bottom-[6%] right-[15%] font-handwriting text-lg text-zinc-500/70 rotate-6 select-none z-20 pointer-events-none hidden md:block">
        *1 lost customer = 5.33 false alarms
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-8">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">{"// ARCHIVAL RECORD: INVESTIGATION"}</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-100 font-sans">
              Chapters 2 & 3: The Silent Attrition
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs font-mono text-zinc-500 leading-relaxed">
            The database was bleeding accounts. The initial responses were based on guesswork. When we analyzed the logs, we discovered that everything we assumed was wrong.
          </p>
        </div>

        {/* Chapters grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Chapter 2 Column: The Obvious Explanations Failed */}
          <div className="lg:col-span-5 border border-zinc-800 bg-zinc-900/10 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-zinc-900 text-[8px] font-mono text-zinc-650 border-b border-l border-zinc-800 uppercase">
              CHAPTER_02_SECURE
            </div>
            
            <div className="space-y-6">
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">DOSSIER FILE A</span>
                <h3 className="text-xl font-bold uppercase text-zinc-200 tracking-tight flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-red-500/70 shrink-0" />
                  Obvious Hypotheses Failed
                </h3>
              </div>

              <div className="space-y-4 text-xs font-mono text-zinc-400 leading-relaxed">
                {/* Hypothesis 1 */}
                <div className="border-l-2 border-red-500/30 pl-3 py-1 bg-zinc-950/20">
                  <span className="text-zinc-500 block text-[9px] uppercase">HYPOTHESIS 01 // support calls escalation</span>
                  <p className="mt-1">
                    &ldquo;Customers call customer support to complain before they cancel.&rdquo;
                  </p>
                  <div className="mt-2 text-red-500/80 font-bold uppercase text-[9px] flex items-center gap-1">
                    <span>STATUS: FALSIFIED</span>
                    <span className="bg-zinc-800 text-transparent select-none text-[8px] px-1 rounded-sm">70%_LEFT_WITHOUT_CALLS</span>
                  </div>
                </div>

                {/* Hypothesis 2 */}
                <div className="border-l-2 border-red-500/30 pl-3 py-1 bg-zinc-950/20">
                  <span className="text-zinc-500 block text-[9px] uppercase">HYPOTHESIS 02 // price shocks only</span>
                  <p className="mt-1">
                    &ldquo;Only customers with sudden monthly billing spikes cut the cord.&rdquo;
                  </p>
                  <div className="mt-2 text-red-500/80 font-bold uppercase text-[9px] flex items-center gap-1">
                    <span>STATUS: FALSIFIED</span>
                    <span className="bg-zinc-800 text-transparent select-none text-[8px] px-1 rounded-sm">TENURE_DECAY_SKEWS_IT</span>
                  </div>
                </div>

                {/* Hypothesis 3 */}
                <div className="border-l-2 border-red-500/30 pl-3 py-1 bg-zinc-950/20">
                  <span className="text-zinc-500 block text-[9px] uppercase">HYPOTHESIS 03 // contract types</span>
                  <p className="mt-1">
                    &ldquo;Month-to-month contracts account for all exit events.&rdquo;
                  </p>
                  <div className="mt-2 text-red-500/80 font-bold uppercase text-[9px] flex items-center gap-1">
                    <span>STATUS: INCOMPLETE</span>
                    <span className="bg-zinc-800 text-transparent select-none text-[8px] px-1 rounded-sm">STABLE_USERS_SLIP_OUT</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[8px] text-zinc-650 pt-4 border-t border-zinc-900 uppercase tracking-wider font-mono">
              VERIFIED UNDER TELEMETRY RUN #409
            </div>
          </div>

          {/* Chapter 3 Column: Patterns Started Emerging */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block px-1">{"// CHAPTER 3: EMERGENT ANOMALIES"}</span>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Card 1: Silent Decay */}
              <motion.div 
                variants={itemVariants} 
                className="border border-zinc-850 bg-zinc-900/10 p-5 flex flex-col justify-between group hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3.5 mb-3">
                    <span className="text-xs font-mono font-bold text-zinc-400">01. THE SLOW DECAY</span>
                    <TrendingDown className="h-4 w-4 text-zinc-650 group-hover:text-red-500 transition-colors" />
                  </div>
                  <p className="text-[11px] font-mono text-zinc-450 leading-relaxed mb-4">
                    Attrition starts 90 days before the contract breaks. Engagement metrics drop in a predictable logarithmic decline before the user logs cancellation.
                  </p>
                </div>

                {/* SVG Visual representation of Churn Decay */}
                <div className="h-28 w-full border border-zinc-900 bg-zinc-950/80 p-2 relative overflow-hidden flex items-end">
                  <div className="absolute top-1.5 left-2 text-[7px] font-mono text-zinc-600">USAGE TELEMETRY</div>
                  <svg className="w-full h-16 overflow-visible" viewBox="0 0 300 80">
                    <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255, 255, 255, 0.03)" strokeDasharray="3,3" />
                    <path 
                      d="M 10 10 Q 120 15, 180 50 T 290 75" 
                      fill="none" 
                      stroke="rgba(239, 68, 68, 0.6)" 
                      strokeWidth="1.5" 
                    />
                    <path 
                      d="M 10 10 Q 120 15, 180 50 T 290 75 L 290 80 L 10 80 Z" 
                      fill="rgba(239, 68, 68, 0.015)" 
                    />
                    <circle cx="10" cy="10" r="2.5" fill="#71717a" />
                    <circle cx="180" cy="50" r="2.5" fill="#f97316" />
                    <circle cx="290" cy="75" r="3" fill="#ef4444" />
                    <text x="15" y="14" fill="#71717a" fontSize="6.5" fontFamily="monospace">Stable</text>
                    <text x="140" y="42" fill="#a1a1aa" fontSize="6.5" fontFamily="monospace">Friction Phase</text>
                    <text x="210" y="70" fill="#ef4444" fontSize="6.5" fontFamily="monospace">Exit</text>
                  </svg>
                </div>
              </motion.div>

              {/* Card 2: Cost Asymmetry */}
              <motion.div 
                variants={itemVariants} 
                className="border border-zinc-850 bg-zinc-900/10 p-5 flex flex-col justify-between group hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3.5 mb-3">
                    <span className="text-xs font-mono font-bold text-zinc-400">02. ASYMMETRICAL COST</span>
                    <Scale className="h-4 w-4 text-zinc-650 group-hover:text-zinc-400 transition-colors" />
                  </div>
                  <p className="text-[11px] font-mono text-zinc-455 leading-relaxed mb-4">
                    Errors are not equal. Letting a client escape (False Negative) costs **$80.00** in lost lifetime value. Wasting a discount (False Positive) costs **$15.00**.
                  </p>
                </div>

                {/* Asymmetry Scale Illustration */}
                <div className="h-28 w-full border border-zinc-900 bg-zinc-950/80 p-2 relative flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[7px] font-mono">
                    <div className="text-red-400/90">FALSE NEGATIVE (-$80)</div>
                    <div className="text-zinc-500">FALSE POSITIVE (-$15)</div>
                  </div>
                  
                  <div className="relative h-12 flex items-end justify-center">
                    <div className="absolute bottom-0 w-6 h-0.5 bg-zinc-800" />
                    <div className="absolute bottom-0 w-0.5 h-4 bg-zinc-800" />
                    <div className="absolute bottom-4 w-5/6 h-0.5 bg-zinc-500 origin-center transform -rotate-8 flex justify-between px-2">
                      <div className="w-5 h-5 bg-red-950/70 border border-red-850 text-red-400 flex items-center justify-center text-[8px] font-bold rounded-sm -mt-3.5 transform rotate-8">
                        LTV
                      </div>
                      <div className="w-3.5 h-3.5 bg-zinc-900 border border-zinc-800 text-zinc-450 flex items-center justify-center text-[6.5px] font-medium rounded-sm -mt-2 transform rotate-8">
                        $
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[7px] font-mono text-zinc-600">
                    Alarm skewed towards False Negatives
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Macro Drain Highlight banner */}
            <div className="border border-zinc-850 bg-zinc-900/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-6 relative">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-950/20 border border-red-900/40 text-red-500 rounded-sm">
                  <AlertOctagon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-350 font-mono">
                    The Cumulative Threat
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1 max-w-xl leading-relaxed">
                    Across our test subset, 26,763 accounts slide down the decay curve, threatening a total unmitigated drain of **$2,141,040**. Finding a predictive strategy is not an academic exercise—it is financial self-defense.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

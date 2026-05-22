"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Info, ChevronRight, UserPlus, ShieldCheck, DollarSign, CreditCard, Activity, Award, Network, Pin } from "lucide-react";

interface FeatureDetail {
  id: string;
  name: string;
  formula: string;
  importance: string;
  importanceVal: string;
  isRisk: boolean;
  rationale: string;
  snippet: string;
  icon: React.ElementType;
  annotation: string;
}

const features: FeatureDetail[] = [
  {
    id: "NewCustomer",
    name: "NewCustomer",
    formula: "tenure <= 3 months",
    importance: "+16.4% Churn Risk Correlation",
    importanceVal: "CRITICAL RISK",
    isRisk: true,
    rationale: "Early-stage attrition is severe. Customers who run into friction in their first 90 days (onboarding failure, tech setup frustration) are 4x more likely to abandon before stabilizing.",
    snippet: "df['NewCustomer'] = (df['tenure'] <= 3).astype(int)",
    icon: UserPlus,
    annotation: "Onboarding hazard: if they survive 90 days, risk drops by 60%."
  },
  {
    id: "LoyalCustomer",
    name: "LoyalCustomer",
    formula: "tenure >= 50 months",
    importance: "-24.8% Churn Risk Correlation",
    importanceVal: "HIGH INERTIA",
    isRisk: false,
    rationale: "Long-term relationships represent high baseline inertia. These users are highly stable, but remain sensitive to contract expirations or surprise out-of-contract billing rate adjustments.",
    snippet: "df['LoyalCustomer'] = (df['tenure'] >= 50).astype(int)",
    icon: Award,
    annotation: "Loyalty is fragile. Contract end date is a critical trigger."
  },
  {
    id: "TotalServices",
    name: "TotalServices",
    formula: "Count of all active add-on services",
    importance: "High Negative Correlation (Sticky Factor)",
    importanceVal: "ECOSYSTEM SHIELD",
    isRisk: false,
    rationale: "Measures ecosystem integration. A customer with phone, streaming, and data is highly locked-in. Switching providers requires multiple cancellation steps, creating friction that deters churn.",
    snippet: "service_cols = ['PhoneService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies']\ndf['TotalServices'] = (df[service_cols] == 'Yes').sum(axis=1)",
    icon: Activity,
    annotation: "High inertia. Every extra service acts as a physical anchor."
  },
  {
    id: "SecurityServices",
    name: "SecurityServices",
    formula: "Count of protection utilities",
    importance: "Strongest Churn-Reducing Signal",
    importanceVal: "PRIMARY ANCHOR",
    isRisk: false,
    rationale: "Tracks usage of critical safety nets (Backups, Tech Support, Security). When users couple their daily safety infrastructure to the network, they rarely cut the cord.",
    snippet: "security_cols = ['OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport']\ndf['SecurityServices'] = (df[security_cols] == 'Yes').sum(axis=1)",
    icon: ShieldCheck,
    annotation: "Trust anchors. Backups and security hold customers tight."
  },
  {
    id: "AvgChargesPerMonth",
    name: "AvgChargesPerMonth",
    formula: "TotalCharges / (tenure + 1)",
    importance: "Strong Pricing Sensitivity Signal",
    importanceVal: "SURCHARGE HAZARD",
    isRisk: true,
    rationale: "Captures pricing spikes. Base monthly rates miss pay-per-view, data cap overrides, and extra charges. Evaluating total lifetime spend divided by tenure flags users experiencing cost surges.",
    snippet: "df['AvgChargesPerMonth'] = df['TotalCharges'] / (df['tenure'] + 1)",
    icon: DollarSign,
    annotation: "Surcharges hurt. Base rate is fine, it's the extra fees."
  },
  {
    id: "AutoPayment",
    name: "AutoPayment",
    formula: "PaymentMethod contains 'automatic'",
    importance: "-14.2% Churn Risk Correlation",
    importanceVal: "FRICTIONLESS LOOP",
    isRisk: false,
    rationale: "Eliminates monthly transaction reminders. Manual invoice payments force users to re-evaluate their spending monthly. Automatic billing keeps the service frictionless and backgrounded.",
    snippet: "df['AutoPayment'] = df['PaymentMethod'].str.contains('automatic', case=False).astype(int)",
    icon: CreditCard,
    annotation: "Cognitive bypass. If they don't think about payment, they don't leave."
  },
  {
    id: "FiberUser",
    name: "FiberUser",
    formula: "InternetService == 'Fiber optic'",
    importance: "+18.9% Positive Correlation (High Risk)",
    importanceVal: "COMPETITOR TARGET",
    isRisk: true,
    rationale: "Surprisingly high correlation with churn. Indicates either technical issues with fiber reliability, or that fiber markets are highly saturated with competitors offering aggressive sign-up discounts.",
    snippet: "df['FiberUser'] = (df['InternetService'] == 'Fiber optic').astype(int)",
    icon: Network,
    annotation: "Aggressive conquest. Competitors are actively raiding our fiber lines."
  }
];

export default function FeatureLab() {
  const [selectedId, setSelectedId] = useState<string>("NewCustomer");

  const selectedFeature = features.find(f => f.id === selectedId) || features[0];
  const IconComponent = selectedFeature.icon;

  return (
    <section id="features" className="py-24 px-6 md:px-12 border-b border-zinc-800 bg-zinc-950 relative overflow-hidden bg-grid-dots">
      
      {/* Background visual indicators */}
      <div className="absolute top-[5%] left-[20%] w-px h-full bg-gradient-to-b from-zinc-850/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-red-950/5 blur-3xl pointer-events-none" />

      {/* Decorative Board Tape */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-zinc-800/10 border-x border-zinc-700/25 rotate-1 select-none pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-850 pb-8">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">{"// LABORATORY LOGS: METRIC RE-CONSTRUCTION"}</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-100 font-sans">
              Chapter 4: What We Learned About Leaving
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs font-mono text-zinc-500 leading-relaxed">
            Raw columns revealed nothing. Churn looked uniform across standard variables. It was only when we engineered behavioral indicators—tracking contract friction, service clusters, and billing shocks—that the correlation patterns broke through.
          </p>
        </div>

        {/* Evidence Board Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Index Cards Selection */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2 px-1">
              RECOVERED BEHAVIORAL INDICES
            </span>
            
            <div className="space-y-3 max-h-[520px] pr-2 overflow-y-auto custom-scrollbar">
              {features.map((feat, index) => {
                const isSelected = feat.id === selectedId;
                const FeatIcon = feat.icon;
                
                // Deterministic rotation style for brutalist index card effect
                const rotation = index % 3 === 0 ? "rotate-[0.5deg]" : index % 3 === 1 ? "-rotate-[0.8deg]" : "rotate-[-0.3deg]";
                
                return (
                  <button
                    key={feat.id}
                    onClick={() => setSelectedId(feat.id)}
                    className={`w-full text-left p-4 border transition-all duration-200 relative group flex items-start justify-between cursor-pointer ${rotation} ${
                      isSelected
                        ? "border-zinc-200 bg-zinc-900 shadow-[2px_4px_16px_rgba(255,255,255,0.05)] text-zinc-100"
                        : "border-zinc-850 bg-zinc-950/40 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                    }`}
                  >
                    {/* Tiny visual pin on selected index card */}
                    {isSelected && (
                      <div className="absolute -top-1.5 left-6 text-red-500/80">
                        <Pin className="h-3 w-3 fill-red-500/50 transform rotate-45" />
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <FeatIcon className={`h-4.5 w-4.5 ${isSelected ? "text-red-500/80" : "text-zinc-600 group-hover:text-zinc-500"}`} />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold flex items-center gap-1.5">
                          {feat.name}
                          <span className="text-[8px] font-mono text-zinc-600 font-normal">
                            #{index + 1}
                          </span>
                        </div>
                        <span className="font-mono text-[9px] text-zinc-555 block mt-0.5 font-bold">
                          {feat.formula}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0 self-center">
                      <span className={`text-[7px] font-mono px-1 py-0.5 border font-semibold ${
                        feat.isRisk 
                          ? "border-red-950/40 bg-red-950/20 text-red-400" 
                          : "border-emerald-950/40 bg-emerald-950/20 text-emerald-400"
                      }`}>
                        {feat.importanceVal}
                      </span>
                      <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-200 ${isSelected ? "translate-x-0.5 text-zinc-100" : "opacity-0 group-hover:opacity-100 text-zinc-500"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Technical Dossier Sheet */}
          <div className="lg:col-span-7 relative min-h-[500px]">
            {/* Paper Clip SVG Graphic */}
            <div className="absolute top-2 right-12 z-20 select-none pointer-events-none hidden md:block">
              <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
                <path d="M12 25 L12 52 A8 8 0 0 0 28 52 L28 16 A12 12 0 0 0 4 16 L4 46" stroke="rgba(113, 113, 122, 0.4)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 15, rotate: -0.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full border border-zinc-800 bg-zinc-900/10 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-xs"
              >
                {/* Dossier Watermark */}
                <div className="absolute bottom-6 right-6 text-[8px] font-mono text-zinc-800 pointer-events-none select-none tracking-widest uppercase">
                  CLASSIFIED TELECOM ARCHIVE // SUB_DIV_9
                </div>

                <div className="space-y-6">
                  {/* Title card */}
                  <div className="flex items-start gap-4 border-b border-zinc-900 pb-5">
                    <div className="p-3 bg-zinc-950 border border-zinc-850 text-zinc-200">
                      <IconComponent className="h-6 w-6 text-red-500/80" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                          FIELD INVESTIGATION RECORD: {selectedFeature.id}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black uppercase text-zinc-100 font-sans tracking-tight mt-0.5">
                        {selectedFeature.name}
                      </h3>
                    </div>
                  </div>

                  {/* Math and Coefficient columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
                        <Info className="h-3 w-3" /> FORMULATION LOGIC
                      </span>
                      <div className="p-3 bg-zinc-950/70 border border-zinc-900 text-xs font-mono text-zinc-350 font-bold rounded-xs">
                        {selectedFeature.formula}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
                        <Activity className="h-3 w-3" /> MEASURED ATTRITION VALUE
                      </span>
                      <div className="p-3 bg-zinc-950/70 border border-zinc-900 text-xs font-mono rounded-xs">
                        <span className={selectedFeature.isRisk ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                          {selectedFeature.importance}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rationale and Interpretation */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                      BEHAVIORAL INTERPRETATION & ANOMALIES
                    </span>
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-mono">
                      {selectedFeature.rationale} <span className="bg-zinc-800 text-transparent select-none px-1.5 rounded-sm text-xs">REDACTED_SUB_PARAGRAPH_9921_E</span>
                    </p>
                  </div>

                  {/* Code box */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
                      <Code className="h-3.5 w-3.5" /> RECONSTRUCTED PIPELINE (PYTHON)
                    </span>
                    <div className="p-4 bg-zinc-950 border border-zinc-900 text-zinc-300 rounded-sm font-mono text-[11px] overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar">
                      {selectedFeature.snippet}
                    </div>
                  </div>
                </div>

                {/* Marginal note overlay in handwriting */}
                <div className="mt-8 pt-4 border-t border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
                  <div className="text-[10px] font-mono text-zinc-600">
                    <div>STATUS: FEATURE_CALIBRATED</div>
                    <div className="mt-0.5">CHURN_SIGMA_DELTA = 1.43</div>
                  </div>
                  
                  {/* Dynamic handwritten red sticky note element */}
                  <div className="font-handwriting text-lg text-red-500/90 md:max-w-xs leading-none transform -rotate-1 select-none py-1 px-3 border border-red-500/20 bg-red-950/5 rounded-xs">
                    &ldquo;{selectedFeature.annotation}&rdquo;
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

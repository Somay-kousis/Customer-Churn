"use client";

import { BookOpen, FileText, Database, Code, ArrowUpRight } from "lucide-react";

interface RepoLink {
  title: string;
  desc: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const links: RepoLink[] = [
  {
    title: "Reconstructed Codebase",
    desc: "Production model training pipelines, feature transformers, and local dev environments.",
    url: "https://github.com/Somay-kousis/Customer-Churn",
    icon: Code,
    label: "DOSSIER // SRC_CODE"
  },
  {
    title: "Investigator Notebook",
    desc: "Exploratory analysis, hyperparameter trials, and threshold curves plotted in Jupyter.",
    url: "https://github.com/Somay-kousis/Customer-Churn/blob/main/project.ipynb",
    icon: FileText,
    label: "DOCKET // NOTEBOOK"
  },
  {
    title: "Raw Subscriber Logs",
    desc: "CSV records containing 118,839 validation slices used to reconstruct customer patterns.",
    url: "https://www.kaggle.com/datasets/blastchar/telco-customer-churn",
    icon: Database,
    label: "DATA // RAW_CSV"
  },
  {
    title: "Forensic Case Report",
    desc: "Technical README and mathematical breakdown of parameter optimization details.",
    url: "https://github.com/Somay-kousis/Customer-Churn/blob/main/README.md",
    icon: BookOpen,
    label: "REPORTS // README.md"
  }
];

export default function Links() {
  return (
    <section className="py-24 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden bg-grid-dots">
      
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-red-950/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-8">
          <div>
            <span className="text-[10px] font-mono text-zinc-555 uppercase tracking-widest block mb-2">{"// EVIDENCE DOSSIER INDEX"}</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-200 font-sans">
              Archival Evidence Index
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-sm text-xs font-mono text-zinc-550 leading-relaxed">
            Access the technical foundation, raw datasets, and Jupyter execution logs compiled during this investigation.
          </p>
        </div>

        {/* Links Grid - Styled as indexed folders in a drawer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, index) => {
            const LinkIcon = link.icon;
            // Alternating rotations to resemble scattered paper folders
            const angle = index % 2 === 0 ? "rotate-[-0.6deg]" : "rotate-[0.4deg]";
            return (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group border border-zinc-850 bg-zinc-900/10 p-6 flex flex-col justify-between h-48 hover:border-zinc-700 transition-all font-mono relative overflow-hidden ${angle}`}
              >
                {/* Physical index card tab look at the top */}
                <div className="absolute top-0 right-0 px-2 py-0.5 bg-zinc-900 text-[8px] text-zinc-500 border-b border-l border-zinc-850 uppercase font-black">
                  {link.label}
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-zinc-950 border border-zinc-850 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      <LinkIcon className="h-4.5 w-4.5 text-red-500/80" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-zinc-700 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wide group-hover:text-zinc-100 transition-colors">
                      {link.title}
                    </h4>
                    <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                </div>

                {/* Simulated file verification status */}
                <div className="text-[7.5px] text-zinc-600 pt-3 border-t border-zinc-950 uppercase flex justify-between items-center">
                  <span>FILE_VERIFIED_SECURE</span>
                  <span className="font-handwriting text-red-500/70 text-sm">*recovered</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="pt-16 text-center text-[9px] font-mono text-zinc-750 tracking-widest flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-zinc-900/40">
          <span>INVESTIGATION COMPLETED BY INTERNAL DIVISION // AGENT ANTIGRAVITY</span>
          <span className="uppercase text-[8px]">Project Silent_Exit // Telemetry subset 409</span>
        </div>

      </div>
    </section>
  );
}

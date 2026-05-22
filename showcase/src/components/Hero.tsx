"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Activity, ShieldAlert } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState<"scan" | "raw">("scan");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "DECRYPTING ARCHIVE SECTORS...",
    "RECOVERED TELEMETRY: 118,839 SUBSCRIBER PATHWAYS",
    "BEHAVIORAL MARKS DETECTED: 7 KEY SIGNALS",
    "ALGORITHM: GRADIENT ENSEMBLE CLASSIFICATION",
    "STATUS: DECLASSIFIED"
  ]);

  useEffect(() => {
    const logs = [
      "SCANNING TENURE BUCKETS...",
      "CORRELATING FIBER FRICTION SIGNALS...",
      "TRACKING MANUAL BILLING ANOMALIES...",
      "ESTIMATING MONTHLY PRICE SHOCK LIMITS...",
      "DECAY RISK WAVES MEASURED",
      "CORRELATION SIGNAL DETECTED: SHALLOW TREES WIN",
      "ALERT: MODEL ASYMMETRY ALIGNING...",
      "RECOVERING RECORD FRAGMENTS...",
    ];

    const timer = setInterval(() => {
      setTerminalLogs(prev => {
        const next = [...prev.slice(1), logs[Math.floor(Math.random() * logs.length)]];
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Distribution properties
    const meanActive = width * 0.35;
    const stdDevActive = width * 0.12;
    const meanChurn = width * 0.65;
    const stdDevChurn = width * 0.15;

    let time = 0;

    const drawPDF = (mean: number, stdDev: number, color: string, fillStyle: string, timeOffset: number) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;

      const points: [number, number][] = [];
      const noiseAmp = 8;

      for (let x = 0; x < width; x += 3) {
        // Gaussian probability distribution formula: 1 / (s * sqrt(2pi)) * e^(-(x-m)^2 / (2s^2))
        const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
        const amplitude = height * 0.45;
        // Dynamic noise representing uncertainty
        const noise = Math.sin(x * 0.025 + time * 2 + timeOffset) * Math.cos(x * 0.01 - time) * noiseAmp * (x / width);
        
        let y = height * 0.85 - amplitude * Math.exp(exponent) + noise;

        // Keep it above floor
        if (y > height * 0.9) y = height * 0.9;
        if (y < height * 0.1) y = height * 0.1;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        points.push([x, y]);
      }

      ctx.stroke();

      // Draw vertical fill
      ctx.lineTo(width, height * 0.9);
      ctx.lineTo(0, height * 0.9);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.006;

      // Draw background horizontal grid lines (brutalist vibe)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const numLines = 8;
      for (let i = 1; i < numLines; i++) {
        const y = (height / numLines) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Overlapping curves
      // Curve 1: Active Users (Muted Gray, left-leaning)
      drawPDF(meanActive, stdDevActive, "rgba(113, 113, 122, 0.3)", "rgba(113, 113, 122, 0.02)", 0);

      // Curve 2: Churners (Subtle amber/warning border, right-leaning)
      drawPDF(meanChurn, stdDevChurn, "rgba(239, 68, 68, 0.45)", "rgba(239, 68, 68, 0.03)", Math.PI);

      // Draw decision cutoff threshold line (dynamic hover marker)
      const scanX = width * (0.35 + Math.sin(time * 0.5) * 0.05);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(239, 68, 68, 0.25)";
      ctx.setLineDash([5, 5]);
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, height * 0.9);
      ctx.stroke();
      ctx.setLineDash([]);

      // Cutoff label
      ctx.fillStyle = "rgba(239, 68, 68, 0.6)";
      ctx.font = "9px monospace";
      ctx.fillText(`RISK THRESHOLD CALIBRATOR: ${(scanX / width).toFixed(2)}`, scanX + 8, 40);

      // Draw bottom baseline
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.moveTo(0, height * 0.9);
      ctx.lineTo(width, height * 0.9);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between border-b border-zinc-800 bg-zinc-950 overflow-hidden">
      
      {/* Dynamic Handwriting Annotations in the Margins */}
      <div className="absolute top-[28%] right-[8%] font-handwriting text-2xl text-red-500/80 -rotate-6 select-none z-20 pointer-events-none hidden lg:block leading-tight text-right">
        &ldquo;They don&apos;t tell us they&apos;re leaving.<br />
        They just quietly fade.&rdquo;
      </div>

      <div className="absolute bottom-[20%] left-[6%] font-handwriting text-lg text-zinc-500/60 rotate-2 select-none z-20 pointer-events-none hidden md:block max-w-xs leading-tight">
        *118,839 validation subscriber files.<br />
        The pattern is buried in the records.
      </div>

      {/* Top Technical Metadata Banner */}
      <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 px-6 py-3 text-[10px] font-mono tracking-widest text-zinc-500 bg-zinc-950 z-20">
        <div className="flex items-center gap-3">
          <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>RECOVERED INTERNAL TELEMETRY LOGS // RESEARCH DIVISION</span>
        </div>
        <div className="flex items-center gap-6">
          <span>CASE REF: TELECOM_CORP_409</span>
          <span className="hidden sm:inline text-zinc-650">DEGRADE_INDEX_V3.9</span>
          <span className="text-zinc-400 uppercase">CLASSIFIED // EYES ONLY</span>
        </div>
      </div>

      {/* Probability Graph Canvas Background */}
      <div className="absolute inset-0 top-[40px] bottom-[150px] opacity-75 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Main Brutalist Hero Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 items-stretch z-10 relative">
        {/* Left Side: Heavy Poetic Quote & Branding */}
        <div className="lg:col-span-8 flex flex-col justify-center px-6 md:px-12 py-12 border-r lg:border-zinc-800">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-zinc-800 bg-zinc-900/50 text-[10px] font-mono text-zinc-400">
              <span>CHAPTER 1</span>
              <span className="text-zinc-600">|</span>
              <span className="bg-zinc-800 text-transparent select-none px-1 rounded-sm">CLASSIFIED_SECURE</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-zinc-100 font-sans uppercase leading-none max-w-4xl">
              trying to predict when users are <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-red-500/80">
                emotionally preparing
              </span>{" "}
              to disappear.
            </h1>

            <p className="max-w-xl text-sm md:text-base text-zinc-400 font-mono leading-relaxed">
              This is not a standard business dashboard. It is a log of recovery. We spent months investigating why customer relationships quietly decay. This is the timeline of what we uncovered.
            </p>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#playground"
              className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-mono text-xs font-bold uppercase transition-all duration-200 tracking-wider flex items-center gap-2 border border-zinc-300"
            >
              <span>Examine risk dial</span>
              <Activity className="h-4.5 w-4.5" />
            </a>
            <a
              href="#problem"
              className="px-6 py-3 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 text-zinc-300 font-mono text-xs uppercase transition-all duration-200 tracking-wider flex items-center gap-2"
            >
              <span>Read the evidence file</span>
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Right Side: Active Terminal dossier view */}
        <div className="lg:col-span-4 bg-zinc-950/70 backdrop-blur-sm flex flex-col justify-between p-6 md:p-8 border-t lg:border-t-0 border-zinc-800 font-mono">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-bold tracking-wider text-zinc-300 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-500/80 animate-pulse" />
                DECRYPTION_STREAM
              </span>
              <div className="flex border border-zinc-800 text-[9px]">
                <button
                  onClick={() => setActiveTab("scan")}
                  className={`px-2 py-0.5 ${activeTab === "scan" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500"}`}
                >
                  DECRYPT_FEED
                </button>
                <button
                  onClick={() => setActiveTab("raw")}
                  className={`px-2 py-0.5 ${activeTab === "raw" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500"}`}
                >
                  CASE_METADATA
                </button>
              </div>
            </div>

            {activeTab === "scan" ? (
              <div className="space-y-2.5 text-[10px] sm:text-xs">
                {terminalLogs.map((log, i) => (
                  <motion.div
                    key={log + i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2 text-zinc-400"
                  >
                    <span className="text-zinc-655">[{i + 1}]</span>
                    <span className={log.includes("ALERT") || log.includes("STATUS:") || log.includes("STATUS: DECLASSIFIED") ? "text-red-400/80" : ""}>
                      {log}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 text-[11px] text-zinc-500">
                <div>
                  <span className="text-zinc-400 block font-bold">RECOVERED_SLICES</span>
                  <span>118,839 account paths</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-bold">ANALYSIS_METRICS</span>
                  <span>ROC-AUC Confidence: 0.9176 | F1: 0.703</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-bold">ECONOMIC_ASSESSMENT</span>
                  <span>Offer Incentive: $15.00</span>
                  <br />
                  <span>Unmitigated Loss: $80.00 / account</span>
                </div>
                <div className="pt-2 border-t border-zinc-900">
                  <span className="text-zinc-400 block font-bold">DECISION_BLUEPRINT</span>
                  <span>Gradient boost depth = 3 (shallow limits)</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-650">
            <span>DECRYPT RUN v1.0.3</span>
            <span>PORT_3000 // READY</span>
          </div>
        </div>
      </div>

      {/* Bottom ticker banner */}
      <div className="border-t border-zinc-800 bg-zinc-900/30 px-6 py-4 flex flex-wrap gap-y-4 gap-x-12 text-xs font-mono text-zinc-400 z-10">
        <div>
          <span className="text-zinc-600">THEORY TYPE:</span> XGBoost Decision Trees
        </div>
        <div>
          <span className="text-zinc-600">RECOGNITION POWER:</span> ROC-AUC 0.9176
        </div>
        <div>
          <span className="text-zinc-600">EVALUATION CUTOFF:</span> t = 0.30
        </div>
        <div className="ml-auto text-zinc-650 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span>INTERNAL RESEARCH DECLASSIFIED</span>
        </div>
      </div>
    </section>
  );
}

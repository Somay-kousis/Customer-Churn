import Hero from "../components/Hero";
import Problem from "../components/Problem";
import FeatureLab from "../components/FeatureLab";
import Leaderboard from "../components/Leaderboard";
import ThresholdPlayground from "../components/ThresholdPlayground";
import Insights from "../components/Insights";
import FinalModel from "../components/FinalModel";
import Links from "../components/Links";

export const metadata = {
  title: "Customer Churn Risk Analysis // An Investigative ML Case Study",
  description: "A brutalist, interactive showcase detailing customer churn prediction. Explore hyperparameter tuning, feature engineering, and the economics of the threshold playground.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-red-500 selection:text-white antialiased">
      {/* Structural Scanline Grid Line decorative overlay (global background accents) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-30 opacity-40" />

      {/* Main Single Page Document Flow */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero: The Hook */}
        <Hero />

        {/* 2. Problem: Why Churn Matters */}
        <Problem />

        {/* 3. Feature Engineering Lab */}
        <FeatureLab />

        {/* 4. Model Experiments Leaderboard */}
        <Leaderboard />

        {/* 5. Threshold Playground (Centerpiece Simulator) */}
        <ThresholdPlayground />

        {/* 6. Insights & Observations */}
        <Insights />

        {/* 7. Champion Model Spec Card */}
        <FinalModel />

        {/* 8. Repository File Indexes & Documentation Links */}
        <Links />
      </main>
    </div>
  );
}

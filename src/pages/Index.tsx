import { useState } from "react";
import Hero from "@/components/Hero";
import PredictionForm from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import Features from "@/components/Features";
import Roadmap from "@/components/Roadmap";
import { useToast } from "@/hooks/use-toast";

interface PatientData {
  age: string;
  sex: string;
  bloodPressure: string;
  cholesterol: string;
  dosage: string;
  sideEffects: string;
}

interface PredictionState {
  outcome: number;
  confidence: number;
}

const Index = () => {
  const [prediction, setPrediction] = useState<PredictionState | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const scrollToPrediction = () => {
    const element = document.getElementById("prediction");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const runPrediction = (data: PatientData) => {
    setIsLoading(true);
    setPatientData(data);
    
    // Simulate ML prediction (in production, this would call an API)
    setTimeout(() => {
      // Simple heuristic for demo: favorable outcome if younger, lower BP, no side effects
      const favorableFactors = 
        (Number(data.age) < 60 ? 1 : 0) +
        (Number(data.bloodPressure) < 140 ? 1 : 0) +
        (Number(data.cholesterol) < 240 ? 1 : 0) +
        (data.sideEffects === "0" ? 1 : 0);
      
      const outcome = favorableFactors >= 2 ? 1 : 0;
      const confidence = 65 + Math.floor(Math.random() * 25); // 65-90%
      
      setPrediction({ outcome, confidence });
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: `Outcome: ${outcome === 1 ? "Positive" : "Negative"} Response (${confidence}% confidence)`,
      });
      
      // Scroll to results
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    }, 2000);
  };

  const resetPrediction = () => {
    setPrediction(null);
    scrollToPrediction();
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={scrollToPrediction} />
      <Features />
      <PredictionForm onPredict={runPrediction} isLoading={isLoading} />
      {prediction && patientData && (
        <PredictionResult 
          outcome={prediction.outcome} 
          confidence={prediction.confidence}
          patientData={patientData}
          onReset={resetPrediction}
        />
      )}
      <Roadmap />
      
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p className="mb-2">
            <span className="font-semibold text-foreground">Bio-Tester</span> — Predictive Intelligence for Clinical Trials
          </p>
          <p>Demo application. Not for clinical use. © 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

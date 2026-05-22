import { useState } from "react";
import { CheckCircle2, XCircle, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import ExportDialog from "./ExportDialog";

interface PatientData {
  age: string;
  sex: string;
  bloodPressure: string;
  cholesterol: string;
  dosage: string;
  sideEffects: string;
}

interface PredictionResultProps {
  outcome: number;
  confidence: number;
  patientData: PatientData;
  onReset: () => void;
}

const PredictionResult = ({ outcome, confidence, patientData, onReset }: PredictionResultProps) => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const isPositive = outcome === 1;
  
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className={`border-2 shadow-2xl ${isPositive ? 'border-accent bg-accent/5' : 'border-destructive bg-destructive/5'} animate-in fade-in zoom-in duration-500`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {isPositive ? (
                <CheckCircle2 className="w-20 h-20 text-accent animate-in zoom-in duration-700" />
              ) : (
                <XCircle className="w-20 h-20 text-destructive animate-in zoom-in duration-700" />
              )}
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">
              {isPositive ? "Positive Response Predicted" : "Negative Response Predicted"}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {isPositive 
                ? "The model predicts a favorable treatment outcome for this patient profile"
                : "The model predicts an unfavorable treatment outcome for this patient profile"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Prediction Confidence</span>
                </div>
                <span className="text-2xl font-bold text-primary">{confidence}%</span>
              </div>
              <Progress value={confidence} className="h-3" />
              <p className="text-sm text-muted-foreground mt-3">
                Based on clinical trial data patterns and patient biomarkers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Outcome</span>
                </div>
                <p className="text-2xl font-bold">
                  {isPositive ? "Success" : "At Risk"}
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Model</span>
                </div>
                <p className="text-lg font-semibold">Logistic Regression</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-sm">Clinical Interpretation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isPositive 
                  ? "This patient profile shows characteristics associated with positive treatment response. Consider proceeding with treatment protocol while monitoring for side effects."
                  : "This patient profile shows characteristics associated with treatment resistance. Consider alternative therapeutic approaches or modified dosing protocols."}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={onReset} variant="outline" className="flex-1">
                New Prediction
              </Button>
              <Button onClick={() => setExportDialogOpen(true)} variant="hero" className="flex-1">
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <ExportDialog
          open={exportDialogOpen}
          onOpenChange={setExportDialogOpen}
          outcome={outcome}
          confidence={confidence}
          patientData={patientData}
        />
      </div>
    </section>
  );
};

export default PredictionResult;

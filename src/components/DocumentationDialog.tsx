import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateDocumentationPDF } from "@/lib/documentationGenerator";

interface DocumentationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DocumentationDialog = ({ open, onOpenChange }: DocumentationDialogProps) => {
  const handleDownloadPDF = () => {
    generateDocumentationPDF();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Bio-Tester Software Documentation</span>
            <Button onClick={handleDownloadPDF} size="sm" className="ml-4">
              <FileText className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </DialogTitle>
          <DialogDescription>
            Version 1.0 (MVP Release) | November 2025
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6 text-sm">
            {/* Header Info */}
            <div className="border-b pb-4">
              <p className="text-muted-foreground">
                <strong>Developer:</strong> Dave Eko & Team
              </p>
              <p className="text-muted-foreground">
                <strong>Organization:</strong> Trinary tree.inc
              </p>
              <p className="text-muted-foreground">
                <strong>Project Type:</strong> Machine Learning-based Drug Trial Outcome Prediction System
              </p>
              <p className="text-muted-foreground">
                <strong>Status:</strong> MVP Prototype
              </p>
            </div>

            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">1. 🧑‍💻 User Documentation</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">1.1 Overview</h3>
              <p className="text-muted-foreground">
                <strong>Bio-Tester</strong> is an AI-powered tool that predicts whether a patient will respond 
                positively or negatively to a drug during a clinical trial. It uses machine learning to analyze 
                clinical features like age, blood pressure, cholesterol, dosage, and side effects.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2">1.2 Key Features</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Predicts patient drug trial outcomes</li>
                <li>Simple input interface for clinicians</li>
                <li>Provides accuracy reports and model confidence</li>
                <li>Lightweight and easy to deploy locally</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">1.3 System Requirements</h3>
              <div className="bg-muted p-3 rounded-md">
                <p><strong>OS:</strong> Windows 10+, macOS, or Linux</p>
                <p><strong>Python:</strong> Version 3.8 or higher</p>
                <p><strong>RAM:</strong> 4GB minimum</p>
                <p><strong>Storage:</strong> 500MB free space</p>
              </div>

              <h3 className="text-lg font-semibold mt-4 mb-2">1.4 How to Use</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                <li>Enter patient data (age, sex, blood pressure, cholesterol, dosage, side effects)</li>
                <li>Click <strong>Predict Outcome</strong></li>
                <li>View the predicted result: 1 = Positive Response, 0 = Negative Response</li>
              </ol>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">2. ⚙️ Technical Documentation</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">2.1 Architecture Overview</h3>
              <p className="text-muted-foreground mb-2"><strong>System Components:</strong></p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Frontend:</strong> Web form for data entry</li>
                <li><strong>Backend:</strong> Python/Flask API managing data and ML predictions</li>
                <li><strong>Machine Learning Engine:</strong> Logistic Regression model (MVP)</li>
                <li><strong>Database (optional):</strong> For storing past predictions</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">2.2 Model Pipeline</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                <li><strong>Data Preprocessing:</strong> Missing value handling, categorical encoding, normalization</li>
                <li><strong>Training:</strong> Logistic Regression with 80/20 train-test split</li>
                <li><strong>Evaluation:</strong> Accuracy, precision, recall, and F1 score</li>
                <li><strong>Prediction:</strong> Returns binary output (0 or 1)</li>
              </ol>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">3. ⚡ Installation and Setup Guide</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">3.1 Prerequisites</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Python 3.8+</li>
                <li>pip installed</li>
                <li>Git (optional for cloning repo)</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">3.2 Steps</h3>
              <div className="bg-muted p-3 rounded-md font-mono text-xs">
                <p># Install dependencies</p>
                <p>pip install -r requirements.txt</p>
                <p className="mt-2"># Run training script</p>
                <p>python train_model.py</p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">4. 🌐 API Documentation</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Endpoint: /predict</h3>
              <div className="bg-muted p-3 rounded-md">
                <p><strong>Method:</strong> POST</p>
                <p><strong>Description:</strong> Predicts the drug response for a given patient</p>
                <p className="mt-2"><strong>Request Body:</strong></p>
                <pre className="text-xs mt-1">
{`{
  "age": 55,
  "sex": 1,
  "blood_pressure": 130,
  "cholesterol": 220,
  "dosage": 10,
  "side_effects": 0
}`}
                </pre>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">5. 📝 Data Model</h2>
              
              <div className="bg-muted p-3 rounded-md">
                <p><strong>Age:</strong> Integer (e.g., 55 years)</p>
                <p><strong>Sex:</strong> Binary (1=Male, 0=Female)</p>
                <p><strong>Blood Pressure:</strong> Float (e.g., 130.0 mmHg)</p>
                <p><strong>Cholesterol:</strong> Float (e.g., 220.0 mg/dL)</p>
                <p><strong>Dosage:</strong> Float (e.g., 10.0 mg)</p>
                <p><strong>Side Effects:</strong> Binary (1=Yes, 0=No)</p>
                <p><strong>Outcome:</strong> Binary (1=Positive, 0=Negative)</p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">6. 🔐 Security Documentation</h2>
              
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Patient data anonymized before use</li>
                <li>Model outputs encrypted for secure storage</li>
                <li>Access control implemented for API endpoints</li>
                <li>Compliance targets: HIPAA, GDPR</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">7. 🔍 Troubleshooting and FAQs</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Why is prediction accuracy low?</p>
                  <p className="text-muted-foreground">The dataset is too small — gather more samples.</p>
                </div>
                <div>
                  <p className="font-semibold">Can I add new patient features?</p>
                  <p className="text-muted-foreground">Yes, update the dataset and retrain the model.</p>
                </div>
                <div>
                  <p className="font-semibold">Does it work offline?</p>
                  <p className="text-muted-foreground">Yes, CLI mode works locally without internet.</p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">8. 🧾 Version Control and Change Logs</h2>
              
              <div className="bg-muted p-3 rounded-md">
                <p><strong>Version 1.0</strong> (Nov 2025): MVP with Logistic Regression</p>
                <p><strong>Version 1.5</strong> (Upcoming): Web dashboard, SHAP explainability</p>
                <p><strong>Version 2.0</strong> (Planned): EHR Integration, Deep Learning support</p>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t pt-4 text-center">
              <p className="text-primary font-semibold">
                Bio-Tester — Smarter, Faster, Safer Drug Trials through Predictive Intelligence
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentationDialog;

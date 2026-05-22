import { jsPDF } from "jspdf";

export const generateDocumentationPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  const addNewPageIfNeeded = (requiredSpace: number = 10) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  const addText = (text: string, fontSize: number, color: number[], bold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxWidth);
    
    lines.forEach((line: string) => {
      addNewPageIfNeeded(fontSize * 0.5);
      doc.text(line, margin, yPosition);
      yPosition += fontSize * 0.5;
    });
  };

  // Header
  doc.setFontSize(24);
  doc.setTextColor(14, 165, 233);
  doc.text("Bio-Tester Software Documentation", pageWidth / 2, yPosition, { align: "center" });
  yPosition += 12;

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Version: 1.0 (MVP Release) | November 2025", pageWidth / 2, yPosition, { align: "center" });
  yPosition += 8;
  doc.text("Developer: Dave Eko & Team | Organization: Trinary tree.inc", pageWidth / 2, yPosition, { align: "center" });
  yPosition += 15;

  // Content sections
  const sections = [
    {
      title: "1. User Documentation",
      subsections: [
        {
          title: "1.1 Overview",
          content: "Bio-Tester is an AI-powered tool that predicts whether a patient will respond positively or negatively to a drug during a clinical trial. It uses machine learning to analyze clinical features like age, blood pressure, cholesterol, dosage, and side effects."
        },
        {
          title: "1.2 Key Features",
          content: "• Predicts patient drug trial outcomes\n• Simple input interface for clinicians\n• Provides accuracy reports and model confidence\n• Lightweight and easy to deploy locally"
        },
        {
          title: "1.3 System Requirements",
          content: "OS: Windows 10+, macOS, or Linux\nPython: Version 3.8 or higher\nRAM: 4GB minimum\nStorage: 500MB free space"
        }
      ]
    },
    {
      title: "2. Technical Documentation",
      subsections: [
        {
          title: "2.1 Architecture Overview",
          content: "System Components:\n• Frontend: Web form for data entry\n• Backend: Python/Flask API managing data and ML predictions\n• Machine Learning Engine: Logistic Regression model (MVP)\n• Database (optional): For storing past predictions"
        },
        {
          title: "2.2 Model Pipeline",
          content: "1. Data Preprocessing: Missing value handling, categorical encoding, normalization\n2. Training: Logistic Regression with 80/20 train-test split\n3. Evaluation: Accuracy, precision, recall, and F1 score\n4. Prediction: Returns binary output (0 or 1)"
        }
      ]
    },
    {
      title: "3. Installation and Setup Guide",
      subsections: [
        {
          title: "3.1 Prerequisites",
          content: "• Python 3.8+\n• pip installed\n• Git (optional for cloning repo)"
        },
        {
          title: "3.2 Steps",
          content: "1. Install Python dependencies: pip install -r requirements.txt\n2. Run training script to generate model: python train_model.py\n3. Launch CLI or web app to begin predictions"
        }
      ]
    },
    {
      title: "4. API Documentation",
      subsections: [
        {
          title: "Endpoint: /predict",
          content: "Method: POST\nDescription: Predicts the drug response for a given patient.\n\nRequest Body: age, sex, blood_pressure, cholesterol, dosage, side_effects\nResponse: predicted_outcome (0 or 1), message"
        }
      ]
    },
    {
      title: "5. Data Model",
      subsections: [
        {
          title: "Patient Features",
          content: "Age: Integer (e.g., 55)\nSex: Binary (1=Male, 0=Female)\nBlood Pressure: Float (e.g., 130.0 mmHg)\nCholesterol: Float (e.g., 220.0 mg/dL)\nDosage: Float (e.g., 10.0 mg)\nSide Effects: Binary (1=Yes, 0=No)\nOutcome: Binary (1=Positive, 0=Negative)"
        }
      ]
    },
    {
      title: "6. Security & Compliance",
      subsections: [
        {
          title: "Security Measures",
          content: "• Patient data anonymized before use\n• Model outputs encrypted for secure storage\n• Access control implemented for API endpoints\n• Compliance targets: HIPAA, GDPR"
        }
      ]
    },
    {
      title: "7. Troubleshooting",
      subsections: [
        {
          title: "Common Issues",
          content: "Low Accuracy: The dataset may be too small—gather more samples\nMissing Dependencies: Run pip install -r requirements.txt\nModel Not Loading: Verify model file location"
        }
      ]
    }
  ];

  sections.forEach((section) => {
    addNewPageIfNeeded(20);
    addText(section.title, 16, [14, 165, 233]);
    yPosition += 5;

    section.subsections.forEach((subsection) => {
      addNewPageIfNeeded(15);
      addText(subsection.title, 12, [0, 0, 0], true);
      yPosition += 3;
      addText(subsection.content, 10, [60, 60, 60]);
      yPosition += 5;
    });
  });

  // Footer
  addNewPageIfNeeded(20);
  yPosition = pageHeight - 15;
  doc.setFontSize(12);
  doc.setTextColor(14, 165, 233);
  doc.text("Bio-Tester — Predictive Intelligence for Clinical Trials", pageWidth / 2, yPosition, { align: "center" });

  doc.save(`bio-tester-documentation-${Date.now()}.pdf`);
};

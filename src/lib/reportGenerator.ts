import { jsPDF } from "jspdf";
import { Document, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType } from "docx";
import * as XLSX from "xlsx";

interface PatientData {
  age: string;
  sex: string;
  bloodPressure: string;
  cholesterol: string;
  dosage: string;
  sideEffects: string;
}

interface PredictionData {
  outcome: number;
  confidence: number;
  patientData: PatientData;
}

const getFormattedDate = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return `${dateStr} at ${timeStr}`;
};

const getSexLabel = (sex: string) => sex === "1" ? "Male" : "Female";
const getSideEffectsLabel = (effects: string) => effects === "1" ? "Yes" : "No";
const getOutcomeLabel = (outcome: number) => outcome === 1 ? "Positive Response" : "Negative Response";

export const generatePDFReport = (data: PredictionData) => {
  const doc = new jsPDF();
  const isPositive = data.outcome === 1;
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(14, 165, 233);
  doc.text("Bio-Tester Clinical Trial Report", 105, 20, { align: "center" });
  
  // Subtitle
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${getFormattedDate()}`, 105, 28, { align: "center" });
  
  // Prediction Summary
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Prediction Summary", 20, 45);
  
  doc.setFontSize(11);
  const outcomeColor = isPositive ? [34, 197, 94] : [239, 68, 68];
  doc.setTextColor(outcomeColor[0], outcomeColor[1], outcomeColor[2]);
  doc.text(`Outcome: ${getOutcomeLabel(data.outcome)}`, 20, 55);
  
  doc.setTextColor(14, 165, 233);
  doc.text(`Confidence Level: ${data.confidence}%`, 20, 63);
  
  // Clinical Interpretation
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Clinical Interpretation", 20, 78);
  
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const interpretation = isPositive 
    ? "This patient profile shows characteristics associated with positive treatment\nresponse. Consider proceeding with treatment protocol while monitoring for\nside effects."
    : "This patient profile shows characteristics associated with treatment resistance.\nConsider alternative therapeutic approaches or modified dosing protocols.";
  doc.text(interpretation, 20, 88);
  
  // Patient Data
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Patient Information", 20, 115);
  
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const yStart = 125;
  const lineHeight = 8;
  
  doc.text(`Age: ${data.patientData.age} years`, 20, yStart);
  doc.text(`Sex: ${getSexLabel(data.patientData.sex)}`, 20, yStart + lineHeight);
  doc.text(`Blood Pressure: ${data.patientData.bloodPressure} mmHg`, 20, yStart + lineHeight * 2);
  doc.text(`Cholesterol: ${data.patientData.cholesterol} mg/dL`, 20, yStart + lineHeight * 3);
  doc.text(`Dosage: ${data.patientData.dosage} mg`, 20, yStart + lineHeight * 4);
  doc.text(`Side Effects Reported: ${getSideEffectsLabel(data.patientData.sideEffects)}`, 20, yStart + lineHeight * 5);
  
  // Model Information
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Model Information", 20, 180);
  
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text("Algorithm: Logistic Regression", 20, 190);
  doc.text("Training Data: Clinical trial patient biomarkers", 20, 198);
  doc.text("Version: 1.0.0", 20, 206);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Bio-Tester — Predictive Intelligence for Clinical Trials", 105, 280, { align: "center" });
  doc.text("This report is for research purposes only. Not for clinical diagnosis.", 105, 285, { align: "center" });
  
  doc.save(`bio-tester-report-${Date.now()}.pdf`);
};

export const generateWordReport = async (data: PredictionData) => {
  const isPositive = data.outcome === 1;
  
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Title
        new Paragraph({
          text: "Bio-Tester Clinical Trial Report",
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        
        new Paragraph({
          text: `Generated: ${getFormattedDate()}`,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 }
        }),
        
        // Prediction Summary
        new Paragraph({
          text: "Prediction Summary",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 }
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: "Outcome: ",
              bold: true
            }),
            new TextRun({
              text: getOutcomeLabel(data.outcome),
              color: isPositive ? "22C55E" : "EF4444"
            })
          ],
          spacing: { after: 100 }
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: "Confidence Level: ",
              bold: true
            }),
            new TextRun({
              text: `${data.confidence}%`,
              color: "0EA5E9"
            })
          ],
          spacing: { after: 300 }
        }),
        
        // Clinical Interpretation
        new Paragraph({
          text: "Clinical Interpretation",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 }
        }),
        
        new Paragraph({
          text: isPositive 
            ? "This patient profile shows characteristics associated with positive treatment response. Consider proceeding with treatment protocol while monitoring for side effects."
            : "This patient profile shows characteristics associated with treatment resistance. Consider alternative therapeutic approaches or modified dosing protocols.",
          spacing: { after: 300 }
        }),
        
        // Patient Information
        new Paragraph({
          text: "Patient Information",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 }
        }),
        
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Parameter", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Value", bold: true })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Age")] }),
                new TableCell({ children: [new Paragraph(`${data.patientData.age} years`)] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Sex")] }),
                new TableCell({ children: [new Paragraph(getSexLabel(data.patientData.sex))] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Blood Pressure")] }),
                new TableCell({ children: [new Paragraph(`${data.patientData.bloodPressure} mmHg`)] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Cholesterol")] }),
                new TableCell({ children: [new Paragraph(`${data.patientData.cholesterol} mg/dL`)] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Dosage")] }),
                new TableCell({ children: [new Paragraph(`${data.patientData.dosage} mg`)] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Side Effects Reported")] }),
                new TableCell({ children: [new Paragraph(getSideEffectsLabel(data.patientData.sideEffects))] })
              ]
            })
          ]
        }),
        
        // Model Information
        new Paragraph({
          text: "Model Information",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 200 }
        }),
        
        new Paragraph({
          children: [
            new TextRun({ text: "Algorithm: ", bold: true }),
            new TextRun("Logistic Regression")
          ],
          spacing: { after: 100 }
        }),
        
        new Paragraph({
          children: [
            new TextRun({ text: "Training Data: ", bold: true }),
            new TextRun("Clinical trial patient biomarkers")
          ],
          spacing: { after: 100 }
        }),
        
        new Paragraph({
          children: [
            new TextRun({ text: "Version: ", bold: true }),
            new TextRun("1.0.0")
          ],
          spacing: { after: 300 }
        }),
        
        // Footer
        new Paragraph({
          text: "Bio-Tester — Predictive Intelligence for Clinical Trials",
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 100 }
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: "This report is for research purposes only. Not for clinical diagnosis.",
              italics: true
            })
          ],
          alignment: AlignmentType.CENTER
        })
      ]
    }]
  });
  
  const blob = await require("docx").Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `bio-tester-report-${Date.now()}.docx`;
  link.click();
  URL.revokeObjectURL(url);
};

export const generateExcelReport = (data: PredictionData) => {
  const isPositive = data.outcome === 1;
  
  // Summary Sheet
  const summaryData = [
    ["Bio-Tester Clinical Trial Report"],
    [`Generated: ${getFormattedDate()}`],
    [],
    ["PREDICTION SUMMARY"],
    ["Outcome", getOutcomeLabel(data.outcome)],
    ["Confidence Level", `${data.confidence}%`],
    [],
    ["CLINICAL INTERPRETATION"],
    [isPositive 
      ? "This patient profile shows characteristics associated with positive treatment response."
      : "This patient profile shows characteristics associated with treatment resistance."],
    []
  ];
  
  // Patient Data Sheet
  const patientData = [
    ["PATIENT INFORMATION"],
    [],
    ["Parameter", "Value"],
    ["Age", `${data.patientData.age} years`],
    ["Sex", getSexLabel(data.patientData.sex)],
    ["Blood Pressure", `${data.patientData.bloodPressure} mmHg`],
    ["Cholesterol", `${data.patientData.cholesterol} mg/dL`],
    ["Dosage", `${data.patientData.dosage} mg`],
    ["Side Effects Reported", getSideEffectsLabel(data.patientData.sideEffects)],
    [],
    ["MODEL INFORMATION"],
    [],
    ["Algorithm", "Logistic Regression"],
    ["Training Data", "Clinical trial patient biomarkers"],
    ["Version", "1.0.0"]
  ];
  
  const wb = XLSX.utils.book_new();
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  const wsPatient = XLSX.utils.aoa_to_sheet(patientData);
  
  // Set column widths
  wsSummary["!cols"] = [{ wch: 30 }, { wch: 30 }];
  wsPatient["!cols"] = [{ wch: 30 }, { wch: 30 }];
  
  XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
  XLSX.utils.book_append_sheet(wb, wsPatient, "Patient Data");
  
  XLSX.writeFile(wb, `bio-tester-report-${Date.now()}.xlsx`);
};

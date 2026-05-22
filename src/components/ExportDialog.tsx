import { FileText, FileSpreadsheet, FileDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { generatePDFReport, generateWordReport, generateExcelReport } from "@/lib/reportGenerator";

interface PatientData {
  age: string;
  sex: string;
  bloodPressure: string;
  cholesterol: string;
  dosage: string;
  sideEffects: string;
}

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outcome: number;
  confidence: number;
  patientData: PatientData;
}

const ExportDialog = ({ open, onOpenChange, outcome, confidence, patientData }: ExportDialogProps) => {
  const handleExport = async (format: "pdf" | "word" | "excel") => {
    const data = { outcome, confidence, patientData };
    
    try {
      if (format === "pdf") {
        generatePDFReport(data);
      } else if (format === "word") {
        await generateWordReport(data);
      } else if (format === "excel") {
        generateExcelReport(data);
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Report</DialogTitle>
          <DialogDescription>
            Choose your preferred format to download the prediction report
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          <Button
            onClick={() => handleExport("pdf")}
            variant="outline"
            className="justify-start h-auto py-4"
          >
            <FileDown className="mr-3 h-5 w-5 text-destructive" />
            <div className="text-left">
              <div className="font-semibold">PDF Document</div>
              <div className="text-sm text-muted-foreground">Professional report with formatting</div>
            </div>
          </Button>
          
          <Button
            onClick={() => handleExport("word")}
            variant="outline"
            className="justify-start h-auto py-4"
          >
            <FileText className="mr-3 h-5 w-5 text-primary" />
            <div className="text-left">
              <div className="font-semibold">Word Document</div>
              <div className="text-sm text-muted-foreground">Editable .docx format</div>
            </div>
          </Button>
          
          <Button
            onClick={() => handleExport("excel")}
            variant="outline"
            className="justify-start h-auto py-4"
          >
            <FileSpreadsheet className="mr-3 h-5 w-5 text-accent" />
            <div className="text-left">
              <div className="font-semibold">Excel Spreadsheet</div>
              <div className="text-sm text-muted-foreground">Structured data in .xlsx format</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;

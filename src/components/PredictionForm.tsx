import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Activity, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface PatientData {
  age: string;
  sex: string;
  bloodPressure: string;
  cholesterol: string;
  dosage: string;
  sideEffects: string;
}

interface PredictionFormProps {
  onPredict: (data: PatientData) => void;
  isLoading: boolean;
}

const PredictionForm = ({ onPredict, isLoading }: PredictionFormProps) => {
  const [formData, setFormData] = useState<PatientData>({
    age: "",
    sex: "",
    bloodPressure: "",
    cholesterol: "",
    dosage: "",
    sideEffects: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PatientData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PatientData, string>> = {};

    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 100) {
      newErrors.age = "Age must be between 18 and 100";
    }
    if (!formData.sex) {
      newErrors.sex = "Please select sex";
    }
    if (!formData.bloodPressure || isNaN(Number(formData.bloodPressure)) || Number(formData.bloodPressure) < 80 || Number(formData.bloodPressure) > 200) {
      newErrors.bloodPressure = "Blood pressure must be between 80 and 200 mmHg";
    }
    if (!formData.cholesterol || isNaN(Number(formData.cholesterol)) || Number(formData.cholesterol) < 100 || Number(formData.cholesterol) > 400) {
      newErrors.cholesterol = "Cholesterol must be between 100 and 400 mg/dL";
    }
    if (!formData.dosage || isNaN(Number(formData.dosage)) || Number(formData.dosage) < 1 || Number(formData.dosage) > 100) {
      newErrors.dosage = "Dosage must be between 1 and 100 mg";
    }
    if (!formData.sideEffects) {
      newErrors.sideEffects = "Please select side effects status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onPredict(formData);
    }
  };

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <section id="prediction" className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Patient Data Input
          </h2>
          <p className="text-muted-foreground">
            Enter patient clinical trial data to predict treatment outcome
          </p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Clinical Parameters
            </CardTitle>
            <CardDescription>
              All fields are required for accurate prediction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 55"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className={errors.age ? "border-destructive" : ""}
                  />
                  {errors.age && (
                    <p className="text-sm text-destructive">{errors.age}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sex">Sex</Label>
                  <Select value={formData.sex} onValueChange={(value) => handleInputChange("sex", value)}>
                    <SelectTrigger id="sex" className={errors.sex ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Female</SelectItem>
                      <SelectItem value="1">Male</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.sex && (
                    <p className="text-sm text-destructive">{errors.sex}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                  <Input
                    id="bloodPressure"
                    type="number"
                    placeholder="e.g., 130"
                    value={formData.bloodPressure}
                    onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                    className={errors.bloodPressure ? "border-destructive" : ""}
                  />
                  {errors.bloodPressure && (
                    <p className="text-sm text-destructive">{errors.bloodPressure}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                  <Input
                    id="cholesterol"
                    type="number"
                    placeholder="e.g., 220"
                    value={formData.cholesterol}
                    onChange={(e) => handleInputChange("cholesterol", e.target.value)}
                    className={errors.cholesterol ? "border-destructive" : ""}
                  />
                  {errors.cholesterol && (
                    <p className="text-sm text-destructive">{errors.cholesterol}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage (mg)</Label>
                  <Input
                    id="dosage"
                    type="number"
                    placeholder="e.g., 10"
                    value={formData.dosage}
                    onChange={(e) => handleInputChange("dosage", e.target.value)}
                    className={errors.dosage ? "border-destructive" : ""}
                  />
                  {errors.dosage && (
                    <p className="text-sm text-destructive">{errors.dosage}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sideEffects">Side Effects Reported</Label>
                  <Select value={formData.sideEffects} onValueChange={(value) => handleInputChange("sideEffects", value)}>
                    <SelectTrigger id="sideEffects" className={errors.sideEffects ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No</SelectItem>
                      <SelectItem value="1">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.sideEffects && (
                    <p className="text-sm text-destructive">{errors.sideEffects}</p>
                  )}
                </div>
              </div>

              <Alert className="bg-muted border-border">
                <AlertCircle className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm">
                  This is a demonstration model. Results should not be used for actual clinical decisions.
                </AlertDescription>
              </Alert>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={isLoading}
                variant="hero"
              >
                {isLoading ? "Analyzing..." : "Run Prediction"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PredictionForm;

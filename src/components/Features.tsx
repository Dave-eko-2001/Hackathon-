import { Database, Brain, FileBarChart, Lock, Workflow, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    icon: Brain,
    title: "Advanced ML Models",
    description: "Logistic Regression, Random Forest, and XGBoost for accurate predictions",
  },
  {
    icon: Database,
    title: "Data Integration",
    description: "Connect with EHR systems and clinical trial databases seamlessly",
  },
  {
    icon: FileBarChart,
    title: "Model Explainability",
    description: "SHAP and LIME integration for transparent decision-making",
  },
  {
    icon: Lock,
    title: "HIPAA Compliance",
    description: "Enterprise-grade security with encrypted data storage",
  },
  {
    icon: Workflow,
    title: "Continuous Learning",
    description: "Models improve with new trial data and outcomes",
  },
  {
    icon: Sparkles,
    title: "Real-time Analysis",
    description: "Instant predictions with confidence scoring",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Clinical Excellence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive features designed for pharmaceutical research and clinical trial optimization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-border hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

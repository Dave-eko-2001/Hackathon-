import { Dna, TrendingUp, Shield, Zap, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import DocumentationDialog from "./DocumentationDialog";

const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [documentationOpen, setDocumentationOpen] = useState(false);
  
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Dna className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Predictive Intelligence for Clinical Trials</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Bio-Tester
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Predict drug trial outcomes with machine learning. 
            <span className="font-semibold text-foreground"> Smarter, Faster, Safer</span> clinical trials through predictive intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button 
              size="lg" 
              variant="hero"
              onClick={onGetStarted}
              className="text-base px-8"
            >
              Try Prediction Model
              <TrendingUp className="w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-base px-8"
              onClick={() => setDocumentationOpen(true)}
            >
              <FileText className="w-5 h-5 mr-2" />
              View Documentation
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Shield className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">HIPAA Compliant</h3>
              <p className="text-sm text-muted-foreground">Secure, encrypted patient data handling</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Zap className="w-10 h-10 text-accent mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Real-time Predictions</h3>
              <p className="text-sm text-muted-foreground">Instant ML-powered outcome analysis</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <TrendingUp className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">85%+ Accuracy</h3>
              <p className="text-sm text-muted-foreground">Validated on clinical trial datasets</p>
            </div>
          </div>
        </div>
      </div>
      
      <DocumentationDialog 
        open={documentationOpen} 
        onOpenChange={setDocumentationOpen} 
      />
    </section>
  );
};

export default Hero;

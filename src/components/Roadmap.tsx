import { CheckCircle2, Circle } from "lucide-react";

const roadmapItems = [
  {
    phase: "MVP (Current)",
    title: "Core Prediction Engine",
    items: [
      "Logistic Regression model",
      "Basic patient data input",
      "Outcome prediction (0/1)",
      "Confidence scoring",
    ],
    completed: true,
  },
  {
    phase: "Phase 1",
    title: "Enhanced Models & Data",
    items: [
      "Random Forest & XGBoost",
      "Genomic biomarkers",
      "Multi-drug comparison",
      "Adverse event history",
    ],
    completed: false,
  },
  {
    phase: "Phase 2",
    title: "Advanced Analytics",
    items: [
      "SHAP/LIME explainability",
      "Interactive dashboards",
      "ROC curves & feature importance",
      "Patient clustering",
    ],
    completed: false,
  },
  {
    phase: "Phase 3",
    title: "Enterprise Integration",
    items: [
      "EHR system connections",
      "API endpoints",
      "Audit trails & versioning",
      "Real-time model updates",
    ],
    completed: false,
  },
];

const Roadmap = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Product Roadmap
          </h2>
          <p className="text-muted-foreground text-lg">
            Evolution from MVP to enterprise-grade clinical trial platform
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
          
          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <div 
                key={index}
                className="relative pl-0 md:pl-20 animate-in fade-in slide-in-from-left-8"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute left-6 top-6 hidden md:block">
                  {item.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>

                <div className={`bg-card border rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ${item.completed ? 'border-accent' : 'border-border'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${item.completed ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                      {item.phase}
                    </span>
                    {item.completed && (
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full font-medium">
                        LIVE
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  
                  <ul className="space-y-2">
                    {item.items.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.completed ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

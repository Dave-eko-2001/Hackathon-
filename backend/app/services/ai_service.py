import torch
import torch.nn as nn
import os

class SimpleEfficacyModel(nn.Module):
    def __init__(self):
        super(SimpleEfficacyModel, self).__init__()
        self.fc1 = nn.Linear(4, 10)
        self.fc2 = nn.Linear(10, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.sigmoid(self.fc2(x))
        return x

class AIService:
    def __init__(self):
        self.model = SimpleEfficacyModel()
        self.model.eval() # Set to evaluation mode
        # In a real app, we would load state_dict here
        # self.model.load_state_dict(torch.load("models/efficacy_model.pth"))

    def predict_efficacy(self, age: int, bp: int, cholesterol: int, side_effects: int) -> float:
        """
        Predicts drug efficacy based on patient parameters.
        """
        # Normalize inputs (simplified)
        inputs = torch.tensor([[age/100.0, bp/200.0, cholesterol/300.0, side_effects]], dtype=torch.float32)
        
        with torch.no_grad():
            prediction = self.model(inputs)
            
        return prediction.item()

    def predict_adverse_events(self, compound_id: str) -> dict:
        """
        Predicts risk of adverse events for a compound.
        """
        # Mock logic
        risk_score = hash(compound_id) % 100 / 100.0
        return {
            "compound_id": compound_id,
            "risk_score": risk_score,
            "risk_level": "High" if risk_score > 0.7 else "Low"
        }

ai_service = AIService()

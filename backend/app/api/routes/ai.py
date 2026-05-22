from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import ai_service

router = APIRouter()

class EfficacyRequest(BaseModel):
    age: int
    blood_pressure: int
    cholesterol: int
    side_effects_score: int # 0 for none, 1 for present

class EfficacyResponse(BaseModel):
    efficacy_score: float

class AdverseEventRequest(BaseModel):
    compound_id: str

@router.post("/predict-efficacy", response_model=EfficacyResponse)
def predict_efficacy(request: EfficacyRequest):
    """
    Predicts the efficacy of a treatment based on patient data using PyTorch.
    """
    try:
        score = ai_service.predict_efficacy(
            request.age, 
            request.blood_pressure, 
            request.cholesterol, 
            request.side_effects_score
        )
        return {"efficacy_score": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict-adverse-events")
def predict_adverse_events(request: AdverseEventRequest):
    """
    Predicts the risk of adverse events for a given compound.
    """
    return ai_service.predict_adverse_events(request.compound_id)

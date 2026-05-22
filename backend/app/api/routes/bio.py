from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.bio_service import bio_service

router = APIRouter()

class SequenceRequest(BaseModel):
    sequence: str

class AlignmentRequest(BaseModel):
    sequence1: str
    sequence2: str

@router.post("/analyze-sequence")
def analyze_sequence(request: SequenceRequest):
    """
    Analyzes a DNA/RNA sequence using BioPython.
    Returns GC content, complement, translation, etc.
    """
    try:
        return bio_service.analyze_sequence(request.sequence)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/compound-alignment")
def align_compounds(request: AlignmentRequest):
    """
    Aligns two sequences to check for similarity.
    """
    return bio_service.align_compounds(request.sequence1, request.sequence2)

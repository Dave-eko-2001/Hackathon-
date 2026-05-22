from fastapi import APIRouter, HTTPException
from app.services.drug_service import drug_service
from typing import Optional

router = APIRouter()

@router.get("/lookup/{chembl_id}")
def lookup_drug(chembl_id: str):
    """
    Get details for a specific drug by ChEMBL ID.
    """
    result = drug_service.get_drug_info(chembl_id)
    if "error" in result and result["error"] == "Drug not found":
        raise HTTPException(status_code=404, detail="Drug not found")
    return result

@router.get("/search")
def search_drugs(query: str):
    """
    Search for drugs by name.
    """
    return drug_service.search_drug(query)

@router.get("/benchmark/tdc")
def get_tdc_data(dataset: Optional[str] = 'Caco2_Wang'):
    """
    Get sample data from a TDC benchmark dataset.
    """
    return drug_service.get_tdc_benchmark(dataset)

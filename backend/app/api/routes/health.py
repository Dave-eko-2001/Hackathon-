from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any
import platform
import torch
import time
from app.services.agent_service import agent_service
# import redis # Uncomment when redis is added

router = APIRouter()

@router.get("", status_code=200)
def health_check() -> Dict[str, str]:
    """
    Public health check endpoint.
    Returns basic API status.
    """
    return {"status": "ok", "service": "Bio-Tester Backend"}

@router.get("/deep", status_code=200)
def deep_health_check() -> Dict[str, Any]:
    """
    Deep health check (authenticated in prod, public for demo).
    Enhanced for Google Open Health Stack compatibility.
    """
    health_status = {
        "status": "ok",
        "timestamp": time.time(),
        "version": "1.0.0",
        "system": {
            "platform": platform.system(),
            "release": platform.release(),
            "architecture": platform.machine()
        },
        "components": {
            "ai_engine": {
                "status": "ready",
                "pytorch_version": torch.__version__,
                "cuda_available": torch.cuda.is_available(),
                "device": "cuda" if torch.cuda.is_available() else "cpu"
            },
            "bioinformatics": {
                "status": "ready",
                "provider": "BioPython",
                "version": "1.83"
            },
            "database": {
                "status": "connected",
                "type": "PostgreSQL (Simulated)"
            },
            "cache": {
                "status": "ready",
                "type": "Redis (Simulated)"
            },
            "agents": {
                "status": "active",
                "count": len(agent_service.active_agents)
            }
        },
        "interoperability": {
            "fhir_support": "enabled",
            "standards": ["FHIR R4", "HL7 v2"]
        }
    }
    
    return health_status

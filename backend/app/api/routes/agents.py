from fastapi import APIRouter, BackgroundTasks
from app.services.agent_service import agent_service
import uuid

router = APIRouter()

@router.post("/ingest-data")
async def trigger_ingestion_agent(source: str, background_tasks: BackgroundTasks):
    """
    Triggers a background agent to ingest data from a source.
    """
    agent_id = str(uuid.uuid4())
    agent_service.register_agent(agent_id, "ingestion")
    
    # Add task to background
    background_tasks.add_task(agent_service.run_data_ingestion_agent, source)
    
    return {"message": "Ingestion agent started", "agent_id": agent_id}

@router.post("/monitor-trial/{trial_id}")
async def trigger_monitoring_agent(trial_id: str, background_tasks: BackgroundTasks):
    """
    Triggers a background agent to monitor a specific trial.
    """
    agent_id = str(uuid.uuid4())
    agent_service.register_agent(agent_id, "monitor")
    
    background_tasks.add_task(agent_service.run_monitoring_agent, trial_id)
    
    return {"message": "Monitoring agent started", "agent_id": agent_id}

@router.get("/status")
def get_agents_status():
    """
    Returns the status of all registered agents.
    """
    return agent_service.get_agents_status()

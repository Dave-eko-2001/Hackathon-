import asyncio
import time
from typing import List, Dict

class AgentService:
    def __init__(self):
        self.active_agents = {}

    async def run_data_ingestion_agent(self, source: str):
        """
        Simulates a background agent ingesting data.
        """
        print(f"[Agent: Ingestion] Starting ingestion from {source}...")
        await asyncio.sleep(5) # Simulate work
        print(f"[Agent: Ingestion] Completed ingestion from {source}.")
        return {"status": "completed", "source": source, "records_processed": 150}

    async def run_monitoring_agent(self, trial_id: str):
        """
        Simulates a monitoring agent checking trial status.
        """
        print(f"[Agent: Monitor] Checking trial {trial_id}...")
        await asyncio.sleep(2)
        print(f"[Agent: Monitor] Trial {trial_id} is healthy.")
        return {"status": "healthy", "trial_id": trial_id}

    def register_agent(self, agent_id: str, agent_type: str):
        self.active_agents[agent_id] = {"type": agent_type, "status": "idle", "last_active": time.time()}
        return self.active_agents[agent_id]

    def get_agents_status(self) -> Dict:
        return self.active_agents

agent_service = AgentService()

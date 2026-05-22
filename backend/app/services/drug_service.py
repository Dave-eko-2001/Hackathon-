from chembl_webresource_client.new_client import new_client
from tdc.single_pred import ADME
import pandas as pd
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DrugDataService:
    def __init__(self):
        self.molecule = new_client.molecule
        self.activity = new_client.activity

    def get_drug_info(self, chembl_id: str) -> dict:
        """
        Fetches drug information from ChEMBL by ChEMBL ID.
        Handles errors gracefully.
        """
        try:
            logger.info(f"Fetching info for {chembl_id}")
            res = self.molecule.filter(molecule_chembl_id=chembl_id).only(['molecule_chembl_id', 'pref_name', 'molecule_type', 'structure'])
            if res and len(res) > 0:
                return res[0]
            return {"error": "Drug not found"}
        except Exception as e:
            logger.error(f"Error fetching drug info: {str(e)}")
            return {"error": "External service unavailable", "details": str(e)}

    def search_drug(self, name: str) -> list:
        """
        Searches for a drug by name in ChEMBL.
        """
        try:
            logger.info(f"Searching for drug: {name}")
            res = self.molecule.search(name)
            # Return top 5 results
            return [
                {
                    "chembl_id": r.get('molecule_chembl_id'),
                    "name": r.get('pref_name'),
                    "type": r.get('molecule_type')
                } for r in res[:5] if r
            ]
        except Exception as e:
            logger.error(f"Error searching drug: {str(e)}")
            return []

    def get_tdc_benchmark(self, dataset_name: str = 'Caco2_Wang') -> dict:
        """
        Fetches a benchmark dataset from TDC (Therapeutics Data Commons).
        Default is Caco2_Wang (ADME).
        """
        try:
            logger.info(f"Fetching TDC dataset: {dataset_name}")
            data = ADME(name=dataset_name)
            split = data.get_split()
            train_df = split['train']
            
            # Return summary statistics
            return {
                "dataset": dataset_name,
                "train_samples": len(train_df),
                "columns": list(train_df.columns),
                "sample_data": train_df.head(3).to_dict(orient='records')
            }
        except Exception as e:
            logger.error(f"Error fetching TDC dataset: {str(e)}")
            return {"error": "TDC service unavailable or dataset not found", "details": str(e)}

drug_service = DrugDataService()

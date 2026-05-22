from Bio.Seq import Seq
from Bio.SeqUtils import gc_fraction

class BioService:
    def analyze_sequence(self, sequence: str) -> dict:
        """
        Analyzes a DNA/RNA sequence using BioPython.
        """
        seq_obj = Seq(sequence)
        
        return {
            "length": len(seq_obj),
            "complement": str(seq_obj.complement()),
            "reverse_complement": str(seq_obj.reverse_complement()),
            "gc_content": gc_fraction(seq_obj) * 100, # Percentage
            "transcription": str(seq_obj.transcribe()) if set(sequence).issubset({"A", "C", "G", "T"}) else "N/A",
            "translation": str(seq_obj.translate()) if len(seq_obj) % 3 == 0 else "Sequence length must be multiple of 3"
        }

    def align_compounds(self, seq1: str, seq2: str) -> dict:
        """
        Simple alignment check (mocking a more complex alignment).
        """
        # In a real scenario, use Bio.Align.PairwiseAligner
        match_score = 0
        min_len = min(len(seq1), len(seq2))
        for i in range(min_len):
            if seq1[i] == seq2[i]:
                match_score += 1
        
        similarity = (match_score / max(len(seq1), len(seq2))) * 100
        return {
            "similarity_percentage": similarity,
            "match_count": match_score
        }

bio_service = BioService()

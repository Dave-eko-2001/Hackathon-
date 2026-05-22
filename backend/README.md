# Bio-Tester Backend

Production-ready backend for pharmaceutical drug trial software, featuring AI, Bioinformatics, and Agentic orchestration.

## Features
- **AI/ML Layer**: PyTorch-based efficacy and adverse event prediction.
- **Bioinformatics**: BioPython integration for sequence analysis and alignment.
- **Agent Layer**: "Antigravity" orchestration for background tasks (ingestion, monitoring).
- **Health Monitoring**: Google Open Health Stack compatible health checks.
- **Interoperability**: FHIR-ready metadata.

## Tech Stack
- **Framework**: FastAPI
- **AI**: PyTorch
- **Bioinformatics**: BioPython
- **Database**: PostgreSQL (Ready for integration)
- **Cache**: Redis (Ready for integration)
- **Containerization**: Docker & Docker Compose

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Python 3.11+ (for local development)

### Running with Docker
```bash
docker-compose up --build
```
The API will be available at `http://localhost:8000`.
Documentation: `http://localhost:8000/docs`

### Local Development
1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Endpoints
- `GET /health`: Basic health check.
- `GET /health/deep`: Detailed health check (Open Health Stack compatible).
- `POST /ai/predict-efficacy`: Predict treatment efficacy.
- `POST /ai/predict-adverse-events`: Predict risk of adverse events.
- `POST /bio/analyze-sequence`: DNA/RNA sequence analysis.
- `POST /agents/ingest-data`: Trigger data ingestion agent.
- `GET /agents/status`: Check status of active agents.

---
**Mr.eko software is ready sir.**

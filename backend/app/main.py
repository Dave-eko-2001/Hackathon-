from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import health, ai, bio, agents, drugs

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Bio-Tester Backend API with AI, Bioinformatics, and Agent capabilities.",
    version="1.0.0",
)

# CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include Routers
app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(ai.router, prefix="/ai", tags=["ai"])
app.include_router(bio.router, prefix="/bio", tags=["bio"])
app.include_router(agents.router, prefix="/agents", tags=["agents"])
app.include_router(drugs.router, prefix="/drugs", tags=["drugs"])

@app.get("/")
def root():
    return {"message": "Welcome to Bio-Tester API. Visit /docs for documentation."}

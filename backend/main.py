from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import random

from database import engine, SessionLocal

from schemas import ComplaintCreate
from models import Complaint
from database import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Home route
@app.get("/")
def home():
    return {"message": "Water Leakage Backend Running"}

# Create complaint
@app.post("/complaints")
def create_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
):
    complaint_number = f"TN-WL-{random.randint(100000,999999)}"

    new_complaint = Complaint(
        complaint_id=complaint_number,
        name=complaint.name,
        phone=complaint.phone,
        district=complaint.district,
        area=complaint.area,
        location=complaint.location,
        leakage_type=complaint.type,
        description=complaint.desc,
        status="Submitted",
        priority="Medium"
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    return {
        "message": "Complaint Registered Successfully",
        "complaint_id": complaint_number
    }

# Track complaint
@app.get("/complaints/{complaint_id}")
def get_complaint(
    complaint_id: str,
    db: Session = Depends(get_db)
):
    complaint = db.query(Complaint).filter(
        Complaint.complaint_id == complaint_id
    ).first()

    if not complaint:
        return {"error": "Complaint not found"}

    return {
        "complaint_id": complaint.complaint_id,
        "name": complaint.name,
        "district": complaint.district,
        "area": complaint.area,
        "location": complaint.location,
        "description": complaint.description,
        "status": complaint.status,
        "priority": complaint.priority
    }

@app.get("/all-complaints")
def all_complaints(
    db: Session = Depends(get_db)
):

    complaints = db.query(Complaint).all()

    result = []

    for complaint in complaints:

        result.append({
            "complaint_id": complaint.complaint_id,
            "name": complaint.name,
            "district": complaint.district,
            "area": complaint.area,
            "status": complaint.status,
            "priority": complaint.priority,
        })

    return result
from pydantic import BaseModel

class StatusUpdate(BaseModel):
    status: str
    priority: str


@app.put("/update-complaint/{complaint_id}")
def update_complaint(
    complaint_id: str,
    update: StatusUpdate,
    db: Session = Depends(get_db)
):

    complaint = db.query(Complaint).filter(
        Complaint.complaint_id == complaint_id
    ).first()

    if not complaint:
        return {"error": "Complaint not found"}

    complaint.status = update.status
    complaint.priority = update.priority

    db.commit()

    return {
        "message": "Complaint updated successfully"
    }
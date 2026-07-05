from sqlalchemy import Column, Integer, String, Text
from database import Base

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    complaint_id = Column(String(50), unique=True)

    name = Column(String(100))
    phone = Column(String(20))

    district = Column(String(100))
    area = Column(String(100))

    location = Column(Text)

    leakage_type = Column(String(100))

    description = Column(Text)

    status = Column(String(50), default="Submitted")

    priority = Column(String(50), default="Medium")
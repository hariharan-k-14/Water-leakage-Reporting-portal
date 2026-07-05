from pydantic import BaseModel

class ComplaintCreate(BaseModel):
    name: str
    phone: str
    district: str
    area: str
    location: str
    type: str
    desc: str


class ComplaintResponse(BaseModel):
    complaint_id: str
    status: str

    class Config:
        from_attributes = True
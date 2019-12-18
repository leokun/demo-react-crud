from pydantic import BaseModel
from typing import Optional

from datetime import datetime

class Collaborator(BaseModel):
    id: int
    name: str
    lastname: str
    email: str
    phone: int
    description: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
from fastapi import FastAPI
from datetime import datetime
from starlette.middleware.cors import CORSMiddleware

from models.collaborator import Collaborator

app = FastAPI()

origins = [
    "http://crud.react",
    "http://api.crud.react:8000",
]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

collaborators = [
    Collaborator(
        id=0,
        name='Stewart',
        lastname='léo',
        email='lstewart@axialys.com',
        phone='33643591488',
        description="Ceci est une description",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
]


@app.get("/collaborator/desc")
def get_collaborator_desc():
    return [
        {"name": "name", "title": "Nom"},
        {"name": "lastname", "title": "Prénom"},
        {"name": "email", "title": "Email"},
        {"name": "phone", "title": "N°"},
        {"name": "created_at", "title": "Date de création"},
        {"name": "updated_at", "title": "Date de mise à jour"}
    ]

@app.get("/collaborators")
def get_collaborators():
    return collaborators

@app.get("/collaborator/{collaborator_id}")
def get_collaborator(collaborator_id: int):
    print(collaborator_id)
    for collaborator in collaborators:
        if collaborator.id == collaborator_id: return collaborator
    return {}

@app.put("/collaborator")
def create_collaborator(collaborator: Collaborator):
    dt = datetime.now()
    collaborator.created_at = dt
    collaborator.updated_at = dt
    collaborators.append(collaborator)

@app.post("/collaborator/{collaborator_id}")
def update_collaborator(collaborator_id: int, collaborator: Collaborator):
    global collaborators
    new = []
    for collaborator in collaborators:
        if collaborator.id == collaborator_id: 
            collaborator.updated_at = datetime.now()
        new.append(collaborator)
    collaborators = new


@app.delete("/collaborator/{collaborator_id}")
def delete_collaborator(collaborator_id: int):
    global collaborators
    new = []
    for collaborator in collaborators:
        if collaborator.id != collaborator_id: new.append(collaborator)
    collaborators = new
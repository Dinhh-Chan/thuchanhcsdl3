from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Thiết lập CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các origin, bạn có thể điều chỉnh theo nhu cầu của bạn
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  
    allow_headers=["*"],
)
# Cơ sở dữ liệu giả
students = [
    {"id": 1, "name": "John Doe", "age": 20, "address": "123 Main St", "phone": "555-555-5555", "email": "john@example.com", "class": "CS101"},
    {"id": 2, "name": "Jane Smith", "age": 22, "address": "456 Maple Ave", "phone": "555-555-5556", "email": "jane@example.com", "class": "CS102"},
    {"id": 3, "name": "Michael Johnson", "age": 21, "address": "789 Oak Dr", "phone": "555-555-5557", "email": "michael@example.com", "class": "CS103"}
]

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(request: LoginRequest):
    if request.username == "admin" and request.password == "admin":
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Tài khoản hoặc mật khẩu không chính xác")

@app.get("/students")
def get_students():
    return students

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Thiết lập CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các origin, bạn có thể điều chỉnh theo nhu cầu của bạn
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Bổ sung OPTIONS vào danh sách các phương thức được phép
    allow_headers=["*"],
)

class OperationRequest(BaseModel):
    a: float
    b: float

@app.post("/add")
def add(request: OperationRequest):
    result = request.a + request.b
    return {"operation": "addition", "result": result}

@app.post("/subtract")
def subtract(request: OperationRequest):
    result = request.a - request.b
    return {"operation": "subtraction", "result": result}

@app.post("/multiply")
def multiply(request: OperationRequest):
    result = request.a * request.b
    return {"operation": "multiplication", "result": result}

@app.post("/divide")
def divide(request: OperationRequest):
    if request.b == 0:
        return {"error": "Division by zero is not allowed"}
    result = request.a / request.b
    return {"operation": "division", "result": result}

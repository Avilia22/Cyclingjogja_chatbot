from flask import Flask, render_template, request,jsonify
from chat import get_response

app = Flask(__name__)

# landing page route
@app.get("/")
def index_get():
    return render_template("base.html")

#when chatbot run page
@app.post("/predict")
def predict():
    text = request.get_json().get("massage")
    #todo : check if text is valid
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)
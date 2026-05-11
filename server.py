from flask import Flask, render_template

app = Flask(__name__)

app.static_folder = "static"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

app.run(host='0.0.0.0', port=3500, debug=True)

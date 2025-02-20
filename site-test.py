from flask import Flask, send_from_directory

app = Flask(__name__, static_folder=".", static_url_path="")

@app.route("/CiblesSMP/")
def serve_index():
    return send_from_directory(".", "index.html")

@app.route("/CiblesSMP/news")
def serve_news():
    return send_from_directory(".", "news.html")

@app.route("/CiblesSMP/<path:filename>")
def serve_file(filename):
    return send_from_directory(".", filename)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5010, debug=True)
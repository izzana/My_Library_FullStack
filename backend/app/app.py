from flask import Flask
from flask_cors import CORS
from app.routes.usuario_routes import usuario_routes
from app.routes.livros_route import livros_routes
from app.routes.emprestimos_routes import emprestimos_routes

app = Flask(__name__)
CORS(app)
app.register_blueprint(usuario_routes)
app.register_blueprint(livros_routes)
app.register_blueprint(emprestimos_routes)
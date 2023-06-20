from flask import Blueprint, jsonify, request
from app.dao.livros_dao import LivrosDao

livros_routes = Blueprint("livros", __name__)
livro_dao = LivrosDao()

@livros_routes.route("/api/v1/livros", methods=["POST"])
def save():
    print("Method save called")
    try:
        if request.json: 
            print(request.json)
            if 'titulo' in request.json \
            and 'autor' in request.json \
            and 'ano_publicacao' in request.json \
            and 'editora' in request.json \
            and 'tipo_livro' in request.json \
            and 'impresso' in request.json \
            and 'localizacao' in request.json:
                livro_dao.save(request.json)
                return {"msg":"livro salvo com sucesso."}
            return {"msg":"Você não preencheu todos os campos corretamente"}
        return {"msg": "Objeto não encontrado"}
    
    except Exception as e:
        return {'error': str(e)}


#aqui

@livros_routes.route("/api/v1/livros", methods=["GET"])
def get_all_books():
    print("method get_all_books invocado")
    try:
        books = livro_dao.get_all()
        books_list = []
        if len(books) > 0:
            for book in books:
                book_obj = {}
                book_obj["id"] = book[0]
                book_obj["titulo"] = book[1]
                book_obj["autor"] = book[2]
                book_obj["ano_publicacao"] = book[3]
                book_obj["editora"] = book[4]
                book_obj["tipo_livro"] = book[5]
                book_obj["impresso"] = book[6] 
                book_obj["localizacao"] = book[7]
                book_obj["emprestado"] = book[8]
                books_list.append(book_obj)
        return jsonify(books_list)
    except Exception as e:
        return {'error': str(e)}
    

@livros_routes.route("/api/v1/livros/autor/<string:autor>", methods=["GET"])
def get_book_by_author(autor):
    print("chamou o autor")
    try:
        books = livro_dao.get_book_by_author(autor)
        books_list = []
        if len(books) > 0:
            for book in books:
                book_obj = {}
                book_obj["id"] = book[0]
                book_obj["titulo"] = book[1]
                book_obj["autor"] = book[2]
                book_obj["ano_publicacao"] = book[3]
                book_obj["editora"] = book[4]
                book_obj["tipo_livro"] = book[5]
                book_obj["impresso"] = book[6]
                book_obj["localizacao"] = book[7]
                books_list.append(book_obj)
        return jsonify(books_list)
    
    except Exception as e:
        return{'error': str(e)}


@livros_routes.route("/api/v1/livros/name/<string:name>", methods=["GET"])
def get_book_by_name(name):
    print("chamou o name")
    try:
        books = livro_dao.get_book_by_name(name)
        books_list = []
        if len(books) > 0:
            for book in books:
                book_obj = {}
                book_obj["id"] = book[0]
                book_obj["titulo"] = book[1]
                book_obj["autor"] = book[2]
                book_obj["ano_publicacao"] = book[3]
                book_obj["editora"] = book[4]
                book_obj["tipo_livro"] = book[5]
                book_obj["impresso"] = book[6]
                book_obj["localizacao"] = book[7]
                book_obj["emprestado"] = book[8]
                books_list.append(book_obj)
        return jsonify(books_list)
        
    except Exception as e:
        return{'error': str(e)}

@livros_routes.route("/api/v1/livros/<string:id>", methods=["GET"])
def get_book_by_id(id):
    print("Método get_book_by_id foi invocado")   
    try:
        book = livro_dao.get_book_by_id(id)
        if book:
            book_data = {
                "book": {
                    "id": book[0],
                    "titulo": book[1],
                    "autor": book[2],
                    "ano_publicacao": book[3],
                    "editora": book[4],
                    "tipo_livro": book[5],
                    "impresso": book[6],
                    "localizacao": book[7],
                    "emprestado": book[8]
                }
            }
            return {**book_data}
        return {"msg": "Livro não encontrado."}
    except Exception as e:
        return {'error': str(e)}


@livros_routes.route("/api/v1/livros/atualizar/<string:id>", methods=["PUT"])
def update(id):
    print("updeitou")
    try:
        if livro_dao.exists(id):        
            if request.json:
                if 'id' in request.json and livro_dao.exists(request.json['id']):
                    if 'titulo' in request.json \
                    and 'autor' in request.json \
                    and 'ano_publicacao' in request.json \
                    and 'editora' in request.json \
                    and 'tipo_livro' in request.json \
                    and 'impresso' in request.json \
                    and 'localizacao' in request.json:
                        livro_dao.update(request.json)
                        return {"msg": "Livro atualizado com sucesso"}
                    return {"msg": "Você não preencheu todos os campos corretamente"}
                return {"msg": "Livro não encontrado"}
            return {"msg": "Objeto não encontrado"}
    except Exception as e:
        return{'error': str(e)}


@livros_routes.route("/api/v1/livros/<string:id>", methods=["DELETE"])
def delete(id):
    print("deletou")
    try:
        if livro_dao.exists(id):
            if livro_dao.delete(id) == 1:
                return {"msg": "Livro deletado com sucesso"}
            return {"msg": "Livro não removido"}
        return {"msg": "Livro não encontrado"}
    except Exception as e:
        return{'error': str(e)}
    
from flask import Blueprint, jsonify, request 
from app.dao.emprestimos_dao import EmprestimosDao

emprestimos_routes = Blueprint("emprestimos", __name__)
emprestimosDao = EmprestimosDao()

@emprestimos_routes.route("/api/v1/emprestimos", methods=["POST"])
def save():
    print("método salvar emprestimo chamado")
    try:
        if request.json:
            print(request.json)
            if 'id_livro' in request.json and 'id_usuario' in request.json:
                emprestimosDao.save_loan(request.json["id_livro"], request.json["id_usuario"])
                return {"msg":"Livro emprestado"}
            return{"msg":"Falta alguma informação"}
        return{"msg":"Objeto não encontrado"}
    
    except Exception as e:
        return {'error': str(e)}


@emprestimos_routes.route("/api/v1/emprestimos/devolver/<string:id>", methods=["PUT"])
def return_book(id):
    print("Método return_book")
    try:
        emprestimosDao.return_book(id)
        return {"msg": "Livro devolvido com sucesso."}
    except Exception as e:
        return {'error': str(e)}
    

@emprestimos_routes.route("/api/v1/emprestimos", methods=["GET"])
def get_all():
    print("method get_all_users invocado")
    try:
        emprestimos = emprestimosDao.get_all()
        emprestimos_list = []
        if len(emprestimos) > 0:
            for emprestimo in emprestimos:
                emprestimo_obj = {}
                emprestimo_obj["id"] = emprestimo[0]
                emprestimo_obj["id_livro"] = emprestimo[1]
                emprestimo_obj["id_usuario"] = emprestimo[2]
                emprestimo_obj["data_emprestimo"] = emprestimo[3]
                emprestimo_obj["data_devolucao"] = emprestimo[4]
                emprestimos_list.append(emprestimo_obj)
        return jsonify(emprestimos_list)
    except Exception as e:
        return {'error': str(e)}

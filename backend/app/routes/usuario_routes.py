from flask import Blueprint, jsonify, request 
from app.dao.usuario_dao import UserDao

usuario_routes = Blueprint("usuario", __name__)
user_dao = UserDao()

@usuario_routes.route("/api/v1/usuario", methods=["POST"])
def save():
  print("method save invocado")
  try:
    if request.json: 
        if 'nome' in request.json \
        and 'cpf' in request.json \
        and 'email' in request.json \
        and 'telefone' in request.json \
        and 'login' in request.json \
        and 'senha' in request.json:
            user_dao.save(request.json)
            return {"msg":"Usuário salvo com sucesso."}
        return {"msg":"Você não preencheu todos os campos corretamente"}
    return {"msg":"Objeto não encontrado"}, 400
  except Exception as e:
    return {'error': str(e)}


@usuario_routes.route("/api/v1/usuario/<string:id>", methods=["GET"])
def get_user_by_id(id):
    print("Método get_user_by_id foi invocado")
    try:
        user = user_dao.get_user_by_id(id)
        if user:
            user_data = {
                "user": {
                    "id": user[0],
                    "nome": user[1],
                    "cpf": user[2],
                    "email": user[3],
                    "telefone": user[4],
                    "login": user[5],
                    "senha": user[5]
                }
            }
            return {**user_data}
        return {"msg": "Usuário não encontrado."}
    except Exception as e:
        return {'error': str(e)}


@usuario_routes.route("/api/v1/usuario", methods=["GET"])
def get_all_users():
    print("method get_all_users invocado")
    try:
        users = user_dao.get_all()
        users_list = []
        if len(users) > 0:
            for user in users:
                user_obj = {}
                user_obj["id"] = user[0]
                user_obj["nome"] = user[1]
                user_obj["cpf"] = user[2]
                user_obj["email"] = user[3]
                user_obj["telefone"] = user[4]
                user_obj["login"] = user[5]
                user_obj["senha"] = user[6]
                users_list.append(user_obj)
        return jsonify(users_list)
    except Exception as e:
        return {'error': str(e)}
    
@usuario_routes.route("/api/v1/usuario/atualizar/<string:id>", methods=["PUT"])
def update(id):
    print("Método Atualizar foi invocado")
    try:
        if user_dao.exists(id):
            if request.json:
                if 'id' in request.json and user_dao.exists(request.json['id']):
                    if 'nome' in request.json \
                            and 'cpf' in request.json \
                            and 'email' in request.json \
                            and 'telefone' in request.json \
                            and 'login' in request.json \
                            and 'senha' in request.json:
                        user_dao.update(request.json)
                        return {"msg": "Contato atualizado com sucesso."}
                    return {"msg": "Você não preencheu todos os campos corretamente"}
                return {"msg": "Usuário não encontrado."}
            return {"msg": "Objeto não encontrado"}
    except Exception as e:
        return {'error': str(e)}


@usuario_routes.route("/api/v1/usuario/deletar/<string:id>", methods=["DELETE"])
def delete(id):
    print("Método Remover foi invocado")
    try:
        if user_dao.exists(id):
            if user_dao.delete(id) == 1:
                return {"msg":"Usuário removido com sucesso."}
            return {"msg":"O usuario não foi removido"}
        return {"msg":"Id não encontrada"}
    except Exception as e:
        return {'error': str(e)}



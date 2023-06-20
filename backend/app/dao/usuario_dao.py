import sqlite3

class UserDao:
    def connect(self ): 
        self.conn = sqlite3.connect('./app/database/library.db') 
        self.cursor = self.conn.cursor()

    def disconnect(self):
        self.cursor.close()
        self.conn.close()

    def exists(self, id):
        self.connect()
        result = self.cursor.execute("SELECT COUNT(*) FROM usuario WHERE id = ?", (id,))
        count = result.fetchone()[0]
        self.disconnect()
        return count > 0
    
    def save(self, user):
      params = [user['nome'], user['cpf'], user['email'], user['telefone'], user['login'], user['senha']]
      self.connect()
      result = self.cursor.execute("""
                    INSERT INTO usuario (nome, cpf, email, telefone, login, senha) VALUES (?,?,?,?,?,?)
                """, params)
      self.conn.commit()
      modified_registers = result.rowcount
      self.disconnect()
      return modified_registers
    
    def get_all(self):
        self.connect()
        self.cursor.execute("""
          SELECT * FROM usuario
        """)

        users = self.cursor.fetchall()
        self.disconnect()
        return users
    
    def get_user_by_id(self, id):
        params = [ id ]
        self.connect()
        self.cursor.execute("""
          SELECT * FROM usuario
          WHERE id=?
        """, (params))

        user = self.cursor.fetchone()
        self.disconnect()
        return user

    def update(self, user):
        params = [user['nome'], user['cpf'], user['email'], user['telefone'], user['login'], user['senha'], user['id']]
        
        self.connect()
        result = self.cursor.execute("""
                    UPDATE usuario 
                    SET nome = ?, 
                    cpf = ?,
                    email = ?, 
                    telefone = ?,
                    login = ?, 
                    senha = ?
                    WHERE id = ?;
                  """, params) 
        modified_registers = result.rowcount 
        self.conn.commit() 
        self.disconnect()
        return modified_registers
    
    def delete(self, id):
        params = [ id ]
        self.connect()
        result = self.cursor.execute("""
                      DELETE FROM usuario 
                      WHERE id = ?;
                  """, params) 
        modified_registers = result.rowcount 
        self.conn.commit() 
        self.disconnect()
        return modified_registers
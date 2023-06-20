import sqlite3

class LivrosDao:
    def connect(self): 
        self.conn = sqlite3.connect('./app/database/library.db') 
        self.cursor = self.conn.cursor()

    def disconnect(self):
        self.cursor.close()
        self.conn.close()

    def exists(self, id):
        self.connect()
        result = self.cursor.execute("SELECT COUNT(*) FROM livros WHERE id = ?", (id,))
        count = result.fetchone()[0]
        self.disconnect()
        return count > 0
    
    def save(self, livro):
        params = [livro['titulo'], livro['autor'], livro['ano_publicacao'] , livro['editora'] , livro['tipo_livro'], livro['impresso'], livro['localizacao']]
        self.connect()
        result = self.cursor.execute("""
                      INSERT INTO livros (titulo, autor, ano_publicacao, editora, tipo_livro, impresso, localizacao ) VALUES (?,?,?,?,?,?,?)
                  """, params) 
        modified_registers = result.rowcount 
        self.conn.commit() 
        self.disconnect()
        return modified_registers
    
    def get_all(self):
        self.connect()
        self.cursor.execute("""
          SELECT * FROM livros
        """)

        livros = self.cursor.fetchall()
        self.disconnect()
        return livros
    
    def get_book_by_id(self, id):
        params = [ id ]
        self.connect()
        self.cursor.execute("""
          SELECT * FROM livros 
          WHERE id=?
        """, (params))

        user = self.cursor.fetchone()
        self.disconnect()
        return user
    
    def get_book_by_author(self, autor):
        self.connect()
        self.cursor.execute("""
          SELECT * FROM livros
          WHERE autor LIKE '%' || ? || '%'
        """, (autor,))

        livros = self.cursor.fetchall()
        self.disconnect()
        return livros

    def get_book_by_name(self, name):
        self.connect()
        self.cursor.execute("""
            SELECT * FROM livros
            WHERE titulo LIKE '%' || ? || '%' 
        """, (name,))

        livro = self.cursor.fetchall()
        self.disconnect()
        return livro

    def update(self, book):
        params = [book['titulo'], book['autor'], book['ano_publicacao'], book['editora'], book['tipo_livro'], book['impresso'], book['localizacao'], book['id'],]
        self.connect()
        result = self.cursor.execute("""
                      UPDATE livros 
                      SET titulo = ?, 
                      autor = ?, 
                      ano_publicacao = ?,
                      editora = ?, 
                      tipo_livro = ?,
                      impresso = ?,
                      localizacao = ? 
                      WHERE id = ?;
                  """, params) 
        modified_registers = result.rowcount 
        self.conn.commit() 
        self.disconnect()
        return modified_registers
    
    # def delete(self, id):
    #     params = [ id ]
    #     self.connect()
    #     result = self.cursor.execute("""
    #                   DELETE FROM livros 
    #                   WHERE id = ?;
    #               """, params) 
    #     modified_registers = result.rowcount 
    #     self.conn.commit() 
    #     self.disconnect()
    #     return modified_registers    

    def delete(self, id):
        self.connect()
        
        # Verificar se o livro está emprestado
        result = self.cursor.execute("SELECT emprestado FROM livros WHERE id = ?", (id,))
        livro_emprestado = result.fetchone()[0]
        
        if livro_emprestado:
            # O livro está emprestado, não é possível excluir
            self.disconnect()
            return 0
        
        # O livro não está emprestado, pode ser excluído
        params = [id]
        result = self.cursor.execute("DELETE FROM livros WHERE id = ?", params)
        modified_registers = result.rowcount
        self.conn.commit()
        self.disconnect()
        return modified_registers
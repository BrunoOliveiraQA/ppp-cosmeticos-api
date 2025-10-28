import pool from '../config/db.js';

/**
 * Model para buscar TODOS os produtos do catálogo.
 */
export const findAllProducts = async () => {
  try {
    // Note que não selecionamos todas as colunas (*), mas apenas as que
    // o frontend realmente precisa. É uma boa prática.
    const [rows] = await pool.query(
      'SELECT id, nome, descricao, preco, categoria, imagem_url FROM products'
    );
    return rows;

  } catch (error) {
    console.error('[ProductModel] Erro ao buscar todos os produtos:', error);
    throw new Error('Erro no banco de dados ao buscar produtos.');
  }
};

/**
 * Model para buscar UM produto pelo seu ID.
 */
export const findProductById = async (id) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nome, descricao, preco, categoria, imagem_url FROM products WHERE id = ?',
      [id]
    );
    
    // Retorna o primeiro (e único) produto encontrado, ou undefined
    return rows[0];

  } catch (error) {
    console.error('[ProductModel] Erro ao buscar produto por ID:', error);
    throw new Error('Erro no banco de dados ao buscar produto.');
  }
};

/**
 * Model para buscar produtos por CATEGORIA.
 */
export const findProductsByCategory = async (categoria) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nome, descricao, preco, categoria, imagem_url FROM products WHERE categoria = ?',
      [categoria]
    );
    return rows;

  } catch (error) {
    console.error('[ProductModel] Erro ao buscar produtos por categoria:', error);
    throw new Error('Erro no banco de dados ao buscar produtos.');
  }
};
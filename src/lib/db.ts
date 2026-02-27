import mysql from 'mysql2/promise';

// Create a connection pool for database operations
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'quantumalphaindiadb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function getDbConnection() {
  return pool.getConnection();
}

export async function executeQuery<T>(
  query: string,
  values?: any[]
): Promise<T[]> {
  const connection = await getDbConnection();
  try {
    const [results] = await connection.execute(query, values);
    return results as T[];
  } finally {
    connection.release();
  }
}

export async function executeInsert(
  query: string,
  values?: any[]
): Promise<{ insertId: number; affectedRows: number }> {
  const connection = await getDbConnection();
  try {
    const [result] = await connection.execute(query, values);
    const insertResult = result as any;
    return {
      insertId: insertResult.insertId,
      affectedRows: insertResult.affectedRows,
    };
  } finally {
    connection.release();
  }
}

export async function executeUpdate(
  query: string,
  values?: any[]
): Promise<number> {
  const connection = await getDbConnection();
  try {
    const [result] = await connection.execute(query, values);
    const updateResult = result as any;
    return updateResult.affectedRows;
  } finally {
    connection.release();
  }
}

export async function executeDelete(
  query: string,
  values?: any[]
): Promise<number> {
  const connection = await getDbConnection();
  try {
    const [result] = await connection.execute(query, values);
    const deleteResult = result as any;
    return deleteResult.affectedRows;
  } finally {
    connection.release();
  }
}

// Close pool on application shutdown
export async function closeDbPool() {
  return pool.end();
}

import { createConnection, Connection } from '@databricks/sql';

export class DatabricksService {
  private connection: Connection | null = null;

  async connect() {
    if (!process.env.DATABRICKS_SERVER_HOSTNAME) {
      throw new Error('DATABRICKS_SERVER_HOSTNAME environment variable is required');
    }

    this.connection = await createConnection({
      host: process.env.DATABRICKS_SERVER_HOSTNAME,
      path: process.env.DATABRICKS_HTTP_PATH,
      token: process.env.DATABRICKS_TOKEN,
    });

    await this.connection.connect();
  }

  async query(sql: string): Promise<any[]> {
    if (!this.connection) {
      throw new Error('Not connected to Databricks');
    }

    const session = await this.connection.openSession();
    try {
      const operation = await session.executeStatement(sql);
      const result = await operation.fetchAll();
      await operation.close();
      return result;
    } finally {
      await session.close();
    }
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}
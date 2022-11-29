import { DataSource } from 'typeorm';

export const clearAllTables = async (dataSource: DataSource): Promise<void> => {
  await Promise.all(
    dataSource.entityMetadatas.map(({ name }) => {
      return dataSource.createQueryBuilder().delete().from(name).execute();
    }),
  );
};

export const getMongoDbConnectionString = ({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}: {
  username: string;
  password: string;
  host: string;
  port: number;
  databaseName: string;
  authDatabase: string;
}): string => {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
};

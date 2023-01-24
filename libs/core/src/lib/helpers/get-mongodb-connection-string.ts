export const getMongoDbConnectionString = ({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string => {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
};

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '11235813',
  database: 'testedb',
  migrations: ['src/database/migrations/*{.ts,.js}'],
  logging: false,
  logger: 'file',
  autoLoadEntities: true,
  migrationsRun: true,
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

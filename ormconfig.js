module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres',
    autoLoadEntities: true,
    entities: ['dist/entities/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
    },
};

// マイグレーションファイルの作成
// npx typeorm migration:generate -n CreateItem

// マイグレーションファイルを使用し、データベースを作成
// npx typeorm migration:run
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './src/data-source';
import { execSync } from 'child_process';

const AppDataSource = new DataSource(dataSourceOptions);

const args = process.argv.slice(2);
const command = args.join(' ');

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    execSync(`typeorm-ts-node-commonjs ${command}`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_OPTIONS: '-r tsconfig-paths/register -r dotenv-mono/load',
      },
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

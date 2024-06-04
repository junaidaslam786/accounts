const { exec } = require('child_process');

// Set environment variables
process.env.NODE_OPTIONS = '-r dotenv-mono/load -r tsconfig-paths/register';

// Run the TypeORM migration command
const command = 'typeorm-ts-node-commonjs -d src/data-source migration:run';
exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});

const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const vitePath = path.join(root, 'node_modules', 'vite');
const expressPath = path.join(root, 'node_modules', 'express');

function run(command, args, options = {}) {
  return spawn(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: true,
    ...options,
  });
}

if (!fs.existsSync(vitePath) || !fs.existsSync(expressPath)) {
  console.log('\n[SETUP] Instalando dependencias del frontend y backend...\n');

  const install = spawnSync('npm', ['install'], {
    cwd: root,
    stdio: 'inherit',
    shell: true,
  });

  if (install.status !== 0) {
    console.error('\n[ERROR] No se pudieron instalar las dependencias.');
    process.exit(install.status || 1);
  }
}

console.log('\n==============================================');
console.log(' Modulación de consultas - WideWorldImporters');
console.log(' Frontend: http://localhost:5173');
console.log(' Backend : http://localhost:3000');
console.log('==============================================\n');

const frontend = run('npm', ['run', 'dev', '--workspace=frontend']);
const backend = run('npm', ['run', 'dev', '--workspace=backend']);

let closing = false;

function shutdown(code = 0) {
  if (closing) return;
  closing = true;

  if (frontend && !frontend.killed) frontend.kill();
  if (backend && !backend.killed) backend.kill();

  process.exit(code);
}

frontend.on('exit', (code) => {
  if (!closing && code && code !== 0) shutdown(code);
});

backend.on('exit', (code) => {
  if (!closing && code && code !== 0) shutdown(code);
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

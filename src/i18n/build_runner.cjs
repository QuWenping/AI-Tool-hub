const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  const output = execSync('npx.cmd astro build', {
    cwd: 'C:\\Users\\qiura\\Projects\\active\\AIToolHub',
    encoding: 'utf-8',
    stdio: 'pipe',
    timeout: 120000,
    env: { ...process.env, FORCE_COLOR: '0' }
  });
  fs.writeFileSync('C:\\Users\\qiura\\Projects\\active\\AIToolHub\\src\\i18n\\build_output.txt', output + '\nBUILD SUCCESS');
  console.log('BUILD SUCCESS');
} catch (e) {
  const msg = (e.stdout || '') + '\n---STDERR---\n' + (e.stderr || '') + '\n---STATUS---\n' + e.status;
  fs.writeFileSync('C:\\Users\\qiura\\Projects\\active\\AIToolHub\\src\\i18n\\build_output.txt', msg);
  console.log('BUILD FAILED, see build_output.txt');
}

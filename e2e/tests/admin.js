const fs = require('fs');
const path = require('path');

const skillPath = path.join(
  __dirname,
  '../../.grok/skills/tlc-mvp/SKILL.md'
);
const skill = fs.readFileSync(skillPath, 'utf8');

function credential(label) {
  const match = skill.match(new RegExp(`- ${label}: \`([^\`]+)\``));
  if (!match) {
    throw new Error(`tlc-mvp skill is missing ${label}`);
  }
  return match[1];
}

const phone = credential('Phone');
const password = credential('Password');

if (phone.includes('@') || !/^[6-9]\d{9}$/.test(phone)) {
  throw new Error('E2E sign-in must be a 10-digit mobile number');
}

module.exports = { phone, password };

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROXY = 'http://127.0.0.1:7897';
const slug = 'apple-speechanalyzer-vs-whisper-2026';
const dir = path.join(__dirname, '..', 'public', 'images', 'blog', slug);
fs.mkdirSync(dir, { recursive: true });

function curl(url, savePath, timeout) {
  timeout = timeout || 30;
  try {
    execSync('curl -s --proxy ' + PROXY + ' --max-time ' + timeout + ' -o ' + savePath + ' "' + url + '"', { stdio: 'pipe' });
    return fs.statSync(savePath).size > 2000;
  } catch { return false; }
}

function searchOpenverse(query, pageSize) {
  pageSize = pageSize || 10;
  try {
    var url = 'https://api.openverse.org/v1/images/?q=' + encodeURIComponent(query) + '&page_size=' + pageSize + '&mature=false';
    var result = execSync('curl -s --proxy ' + PROXY + ' --max-time 15 "' + url + '"', { encoding: 'utf-8' });
    var data = JSON.parse(result);
    return (data.results || []).filter(function(r) { return r.url && r.url.match(/\.(jpg|jpeg|png)/i); });
  } catch { return []; }
}

var usedUrls = {};

function downloadUniqueOpenverse(query, savePath) {
  var photos = searchOpenverse(query, 10);
  for (var i = 0; i < photos.length; i++) {
    var photo = photos[i];
    if (usedUrls[photo.url]) continue;
    if (curl(photo.url, savePath, 20)) {
      usedUrls[photo.url] = true;
      console.log('  Openverse: ' + (photo.title || 'untitled').substring(0, 50) + ' (' + Math.round(fs.statSync(savePath).size/1024) + 'KB)');
      return photo;
    }
  }
  return null;
}

function generatePollinations(prompt, savePath, w, h) {
  var pro = encodeURIComponent(prompt + ', photorealistic professional editorial photography, studio lighting, high resolution, realistic, shot on Canon EOS R5, 50mm lens, clean modern, not illustration not cartoon not digital art');
  return curl('https://image.pollinations.ai/prompt/' + pro + '?width=' + w + '&height=' + h + '&nologo=true&model=flux', savePath, 60);
}

var specs = [
  { name: 'hero.jpg', w: 1200, h: 630, search: 'speech recognition voice waveform microphone technology', poll: 'professional photo of speech recognition technology, microphone with sound waveform visualization on screen, modern clean studio' },
  { name: 'inline-1.jpg', w: 800, h: 400, search: 'artificial intelligence neural network technology', poll: 'professional photo of AI neural network visualization on computer monitor, developer workspace' },
  { name: 'inline-2.jpg', w: 800, h: 400, search: 'software code programming laptop developer', poll: 'professional photo of developer coding on laptop with API documentation, modern office, shallow depth of field' },
  { name: 'inline-3.jpg', w: 800, h: 400, search: 'smartphone mobile app technology person', poll: 'professional photo of person using voice assistant on smartphone, modern lifestyle, natural lighting' },
  { name: 'closing.jpg', w: 800, h: 400, search: 'future technology digital innovation', poll: 'professional photo of futuristic technology concept, digital innovation, blue gradient, modern' }
];

for (var i = 0; i < specs.length; i++) {
  var spec = specs[i];
  console.log('Generating ' + spec.name + '...');
  var savePath = path.join(dir, spec.name);
  var photo = downloadUniqueOpenverse(spec.search, savePath);
  if (!photo) {
    console.log('  Openverse: no good results, using Pollinations photorealistic...');
    if (generatePollinations(spec.poll, savePath, spec.w, spec.h)) {
      console.log('  Pollinations: ' + Math.round(fs.statSync(savePath).size/1024) + 'KB');
    } else {
      console.log('  FAILED');
    }
  }
}

console.log('');
console.log('=== Final Images ===');
fs.readdirSync(dir).filter(function(f) { return f.endsWith('.jpg'); }).forEach(function(f) {
  console.log('  ' + f + ': ' + Math.round(fs.statSync(path.join(dir, f)).size/1024) + 'KB');
});

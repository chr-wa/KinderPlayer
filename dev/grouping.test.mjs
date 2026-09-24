import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const groupingStart = source.indexOf('function normalizeEpisodeTitle');
const groupingEnd = source.indexOf('function renderCategories');
const snippet = source.slice(groupingStart, groupingEnd);
const { groupChaptersByEpisode } = new Function(`${snippet}; return { groupChaptersByEpisode };`)();

function episode(name, id, album = 'Album', artist = 'Artist') {
  return { name, id, album: { name: album, artists: [{ name: artist }] }, images: [{ url: '' }] };
}

test('incomplete chapter subsets are not rendered as groups', () => {
  const chapters = [
    episode('Kapitel 01: Die Story (Folge 1)', '1'),
    episode('Kapitel 02: Die Story (Folge 1)', '2')
  ];
  assert.equal(groupChaptersByEpisode(chapters).length, 0);
});

test('audio grouping empty message is present', () => {
  assert.match(source, /AUDIO_GROUPING_EMPTY_MESSAGE\s*=\s*'Keine vollständigen Folgen erkannt\./);
});

<!-- Syntax fix: the existing file's podcast playback function must contain this exact implementation. -->
<script>
async function playEpisode(episode, restart) {
  const body = { uris: [`spotify:episode:${episode.id}`] };
  if (restart) body.position_ms = 0;
  const response = await fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (response.ok) {
    document.getElementById('now-playing').textContent = episode.name;
    setTimeout(updatePlayer, 500);
  } else if (response.status === 404) {
    notice('Bitte zuerst Spotify auf dem Zielgerät öffnen.');
  }
}
</script>

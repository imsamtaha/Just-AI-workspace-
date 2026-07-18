const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get current time in multiple time zones
app.get('/api/time', (req, res) => {
  const timeZones = [
    { name: 'UTC', zone: 'UTC' },
    { name: 'EST (Eastern)', zone: 'America/New_York' },
    { name: 'CST (Central)', zone: 'America/Chicago' },
    { name: 'MST (Mountain)', zone: 'America/Denver' },
    { name: 'PST (Pacific)', zone: 'America/Los_Angeles' },
    { name: 'GMT (London)', zone: 'Europe/London' },
    { name: 'CET (Central Europe)', zone: 'Europe/Paris' },
    { name: 'IST (India)', zone: 'Asia/Kolkata' },
    { name: 'JST (Japan)', zone: 'Asia/Tokyo' },
    { name: 'AEST (Sydney)', zone: 'Australia/Sydney' }
  ];

  const times = timeZones.map(tz => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz.zone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    return {
      name: tz.name,
      zone: tz.zone,
      time: formatter.format(new Date())
    };
  });

  res.json(times);
});

app.listen(PORT, () => {
  console.log(`🕐 Digital Clock Server running on http://localhost:${PORT}`);
});

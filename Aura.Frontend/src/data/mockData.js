export const genreOptions = [
  { id: 'rock', label: 'Rock', icon: 'guitar' },
  { id: 'jazz', label: 'Jazz', icon: 'disc' },
  { id: 'edm', label: 'EDM', icon: 'radio' },
  { id: 'lofi', label: 'Lo-fi', icon: 'headphones' },
  { id: 'pop', label: 'Pop', icon: 'music' },
  { id: 'hiphop', label: 'Hip-hop', icon: 'mic2' },
  { id: 'classical', label: 'Classical', icon: 'music2' },
  { id: 'rnb', label: 'R&B', icon: 'disc3' },
  { id: 'indie', label: 'Indie', icon: 'music' },
  { id: 'techno', label: 'Techno', icon: 'radio' },
  { id: 'soul', label: 'Soul', icon: 'headphones' },
  { id: 'metal', label: 'Metal', icon: 'guitar' },
]

export const registerSteps = [
  { id: 1, label: 'The Basics' },
  { id: 2, label: 'Photos' },
  { id: 3, label: 'Interests' },
  { id: 4, label: 'Final Touch' },
]

export const profiles = [
  {
    id: 'maya',
    name: 'Maya',
    age: 27,
    distanceKm: 3,
    photo:
      'https://images.unsplash.com/photo-1521252659862-eec69941b071?q=80&w=800&auto=format&fit=crop',
    tags: ['Film photography', 'Vinyl', 'Lo-fi'],
  },
  {
    id: 'liam',
    name: 'Liam',
    age: 29,
    distanceKm: 5,
    photo:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    tags: ['Indie rock', 'Hiking', 'Espresso'],
  },
  {
    id: 'sofia',
    name: 'Sofia',
    age: 26,
    distanceKm: 4,
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    tags: ['Wine tasting', 'Jazz', 'Travel'],
  },
  {
    id: 'noah',
    name: 'Noah',
    age: 28,
    distanceKm: 2,
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    tags: ['Vinyl records', 'Cooking', 'Coffee'],
  },
  {
    id: 'ava',
    name: 'Ava',
    age: 25,
    distanceKm: 6,
    photo:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    tags: ['Running', 'Soul', 'Yoga'],
  },
  {
    id: 'kai',
    name: 'Kai',
    age: 30,
    distanceKm: 1,
    photo:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop',
    tags: ['Board games', 'Techno', 'Startups'],
  },
]

export const chatThreads = [
  {
    id: 'maya',
    name: 'Maya',
    photo:
      'https://images.unsplash.com/photo-1521252659862-eec69941b071?q=80&w=200&auto=format&fit=crop',
    online: true,
    preview: 'Sent a voice note',
    time: '2m',
    unread: 2,
    messages: [
      { id: 1, from: 'them', type: 'text', text: 'Your playlist genuinely made my week', time: '9:41' },
      { id: 2, from: 'me', type: 'text', text: 'Right? Wait until you hear side B', time: '9:42' },
      { id: 3, from: 'them', type: 'voice', duration: '0:24', time: '9:44' },
      { id: 4, from: 'me', type: 'text', text: "Okay that laugh at 0:12 — I'm obsessed", time: '9:45' },
    ],
  },
  {
    id: 'liam',
    name: 'Liam',
    photo:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    online: false,
    preview: 'That gig was unreal',
    time: '1h',
    unread: 0,
    messages: [
      { id: 1, from: 'them', type: 'text', text: 'That gig was unreal, I still have the setlist', time: '7:02' },
      { id: 2, from: 'me', type: 'text', text: 'No way, send it over!', time: '7:05' },
    ],
  },
  {
    id: 'sofia',
    name: 'Sofia',
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    online: false,
    preview: 'Wine & Vinyl on Friday?',
    time: '3h',
    unread: 1,
    messages: [
      { id: 1, from: 'them', type: 'text', text: 'Wine & Vinyl on Friday?', time: '5:10' },
    ],
  },
  {
    id: 'noah',
    name: 'Noah',
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    online: false,
    preview: 'Ha! Same energy',
    time: '1d',
    unread: 0,
    messages: [
      { id: 1, from: 'me', type: 'text', text: 'My cooking playlist is 80% sad jazz, is that normal?', time: 'Yesterday' },
      { id: 2, from: 'them', type: 'text', text: 'Ha! Same energy', time: 'Yesterday' },
    ],
  },
]

export const blindDate = {
  chemistryScore: 92,
  voiceDuration: '0:18',
  venue: {
    name: 'Lumiere Wine & Vinyl',
    description: 'A candlelit listening bar with natural wine.',
    proposedTime: 'Friday, 7:30 PM',
    distance: '6 min from each of you',
  },
}

export const initialProfileInterests = {
  'Favorite Movies': ['In the Mood for Love', 'Her', 'Lost in Translation'],
  Music: ['Lo-fi', 'Jazz', 'Indie'],
  Hobbies: ['Film photography', 'Vinyl hunting', 'Pottery'],
}

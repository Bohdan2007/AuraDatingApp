export const interestOptions = [
  { id: 'live-music', label: 'Live music' },
  { id: 'film-photo', label: 'Film photography' },
  { id: 'hiking', label: 'Hiking' },
  { id: 'vinyl', label: 'Vinyl records' },
  { id: 'cooking', label: 'Cooking' },
  { id: 'art-galleries', label: 'Art galleries' },
  { id: 'coffee', label: 'Coffee crawls' },
  { id: 'running', label: 'Running' },
  { id: 'wine', label: 'Wine tasting' },
  { id: 'board-games', label: 'Board games' },
  { id: 'travel', label: 'Travel' },
  { id: 'poetry', label: 'Poetry' },
  { id: 'yoga', label: 'Yoga' },
  { id: 'startups', label: 'Startups' },
  { id: 'gardening', label: 'Gardening' },
  { id: 'jazz', label: 'Jazz' },
  { id: 'cycling', label: 'Cycling' },
]

export const onboardingSteps = [
  { id: 1, label: 'Basics' },
  { id: 2, label: 'Photos' },
  { id: 3, label: 'Interests' },
  { id: 4, label: 'Voice intro' },
  { id: 5, label: 'Preferences' },
]

export const profiles = [
  {
    id: 'mia',
    name: 'Mia',
    age: 27,
    distanceKm: 2,
    bio: 'Chasing golden hour and good espresso.',
    tags: ['Film photography', 'Live music', 'Hiking'],
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    hasVoiceIntro: true,
  },
  {
    id: 'leo',
    name: 'Leo',
    age: 29,
    distanceKm: 5,
    bio: 'Weekend climber, weekday designer.',
    tags: ['Film photography', 'Live music'],
    photo:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=800&auto=format&fit=crop',
    hasVoiceIntro: true,
  },
  {
    id: 'sana',
    name: 'Sana',
    age: 26,
    distanceKm: 3,
    bio: 'Jazz records and long walks.',
    tags: ['Film photography', 'Live music'],
    photo:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop',
    hasVoiceIntro: true,
  },
  {
    id: 'noah',
    name: 'Noah',
    age: 28,
    distanceKm: 4,
    bio: 'Vinyl hunter and terrible cook.',
    tags: ['Vinyl records', 'Cooking', 'Coffee crawls'],
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    hasVoiceIntro: true,
  },
  {
    id: 'ava',
    name: 'Ava',
    age: 25,
    distanceKm: 6,
    bio: 'Trail runner. Bad at small talk, good at long talks.',
    tags: ['Running', 'Travel', 'Yoga'],
    photo:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    hasVoiceIntro: true,
  },
  {
    id: 'kai',
    name: 'Kai',
    age: 30,
    distanceKm: 1,
    bio: 'Startup by day, board games by night.',
    tags: ['Startups', 'Board games', 'Wine tasting'],
    photo:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    hasVoiceIntro: true,
  },
]

export const chatThreads = [
  {
    id: 'noah',
    name: 'Noah',
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    online: true,
    lastMessage: 'That playlist is unreal',
    lastMessageIcon: 'headphones',
    time: '2m',
    unread: 0,
    matchedOn: 'You matched on a blind voice intro',
    messages: [
      { id: 1, from: 'them', type: 'text', text: 'Okay your taste in music genuinely stopped me in my tracks.' },
      { id: 2, from: 'me', type: 'text', text: "Ha! High praise. What's the last song you had on repeat?" },
      { id: 3, from: 'them', type: 'voice', duration: '0:12' },
      { id: 4, from: 'me', type: 'text', text: 'That playlist is unreal 🎧 sending you mine now.' },
    ],
  },
  {
    id: 'mia',
    name: 'Mia',
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    online: false,
    lastMessage: 'Golden hour by the pier?',
    time: '1h',
    unread: 2,
    matchedOn: 'You matched on a blind voice intro',
    messages: [
      { id: 1, from: 'them', type: 'text', text: 'Are you a golden hour person or a blue hour person?' },
      { id: 2, from: 'me', type: 'text', text: 'Golden, no contest. Blue hour is for people with tripods and patience.' },
      { id: 3, from: 'them', type: 'text', text: 'Golden hour by the pier?' },
    ],
  },
  {
    id: 'sana',
    name: 'Sana',
    photo:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop',
    online: false,
    lastMessage: 'Voice note (0:12)',
    lastMessageIcon: 'mic',
    time: '3h',
    unread: 0,
    matchedOn: 'You matched on a blind voice intro',
    messages: [
      { id: 1, from: 'them', type: 'text', text: 'Big Coltrane or big Monk?' },
      { id: 2, from: 'me', type: 'voice', duration: '0:12' },
    ],
  },
  {
    id: 'leo',
    name: 'Leo',
    photo:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=200&auto=format&fit=crop',
    online: false,
    lastMessage: 'Ha, guilty. You?',
    time: '1d',
    unread: 0,
    matchedOn: 'You matched on a blind voice intro',
    messages: [
      { id: 1, from: 'me', type: 'text', text: 'Be honest, do you actually finish the climbs on your feed or is that day three of trying?' },
      { id: 2, from: 'them', type: 'text', text: 'Ha, guilty. You?' },
    ],
  },
]

export const blindDate = {
  chemistryScore: 92,
  age: 27,
  distanceKm: 3,
  interestHint: 'loves jazz',
  voiceDuration: '0:24',
  venue: {
    name: 'Lumière Wine & Vinyl',
    address: '14 Rue de la Lune',
    description: 'cozy, low-lit, great records',
    proposedTime: 'Fri · 8:00 PM',
    distance: '9 min · midpoint',
  },
}

export const stats = [
  { value: '2.4M', label: 'voice intros sent' },
  { value: '89%', label: 'reply within a day' },
]

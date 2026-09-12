const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="400" viewBox="0 0 900 400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a0f2e" />
      <stop offset="100%" stop-color="#0a0612" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ec4899" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#ec4899" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="900" height="400" fill="url(#bg)" />
  ${Array.from({ length: 14 })
    .map((_, i) => {
      const x = (i / 13) * 900
      return `<line x1="${x}" y1="0" x2="${x}" y2="400" stroke="#ec4899" stroke-opacity="0.14" stroke-width="1" />`
    })
    .join('')}
  ${Array.from({ length: 8 })
    .map((_, i) => {
      const y = (i / 7) * 400
      return `<line x1="0" y1="${y}" x2="900" y2="${y}" stroke="#a855f7" stroke-opacity="0.14" stroke-width="1" />`
    })
    .join('')}
  <path d="M0,120 L250,110 L300,180 L500,170 L560,260 L900,240" stroke="#ec4899" stroke-opacity="0.4" stroke-width="3" fill="none" />
  <path d="M0,300 L200,310 L340,240 L480,260 L650,150 L900,160" stroke="#a855f7" stroke-opacity="0.35" stroke-width="3" fill="none" />
  <path d="M120,0 L140,400" stroke="#ec4899" stroke-opacity="0.2" stroke-width="2" />
  <path d="M700,0 L680,400" stroke="#a855f7" stroke-opacity="0.2" stroke-width="2" />
  <circle cx="450" cy="200" r="150" fill="url(#glow)" />
</svg>
`.trim()

export default `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

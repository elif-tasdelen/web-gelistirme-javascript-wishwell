const CURTAIN_L = 'M80 98 Q66 116 63 148 L75 148 Q76 119 88 102 Z'
const CURTAIN_R = 'M160 98 Q174 116 177 148 L165 148 Q164 119 152 102 Z'
const FALL_L = 'M82 100 Q70 118 69 146'
const FALL_R = 'M158 100 Q170 118 171 146'
const JET_L = 'M120 58 Q107 36 96 92'
const JET_R = 'M120 58 Q133 36 144 92'
const STREAMS = [
  { id: 'fall-l', d: FALL_L, dur: '0.9s' },
  { id: 'fall-r', d: FALL_R, dur: '0.9s' },
  { id: 'jet-l', d: JET_L, dur: '1.1s' },
  { id: 'jet-r', d: JET_R, dur: '1.1s' },
]

const stop = (offset, color, opacity = 1) => (
  <stop offset={offset} style={{ stopColor: `var(--color-${color})`, stopOpacity: opacity }} />
)

function Droplets() {
  return STREAMS.flatMap(({ id, dur }) =>
    ['0s', '-0.45s'].map((begin) => (
      <circle key={`${id}${begin}`} r="1.6" className="droplet fill-white" opacity="0.85">
        <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
          <mpath href={`#${id}`} />
        </animateMotion>
      </circle>
    ))
  )
}

export default function WishingFountain({ glowing, dropId }) {
  const pool = glowing ? 'url(#pool-glow)' : 'url(#pool)'
  const edge = 'stroke-sand-400'

  return (
    <svg viewBox="0 0 240 200" className="w-64 max-w-full h-auto overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="pool" cx="50%" cy="35%" r="65%">
          {stop('0%', 'lagoon-200')}
          {stop('70%', 'lagoon-300')}
          {stop('100%', 'lagoon-500')}
        </radialGradient>
        <radialGradient id="pool-glow" cx="50%" cy="35%" r="65%">
          {stop('0%', 'sage-200')}
          {stop('70%', 'sage-300')}
          {stop('100%', 'sage-400')}
        </radialGradient>
        <linearGradient id="stone-wall" x1="0" y1="0" x2="1" y2="0">
          {stop('0%', 'sand-300')}
          {stop('30%', 'sand-100')}
          {stop('55%', 'sand-50')}
          {stop('100%', 'sand-300')}
        </linearGradient>
        <linearGradient id="stone-top" x1="0" y1="0" x2="0" y2="1">
          {stop('0%', 'sand-50')}
          {stop('100%', 'sand-200')}
        </linearGradient>
        <radialGradient id="orb" cx="35%" cy="30%" r="70%">
          {stop('0%', 'sand-50')}
          {stop('100%', 'sand-300')}
        </radialGradient>
        <radialGradient id="bush" cx="40%" cy="30%" r="75%">
          {stop('0%', 'sage-200')}
          {stop('100%', 'sage-400')}
        </radialGradient>
        <radialGradient id="ground" cx="50%" cy="50%" r="50%">
          {stop('0%', 'sand-400', 0.35)}
          {stop('100%', 'sand-400', 0)}
        </radialGradient>
        <linearGradient id="curtain" x1="0" y1="0" x2="0" y2="1">
          {stop('0%', 'lagoon-200', 0.95)}
          {stop('100%', 'lagoon-300', 0.5)}
        </linearGradient>
        <linearGradient id="jet" x1="0" y1="0" x2="0" y2="1">
          {stop('0%', 'lagoon-100')}
          {stop('100%', 'lagoon-300')}
        </linearGradient>
        {STREAMS.map(({ id, d }) => <path key={id} id={id} d={d} />)}
      </defs>

      {/* zemin gölgesi ve çalılar */}
      <ellipse cx="120" cy="190" rx="110" ry="12" fill="url(#ground)" />
      <g fill="url(#bush)">
        <circle cx="16" cy="176" r="12" opacity="0.85" />
        <circle cx="30" cy="166" r="14" />
        <circle cx="44" cy="180" r="10" />
        <circle cx="224" cy="176" r="12" opacity="0.85" />
        <circle cx="210" cy="166" r="14" />
        <circle cx="196" cy="180" r="10" />
      </g>
      <g className="fill-honey-200">
        <circle cx="24" cy="160" r="2.2" />
        <circle cx="12" cy="172" r="1.8" />
        <circle cx="216" cy="160" r="2.2" />
        <circle cx="228" cy="172" r="1.8" />
      </g>
      <g className="fill-white" opacity="0.9">
        <circle cx="36" cy="172" r="1.6" />
        <circle cx="204" cy="172" r="1.6" />
      </g>

      {/* taban ve havuzun arka kenarı */}
      <path d="M30 170 Q120 196 210 170 L214 178 Q120 206 26 178 Z"
            fill="url(#stone-top)" className={edge} strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="120" cy="148" rx="92" ry="18" fill="url(#stone-top)" className={edge} strokeWidth="1.5" />

      {/* havuz suyu */}
      <ellipse cx="120" cy="149" rx="84" ry="14" fill={pool} />
      <path d="M38 149 A82 13 0 0 1 202 149" fill="none" className="stroke-lagoon-700"
            strokeWidth="3" opacity="0.18" />
      <ellipse cx="152" cy="145" rx="24" ry="2.5" className="fill-white" opacity="0.35" />
      <g className="stroke-white" strokeWidth="1.5" strokeLinecap="round">
        <path className="shimmer" d="M96 152 h10" />
        <path className="shimmer" d="M140 156 h12" style={{ animationDelay: '0.8s' }} />
        <path className="shimmer" d="M112 159 h7" style={{ animationDelay: '1.6s' }} />
      </g>
      <g fill="none" className="stroke-white" strokeWidth="1.5">
        <ellipse className="splash" cx="69" cy="147" rx="9" ry="2.5" />
        <ellipse className="splash" cx="171" cy="147" rx="9" ry="2.5" style={{ animationDelay: '0.6s' }} />
      </g>

      {/* paranın düşüşü */}
      {dropId && (
        <g key={`drop-${dropId}`}>
          <ellipse className="ripple stroke-white" cx="88" cy="154" rx="22" ry="5" fill="none" strokeWidth="2.5" />
          {[-10, 2, 12].map((x) => (
            <circle key={x} className="splash-drop fill-white" cx="88" cy="152" r="1.8"
                    style={{ '--x': `${x}px` }} />
          ))}
        </g>
      )}

      {/* ayak (oymalı sütun) */}
      <ellipse cx="120" cy="150" rx="15" ry="2.5" className="fill-lagoon-700" opacity="0.25" />
      <path d="M106 151 Q111 144 111 136 V114 H129 V136 Q129 144 134 151 Z"
            fill="url(#stone-wall)" className={edge} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="108" y="124" width="24" height="5" rx="2.5" fill="url(#stone-top)" className={edge} strokeWidth="1.5" />
      <ellipse cx="120" cy="114" rx="14" ry="2.5" className="fill-sand-400" opacity="0.35" />

      {/* üst kase */}
      <ellipse cx="120" cy="96" rx="42" ry="8" fill="url(#stone-top)" className={edge} strokeWidth="1.5" />
      <ellipse cx="120" cy="96" rx="35" ry="5" fill={pool} />
      <path d="M78 96 A42 8 0 0 0 162 96 Q156 112 120 112 Q84 112 78 96 Z"
            fill="url(#stone-wall)" className={edge} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M82 98 A40 7 0 0 0 158 98" fill="none" className="stroke-white" strokeWidth="1.2" opacity="0.6" />

      {/* tepe */}
      <path d="M116 94 Q112 86 115.5 80 Q118 76 116.5 71 H123.5 Q122 76 124.5 80 Q128 86 124 94 Z"
            fill="url(#stone-wall)" className={edge} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="120" cy="65" r="6.5" fill="url(#orb)" className={edge} strokeWidth="1.5" />

      {/* fıskiye jetleri */}
      <g fill="none" strokeLinecap="round">
        <path d={JET_L} stroke="url(#jet)" strokeWidth="4" />
        <path d={JET_R} stroke="url(#jet)" strokeWidth="4" />
        <path d={JET_L} className="streak stroke-white" strokeWidth="1.2" opacity="0.8" />
        <path d={JET_R} className="streak stroke-white" strokeWidth="1.2" opacity="0.8"
              style={{ animationDelay: '-0.5s' }} />
      </g>

      {/* su perdeleri */}
      <path d={CURTAIN_L} fill="url(#curtain)" />
      <path d={CURTAIN_R} fill="url(#curtain)" />
      <g fill="none" className="stroke-white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
        <path d={FALL_L} className="streak" />
        <path d="M86 103 Q75 121 73 146" className="streak" style={{ animationDelay: '-0.4s' }} />
        <path d={FALL_R} className="streak" style={{ animationDelay: '-0.2s' }} />
        <path d="M154 103 Q165 121 167 146" className="streak" style={{ animationDelay: '-0.6s' }} />
      </g>
      <Droplets />

      {/* havuzun ön duvarı */}
      <path d="M28 148 A92 18 0 0 0 212 148 L206 172 Q120 196 34 172 Z"
            fill="url(#stone-wall)" className={edge} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M33 155 A90 17 0 0 0 207 155" fill="none" className="stroke-sand-400"
            strokeWidth="2" opacity="0.35" />
      <path d="M34 151 A88 16 0 0 0 206 151" fill="none" className="stroke-white"
            strokeWidth="1.5" opacity="0.55" />
    </svg>
  )
}
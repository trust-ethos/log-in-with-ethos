// Ethos User type from API
export interface EthosUser {
  id: number
  profileId: number
  displayName: string
  username?: string
  avatarUrl?: string
  description?: string
  score: number
  status: string
  links?: {
    profile?: string
    scoreBreakdown?: string
  }
}

// Score ranges from Ethos
const scoreRanges = {
  untrusted: { min: 0, max: 799 },
  questionable: { min: 800, max: 1199 },
  neutral: { min: 1200, max: 1399 },
  known: { min: 1400, max: 1599 },
  established: { min: 1600, max: 1799 },
  reputable: { min: 1800, max: 1999 },
  exemplary: { min: 2000, max: 2199 },
  distinguished: { min: 2200, max: 2399 },
  revered: { min: 2400, max: 2599 },
  renowned: { min: 2600, max: 2800 },
} as const

// Score colors (dark theme) from Ethos
const scoreLevelColors = {
  untrusted: '#b72b38',
  questionable: '#C29010',
  neutral: 'rgba(193, 192, 182, 1)',
  known: '#7C8DA8',
  established: '#4E86B9',
  reputable: '#2E7BC3',
  exemplary: '#427B56',
  distinguished: '#127f31',
  revered: '#836DA6',
  renowned: '#7A5EAF',
} as const

type ScoreLevel = keyof typeof scoreRanges

function getScoreLevel(score: number): ScoreLevel {
  for (const [level, range] of Object.entries(scoreRanges)) {
    if (score >= range.min && score <= range.max) {
      return level as ScoreLevel
    }
  }
  return score > 2800 ? 'renowned' : 'untrusted'
}

function getScoreColor(score: number): string {
  const level = getScoreLevel(score)
  return scoreLevelColors[level]
}

// ---------------------
// Components
// ---------------------

export function EthosLogo({ size = 64 }: { size?: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 512 512'
      width={size}
      height={size}
      className='ethos-logo'
    >
      <rect width='512' height='512' fill='#1F2125' rx='100' />
      <path
        fill='#C1C0B6'
        fillRule='evenodd'
        d='M255.38 255.189a254.98 254.98 0 0 1-1.935 31.411H101v62.2h136.447a251.522 251.522 0 0 1-35.932 62.2H411v-62.2H237.447a250.584 250.584 0 0 0 15.998-62.2H411v-62.2H253.521a250.604 250.604 0 0 0-15.826-62.2H411V100H202.003a251.526 251.526 0 0 1 35.692 62.2H101v62.2h152.521a255 255 0 0 1 1.859 30.789Z'
        clipRule='evenodd'
      />
    </svg>
  )
}

export function EthosProfileCard({ user }: { user: EthosUser }) {
  const scoreColor = getScoreColor(user.score)
  const scoreLevel = getScoreLevel(user.score)

  return (
    <div className='profile-card'>
      {user.avatarUrl && (
        <img src={user.avatarUrl} alt={user.displayName} className='profile-avatar' />
      )}
      <div className='profile-info'>
        <h2 className='profile-name'>
          {user.links?.profile
            ? (
              <a href={user.links.profile} target='_blank' rel='noopener noreferrer'>
                {user.displayName}
              </a>
            )
            : (
              user.displayName
            )}
          {user.username && <span className='profile-username'>@{user.username}</span>}
        </h2>
        {user.profileId && <p className='profile-id'>Profile ID: {user.profileId}</p>}
        {user.description && <p className='profile-description'>{user.description}</p>}
        <p className='profile-score'>
          Credibility Score: <strong style={{ color: scoreColor }}>{user.score}</strong>{' '}
          <span className='score-level' style={{ color: scoreColor }}>
            ({scoreLevel})
          </span>
        </p>
      </div>
    </div>
  )
}

export function LoginButton({ onClick }: { onClick: () => void }) {
  return (
    <button type='button' onClick={onClick}>
      Log in with Ethos
    </button>
  )
}

export function LogoutButton({ onClick }: { onClick: () => void }) {
  return (
    <button type='button' onClick={onClick}>
      Logout
    </button>
  )
}

export function EthosEverywhereIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 27 27'
      fill='none'
    >
      <g clipPath='url(#ethos-everywhere-clip)'>
        <path
          d='M26.907 26.998H5.788V21.72h5.274v-5.28H5.788v-5.282h5.274v-5.28H5.788V.598h21.12V27ZM5.788 21.72H.503v-5.28h5.285v5.28Zm0-10.562H.503v-5.28h5.285v5.28Z'
          fill='url(#ethos-everywhere-gradient)'
        />
      </g>
      <defs>
        <linearGradient
          id='ethos-everywhere-gradient'
          x1='15.742'
          y1='24.299'
          x2='29.949'
          y2='-.863'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#c16e15' />
          <stop offset='1' stopColor='#f6a70c' />
        </linearGradient>
        <clipPath id='ethos-everywhere-clip'>
          <path fill='#fff' d='M.501.6H26.9V27H.501z' />
        </clipPath>
      </defs>
    </svg>
  )
}

export function WalletAddress({ address }: { address?: string }) {
  return (
    <div className='wallet-address'>
      <span className='wallet-label'>
        <EthosEverywhereIcon size={18} />
        Ethos Everywhere wallet:
      </span>
      <code>{address ?? 'Not connected'}</code>
    </div>
  )
}

export function LoadingMessage({ message = 'Loading...' }: { message?: string }) {
  return <p>{message}</p>
}

export function GitHubLink() {
  return (
    <a
      href='https://github.com/videvian/log-in-with-ethos'
      target='_blank'
      rel='noopener noreferrer'
      className='github-link'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
      </svg>
      View on GitHub
    </a>
  )
}

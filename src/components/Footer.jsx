import { profile } from '../data/content'
import { scrollToId } from '../lib/hooks'
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon } from './Icons'

export default function Footer({ onResume }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <hr className="rule" />

        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-name">{profile.name}</p>
            <p className="footer-role mono dim">{profile.headline}</p>
          </div>

          <nav className="footer-links" aria-label="Elsewhere">
            <a
              className="btn btn--ghost btn--icon"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <GithubIcon />
            </a>
            <a
              className="btn btn--ghost btn--icon"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon />
            </a>
            <a
              className="btn btn--ghost btn--icon"
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.email}`}
            >
              <MailIcon />
            </a>
            <button
              type="button"
              className="btn btn--ghost btn--icon"
              onClick={onResume}
              aria-label="View résumé"
            >
              <DownloadIcon />
            </button>
          </nav>
        </div>

        <div className="footer-bottom">
          <span className="footer-note mono dim">© {year} {profile.name}</span>
          <button className="tlink" onClick={() => scrollToId('home')}>
            Back to top <span className="arr" aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

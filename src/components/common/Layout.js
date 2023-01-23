import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { FaFacebook, FaInstagram, FaTwitter, FaRss } from 'react-icons/fa'

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null
    const anualInform = 'https://drive.google.com/file/d/1xhJAbDHjSgcC9S_CBOXRJD3E7bZqLo42/view'
    const bandInform = 'https://drive.google.com/file/d/109n7W4EjGFGpWaFT-o13Ifr4XQSqwMXb/view'
    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className={isHome ? `site-head` : `site-head head-mini`} >
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        {site.logo ?
                                            <img className="site-logo" src={site.logo} alt={site.title} />
                                            : <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                                        }
                                    </Link>
                                </div>
                                <div className="site-mast-right">
                                    { site.twitter && <a href={ twitterUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><FaTwitter className="site-nav-icon" alt="Twitter" /></a>}
                                    { site.facebook && <a href={ facebookUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><FaFacebook className="site-nav-icon" alt="Facebook" /></a>}
                                    <a href="https://www.instagram.com/fueracloset_ac" className="site-nav-item" target="_blank" rel="noopener noreferrer"><FaInstagram className="site-nav-icon" alt="Facebook" /></a>
                                    <a className="site-nav-item" href={ `https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/` } target="_blank" rel="noopener noreferrer"><FaRss className="site-nav-icon" alt="RSS Feed" /></a>
                                </div>
                            </div>
                            { isHome ?
                                <div className="site-banner">
                                    <img src={data.Banner.publicURL} alt="Fuera del Clóset"/>
                                </div> :
                                null}
                            <nav className="site-nav">
                                <div className="site-nav-left">
                                    {/* The navigation items as setup in Ghost */}
                                    <Navigation data={site.navigation} navClass="site-nav-item" />
                                    <Link className="site-nav-item" to="/galeria" key={0 + site.navigation.length}>Galería</Link>
                                    <Link className="site-nav-item" to="/eventos" key={1 + site.navigation.length}>Eventos</Link>
                                    <Link className="site-nav-item" to="/alertafdc" key={2 + site.navigation.length}>#AlertaFDC</Link>
                                </div>
                                <div className="site-nav-right">
                                    <Link className="site-nav-button" to="/acercade">Acerca De</Link>
                                    <Link
                                        className="site-nav-button download"
                                        to={anualInform}
                                        target="_blank"
                                    >
                                        Descarga Nuestro Informe Anual
                                    </Link>
                                    <Link
                                        className="site-nav-button download"
                                        to={bandInform}
                                        target="_blank"
                                    >
                                        Informe Bandos Municipales
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </header>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>

                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">{site.title}</Link> © 2019 &mdash; Published with <a className="site-foot-nav-item" href="https://ghost.org" target="_blank" rel="noopener noreferrer">Ghost</a>
                            </div>
                            <div className="site-foot-nav-right">
                                <Navigation data={site.navigation} navClass="site-foot-nav-item" />
                            </div>
                        </div>
                    </footer>

                </div>
            </div>

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
        Banner: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                Banner: file(relativePath: { eq: "Banner.png" }) {
                    publicURL
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery

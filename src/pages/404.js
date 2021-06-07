import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Layout } from '../components/common'
import "../styles/notFound.scss"
const NotFoundComponent = ({ data }) => {
    console.log(data)
    return (
        <Layout>
            <div className="container">
                <article className="content" style={{ textAlign: `center` }}>
                    <h1 className="content-title">Error 404</h1>
                    <section className="content-body">
                        No pudimos encontrar lo que buscas. Pero aquí hay unas
                        cuantas páginas que te pueden interesar
                        <Link to="/">Noticias</Link>
                        <Link to="/acercade">¿Quiénes somos?</Link>
                        <div className="image_container">
                            <img className="notFound_image" src={data.notFound.childImageSharp.fluid.src} />
                        </div>
                    </section>
                </article>
            </div>
        </Layout>
    )
}

NotFoundComponent.propTypes = {
    data: PropTypes.shape({
        notFound: PropTypes.object.isRequired,
    }).isRequired,
}

const NotFoundPage = props => (
    <StaticQuery
        query={graphql`
      query {
        notFound: file(relativePath: { eq: "errors/Error404.png" }) {
            childImageSharp{
                        fluid{
                            src
                        }
                    }
                }
            }
    `}
        render={data => <NotFoundComponent data={data} {...props} />}
    />
)

export default NotFoundPage

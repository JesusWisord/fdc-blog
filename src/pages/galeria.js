import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Layout } from '../components/common'
import Lightbox from '../components/Lightbox'
import PropTypes from 'prop-types'

const GalleryComponent = ({ images }) => (
    <Layout isHome>
        <div className="container">
            <h1>Galería de actividades</h1>
        </div>
        <Lightbox Images={ images } />
    </Layout>
)

GalleryComponent.propTypes = {
    images: PropTypes.array.isRequired,
}

const GalleryPage = props => (
    <StaticQuery
        query={graphql`
      query {
        images: 
            allFile(filter: {
                extension: {regex: "/(jpg)|(jpeg)|(png)/"}, 
                relativeDirectory: {eq: "gallery"}}) {
                edges{
                    node{
                        publicURL
                    }
                }
            }
    }
    `}
        render={data => <GalleryComponent {...props} images={data.images.edges} />}
    />
)

export default GalleryPage

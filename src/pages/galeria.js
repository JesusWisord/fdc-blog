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
        {/* <Lightbox Images={ images } /> */}
    </Layout>
)

GalleryComponent.propTypes = {
    images: PropTypes.array.isRequired,
}

export default GalleryComponent

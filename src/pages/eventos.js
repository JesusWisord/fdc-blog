import React, { useState } from "react"
import { StaticQuery, graphql } from 'gatsby'
import { Layout } from '../components/common'
import '../styles/events.scss'

import PropTypes from 'prop-types'

const EventsComponent = ({ Images }) => {
    let [showLightbox, setLightbox] = useState(false)
    let [selectedImage, setSelectedImage] = useState(null)
    return (
        <Layout isHome>
            <div className="container">
                <h1>Próximos eventos</h1>
            </div>
            <div className="eventContainer">
                {Images.map(image => (
                    <div 
                        key={image.node.childImageSharp.fluid.src} 
                        className="eventImage"
                        onClick = { () => {
                            setLightbox(true) 
                            setSelectedImage(image)
                        }}
                    >
                        <img src={image.node.childImageSharp.fluid.src} />
                    </div>
                ))}
            </div>
        </Layout>
    )
}

EventsComponent.propTypes = {
    Images: PropTypes.array.isRequired,
}

const EventPage = props => (
    <StaticQuery
        query={graphql`
      query {
        Images: 
            allFile(filter: {
                extension: {regex: "/(jpg)|(jpeg)|(png)/"}, 
                relativeDirectory: {eq: "events"}}) {
                edges{
                    node{
                        childImageSharp{
                            fluid(maxWidth: 2000){
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
    }
    `}
        render={data => <EventsComponent {...props} Images={data.Images.edges} />}
    />
)

export default EventPage

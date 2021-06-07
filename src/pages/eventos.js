import React from "react"
import { StaticQuery, graphql } from 'gatsby'
import { Layout } from '../components/common'
import '../styles/events.scss'

import PropTypes from 'prop-types'

const EventsComponent = ({ Images }) => (
    <Layout isHome>
        <div className="container">
            <h1>Próximos eventos</h1>
            {
                Images.length > 0 ?
                    <div className="eventContainer">
                        {Images.map(image => (
                            <div 
                                key={image.node.childImageSharp.fluid.src} 
                                className="eventImage"
                            >
                                <img src={image.node.childImageSharp.fluid.src} />
                            </div>
                        ))}
                    </div>
                    :
                    <h2>Espera la actualización de los próximos eventos</h2>
            }
        </div>
    </Layout>
)

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

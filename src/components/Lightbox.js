import React, { useState } from "react"
import PropTypes from "prop-types"
import '../styles/Lightbox.scss'

const Lightbox = ({ Images }) => {
    let [showLightbox, setLightbox] = useState(false)
    let [selectedImage, setSelectedImage] = useState(null)
    return (
        <>
            <div className="galleryContainer">
                {Images.map(image => (
                    <div 
                        key={image.node.childImageSharp.fluid.src} 
                        className="galleryImage"
                        onClick = { () => {
                            setLightbox(true) 
                            setSelectedImage(image)
                        }}
                    >
                        <img src={image.node.childImageSharp.fluid.src} />
                    </div>
                ))}
            </div>
            {showLightbox && (
                <div className="imageModal" onClick={() => setLightbox(false)}>
                    <img
                        className="image" 
                        src={selectedImage.node.childImageSharp.fluid.src} />
                    <button className="buttonModal">
                        X
                    </button>
                </div>
            )}
        </>
    )
}

Lightbox.propTypes = {
    Images: PropTypes.array.isRequired, 
}

export default Lightbox

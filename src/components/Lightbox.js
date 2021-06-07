import React, { useState } from "react"
import PropTypes from "prop-types"
import { ImCross } from 'react-icons/im'
import { BsChevronCompactRight, BsChevronCompactLeft } from 'react-icons/bs'
import '../styles/Lightbox.scss'

const Lightbox = ({ Images }) => {
    let [showLightbox, setLightbox] = useState(false)
    let [selectedImageIndex, setSelectedImageIndex] = useState(null)
    return (
        <>
            <div className="galleryContainer">
                {Images.map((image, index) => (
                    <div 
                        key={image.node.publicURL}
                        className="galleryImage"
                        onClick = { () => {
                            setLightbox(true) 
                            setSelectedImageIndex(index)
                        }}
                    >
                        <img src={image.node.publicURL} />
                    </div>
                ))}
            </div>
            {showLightbox && (
                <div className="imageModal" >
                    <div className="buttonModal" onClick={() => setLightbox(false)}>
                        <button>
                            <ImCross />
                        </button>
                    </div>
                    <div className="modalContainer">
                        <button
                            onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                            disabled={selectedImageIndex === 0}
                        >
                            <BsChevronCompactLeft 
                                className="arrow_icon" 
                            />
                        </button>
                        <div className="imageContainer">
                            <img
                                className="image" 
                                src={Images[selectedImageIndex].node.publicURL} />
                        </div>
                        <button
                            onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                            disabled={selectedImageIndex === (Images.length - 1)}
                        >
                            <BsChevronCompactRight
                                className="arrow_icon"
                                disabled={selectedImageIndex === 0}
                            />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

Lightbox.propTypes = {
    Images: PropTypes.array.isRequired, 
}

export default Lightbox

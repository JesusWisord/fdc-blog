import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const AboutPage = () => (
    <Layout isHome>
        <div className="container">
            <h1>¿Quiénes somos?</h1>
            <p>
                Somos una organización de la sociedad civil, 
                orientada a la promoción de los derechos humanos 
                de la diversidad sexual y de género. Brindar asesoría 
                a las personas de la población LGBTTTI, además de realizar 
                acciones políticas, artísticas, audiovisuales y culturales 
                que coadyuven a disminuir, prevenir y atender la discriminación 
                hacia las personas LGBTTTI en el Estado de México.
            </p>
            <h2>Visión</h2>
            <p>
                Convertirnos en un referente en la defensa de los derechos 
                humanos de la población LGBTTTI en el Estado de México. 
                Consolidarnos como un proyecto audiovisual que visibiliza 
                a la población LGBTTTI sin estereotipos, libre de prejuicios 
                y con perspectiva de género.
            </p>
        </div>
    </Layout>
)

export default AboutPage

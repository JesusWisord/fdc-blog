import React from 'react'
import { Layout } from '../components/common'
import '../styles/alertafdc.scss'

const ContactForm = () => (
    <Layout isHome>
        <div className="container">
            <h1>Formulario de contacto</h1>
            <form action="https://submit-form.com/OhrIHjNk">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" placeholder="Nombre" required="" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" required="" />
                <label htmlFor="message">Comentarios</label>
                <textarea
                    id="message"
                    name="message"
                    placeholder="Comentarios"
                    required=""
                ></textarea>
                <button type="submit">Enviar</button>
            </form>
        </div>
    </Layout>
)

export default ContactForm
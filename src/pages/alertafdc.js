import React from 'react'
import { Layout } from '../components/common'
import { FormGroup,
    FormControl, Validators, FieldGroup, FieldControl } from "react-reactive-form"
import { useFormspark } from "@formspark/use-formspark"
import '../styles/alertafdc.scss'

const ContactForm = () => {
    const [submit, submitting] = useFormspark({
        formId: `OhrIHjNk`,
    })
    const contactForm = new FormGroup({
        name: new FormControl(``, Validators.required),
        email: new FormControl(``, [Validators.required, Validators.email]),
        phone: new FormControl(``),
        pronouns: new FormControl(``),
        place: new FormControl(``),
        orientation: new FormControl(``),
        gender: new FormControl(``),
        message: new FormControl(``, Validators.required),
    })

    const handleSubmit = async (e, value) => {
        console.log(value)
        e.preventDefault()
        await submit({ value })
    }

    const ORIENTATIONS = [
        `lesbiana`,
        `gay`,
        `heterosexual`,
        `bisexual`,
        `asexual`,
        `pansexual`,
    ]

    const IDENTITIES = [
        `hombre cis`,
        `mujer cis`,
        `mujer trans`,
        `hombre trans`,
        `no binaria`,
    ]

    return (
        <Layout isHome>
            <div className="container">
                <h1>Formulario de contacto</h1>
                <p>
                    Si quieres dejar un comentario o contactarnos por algún caso de
                    discriminación o ayuda de algún tipo por favor déjanos tus datos
                    y nos contactaremos a la brevedad. Recuerda que nuestras redes
                    sociales también están disponibles para cualquier asunto.
                </p>
                <FieldGroup
                    control={contactForm}
                    render={({ get, invalid, value }) => (
                        <form onSubmit={e => handleSubmit(e, value)}>
                            <FieldControl
                                name="name"
                                render={({ handler, touched, hasError }) => (
                                    <>
                                        <label htmlFor="name">Nombre (*)</label>
                                        <input id="name" {...handler()}/>
                                        <span className="error">
                                            {touched
                                            && hasError(`required`)
                                            && `El nombre es requerido`}
                                        </span>
                                    </>  
                                )}
                            />
                            <FieldControl
                                name="email"
                                render={({ handler, touched, hasError }) => (
                                    <>
                                        <label htmlFor="email">Correo Electrónico (*)</label>
                                        <input id="email" {...handler()}/>
                                        <span className="error">
                                            {touched
                                            && hasError(`email`)
                                            && `El correo electrónico ingresado no es válido`}
                                        </span>
                                        <span className="error">
                                            {touched
                                            && hasError(`required`)
                                            && `El correo electrónico es requerido`}
                                        </span>
                                    </>  
                                )}
                            />
                            <FieldControl
                                name="phone"
                                render={({ handler }) => (
                                    <>
                                        <label htmlFor="phone">Teléfono de Contacto</label>
                                        <input id="phone" {...handler()}/>
                                    </>  
                                )}
                            />
                            <FieldControl
                                name="pronouns"
                                render={({ handler }) => (
                                    <>
                                        <label htmlFor="pronouns">Pronombres</label>
                                        <input id="pronouns" {...handler()}/>
                                    </>  
                                )}
                            />
                            <FieldControl
                                name="place"
                                render={({ handler }) => (
                                    <>
                                        <label htmlFor="place">Lugar de Procedencia</label>
                                        <input id="place" {...handler()}/>
                                    </>  
                                )}
                            />
                            <FieldControl
                                name="orientation"
                                render={({ handler, touched }) => (
                                    <>
                                        <label htmlFor="orientation">Orientación Sexual</label>
                                        <select id="orientation" {...handler()}>
                                            <option value="" selected disabled hidden>Selecciona una opción</option>
                                            <option value="lesbiana">Lesbiana</option>
                                            <option value="gay">Gay</option>
                                            <option value="heterosexual">Heterosexual</option>
                                            <option value="bisexual">Bisexual</option>
                                            <option value="asexual">Asexual</option>
                                            <option value="pansexual">Pansexual</option>
                                            <option value="otra">Otra</option>
                                        </select>
                                        {
                                            touched && !ORIENTATIONS.includes(value.orientation) &&
                                            <>
                                                <label htmlFor="orientation_otro">Especifique</label>
                                                <input 
                                                    id="orientation_otro"
                                                    {...handler()}
                                                />
                                            </>
                                        }
                                    </>  
                                )}
                            />
                            <FieldControl
                                name="gender"
                                options={{
                                    updateOn: `submit`,
                                }}
                                render={({ handler, touched }) => (
                                    <>
                                        <label htmlFor="gender">Identidad de Género</label>
                                        <select id="gender" {...handler()}>
                                            <option value="" selected disabled hidden>Selecciona una opción</option>
                                            <option value="hombre cis">Hombre Cisgénero</option>
                                            <option value="mujer cis">Mujer Cisgénero</option>
                                            <option value="mujer trans">Mujer Transexual/Transgenero</option>
                                            <option value="hombre trans">Hombre Transexual/Transgenero</option>
                                            <option value="no binaria">Persona No Binaria/ Queer</option>
                                            <option value="">Otra</option>
                                        </select>
                                        {
                                            touched && !IDENTITIES.includes(value.orientation) &&
                                            <>
                                                <label htmlFor="identidad_otra">Especifique</label>
                                                <input 
                                                    id="identidad_otra"
                                                    {...handler()}
                                                />
                                            </>
                                        }
                                    </>  
                                )}
                            />
                            <FieldControl
                                name="message"
                                render={({ handler, touched, hasError }) => (
                                    <>
                                        <label htmlFor="message">Mensaje (*)</label>
                                        <textarea
                                            id="message"
                                            {...handler()}
                                        />
                                        <span className="error">
                                            {touched
                                        && hasError(`required`)
                                        && `El comentario es requerido`}
                                        </span>
                                    </>
                                )}
                            />
                            <button
                                type="submit"
                                disabled={invalid || submitting}
                            >
                                {invalid ? `Por favor llena los campos con asteriscos` : `Enviar`}
                            </button>
                        </form>
                    )}
                />
            </div>
        </Layout>
    )
}
export default ContactForm
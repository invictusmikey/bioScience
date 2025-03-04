import './Welcometext.css'
import infraBio from '../../assets/infraBio.jpg'

export const Welcometext = () => {
    return (
        <div className="wText">
            <h2 className="Texto">
                ¡Hola! Bienvenido. Este software está diseñado para la gestión de insumos y máquinas del área biomédica.
            </h2>

           
            <div className="containerLinks">
                <div className="row">
                    <a ><img src={infraBio} alt="Equipos de biomedica" /></a>
                    
                </div>
               
            </div>
        </div>

    )
}

import React, { useState } from 'react'

export const ButtonCalculateF = ({ cantidadUno, cantidadDos, resultado , url}) => {

    

    const [isCalculoFinal,setIscalculoFinal] = useState(0)

   
    const calculoFinal = () => {

        isCalculoFinal = cantidadUno - cantidadDos 
        resultado = isCalculoFinal
        setIscalculoFinal = useState(isCalculoFinal) 
    }

    return (

        <div>

            <button onClick={calculoFinal}> calculo inventario final </button>

        </div>
    )
}

// EscalaContext.jsx
import { createContext, useState } from "react";

const EscalaContext = createContext()

function EscalaProvider({children}) {
    const [dataBase, setDataBase] = useState(new Date(2026,5,15))
    const [diasServico, setDiasServico] = useState(12)
    const [diasFolga, setDiasFolga] = useState(2)

    function definirConfigEscalaDeServico(newDataBase, newDiasServico, newDiasFolga) {
        setDataBase(newDataBase)
        setDiasServico(newDiasServico)
        setDiasFolga(newDiasFolga)
    }

    return(
        <EscalaContext.Provider value={{dataBase, diasServico, setDiasServico, diasFolga, definirConfigEscalaDeServico}}>
            {children}
        </EscalaContext.Provider>
    )
}

export { EscalaContext, EscalaProvider }
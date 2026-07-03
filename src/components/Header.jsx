// Header.jsx
import {FaBars} from 'react-icons/fa'
import logoSkala from '../assets/logoSkala.png'

function Header() {
    return(
        <header>
            <div className="container">
                <div>
                    {/* <FaBars size={22}/> */}
                    <img className='logo' src={logoSkala} alt="logoSkala" />
                    <h1>Skaladin</h1>
                </div>
                <nav>
                    {/* <FaBars size={22}/> */}
                </nav>
            </div>
        </header>
    )
}

export default Header
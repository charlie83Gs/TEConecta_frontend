import React from 'react'; // we need this to make JSX compile
import { Route } from "react-router-dom";
type HeaderProps = {
  title: string
}

const Header = 
({ title }: HeaderProps) => {
        return(
        <div className="header_container">
            <h2 className="p-3 d-inline" >{ "TEConecta - " + title }</h2>
            <Route render={({ history}) => (
            <button 
              style={{"position":"absolute","top":"1rem","right":"1rem"}}
              className="mr-4 ml-4 green teconecta_button mid_lenght"
              onClick={()=>{history.goBack()}}
              >
                Volver
            </button>
              )} />
        </div>
        )  
    }

    interface LoginProps {
    
    }

export default Header;
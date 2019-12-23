import React from 'react'; // we need this to make JSX compile

type HeaderProps = {
  title: string
}

const Header = 
({ title }: HeaderProps) => {
        return(
        <div className="header_container">
            <h2 className="p-3">{ "TEConecta - " + title }</h2>
        </div>
        )  
    }

    interface LoginProps {
    
    }

export default Header;
import React from 'react'; // we need this to make JSX compile

type CardProps = {
  title: string,
  paragraph: string
}

const NewCard = 
({ title, paragraph }: CardProps) => {
        return(
        <aside>
            <h2>{ title }</h2>
            <p>{ paragraph }</p>
        </aside>
        )  
    }

    
export default NewCard;

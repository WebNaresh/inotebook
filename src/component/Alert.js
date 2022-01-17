import React from 'react'



export default function Alert(props) {

    const capatiilize = (word) =>{
        // console.log(word);
        if (word ==="danger") {
            word = "error"
            
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        props.alert && <div className={`container alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capatiilize(props.alert.type)} </strong>: {props.alert.msg}
            </div>
    )
}
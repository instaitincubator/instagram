import { FC } from "react"



interface DirectionProps {
    message: string
}
//props  = message parameter     f(message)
const Direction: FC<DirectionProps> = (props) => {

    return (
        <div>



            {props.message}
        </div>
    )
}



 export function Homes(){
    return(
    
    <div>


{/* //Direction(wqwq) */}

<Direction  message="wqwq"/>

    </div>
    
)
}
// Type '{}' is not assignable to type 'ReactNode'.
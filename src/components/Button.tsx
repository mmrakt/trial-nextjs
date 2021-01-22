import React from 'react'

type IProps = {
    name: string
    onClickEvent: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => Promise<void> | void
}
const Button = (props: IProps): React.ReactElement => {
    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded"
                onClick={props.onClickEvent}
            >
                {props.name}
            </button>
        </div>
    )
}

export default Button

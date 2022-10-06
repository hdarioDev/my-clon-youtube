import React from 'react'

const App = () => {
    return (
        <div className='container mx-auto'>
            <h1 className='underline'>Tailwind CSS</h1>
            <h2>Incorporado con PostCss</h2>
            <button className="btn btn-blue btn-blue:hover">Botón</button>
            <div className="my-5 flex flex-wrap -mx-2">
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 my-2">
                    <h2 className="underline">Hello</h2>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 my-2">
                    <h2>Hello</h2>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 my-2">
                    <h2>Hello</h2>
                </div>
            </div>
        </div>
    )
}

export default App
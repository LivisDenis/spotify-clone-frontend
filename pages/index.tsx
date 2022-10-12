import MainLayouts from "../layouts/MainLayouts";
import React from "react";

const Index = () => {
    return (
        <>
            <MainLayouts>
                <div className='welcome'>
                    <h1>Добро пожаловать!</h1>
                    <h2>Здесь собраны самые лучшие треки</h2>
                </div>
            </MainLayouts>
            <style jsx>
                {`
                  .welcome {
                    display: flex;
                    flex-direction: column;
                    justify-content:center;
                    align-items: center;
                    margin-top: 150px;
                  }
                  h1 {
                    font-size: 45px;
                  }
                `}
            </style>
        </>
    );
};

export default Index;
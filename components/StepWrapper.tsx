import React, {FC} from "react";
import {Card, Grid, Step, StepLabel, Stepper} from "@mui/material";

interface StepWrapperProps {
    activeStep: number
    children: React.ReactNode | React.ReactChild
}

const steps = ['Информация о треке', 'Загрузить обложку', 'Загрузить трек']
const StepWrapper: FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <>
            <Stepper activeStep={activeStep}>
                {steps.map((step, i) =>
                    <Step key={i}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" style={{margin: '70px 0 ', height: 270}}>
                <Card style={{width: 600}}>
                    {children}
                </Card>
            </Grid>
        </>
    );
};

export default StepWrapper;
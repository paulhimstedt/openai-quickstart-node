import {Button, Grid, Card, Text, Col, Spacer } from "@nextui-org/react";


const MockItem = ({ text }) => {
    return (
        <Card css={{ h: "$60", $$cardColor: '$colors$primary' }}>
            <Card.Body>
                <Text h6 size={14} color="white" css={{ m: 0 }}>
                    {text}
                </Text>
            </Card.Body>
        </Card>
    );
};
const HowTo = () => {
    return <>

        
        <Grid.Container gap={5} justify="center">
        <Col justify="center" align="center">
        <Spacer y={4} />
            <Text h2 size={35}>
                How does it work?
            </Text>
            <Spacer y={2} />
        </Col>
            <Grid xs={6} md={4.1}>
                <MockItem text="Step1" />
            </Grid>
            <Grid xs={6} md={4.1}>
                <MockItem text="Step2" />
            </Grid>
            <Grid xs={6} md={4.1}>
                <MockItem text="Step3" />
            </Grid>
            <Grid xs={6} md={4.1}>
                <MockItem text="Step4" />
            </Grid>
            <Col justify="center" align="center">
            <Spacer y={1} />
            <Button size="lg" shadow color="gradient">Start Generating Emails Now</Button>
            
            </Col>
            
        </Grid.Container>
    </>
}


export default HowTo;
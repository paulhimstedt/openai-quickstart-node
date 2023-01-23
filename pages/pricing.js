import React from 'react';
import {
    Link,
    Spacer,
    Button,
    Col,
    Row,
    Checkbox,
    Container,
} from '@nextui-org/react';
import NavBar from './components/navbar';
import { Grid, Card, Text } from "@nextui-org/react";
//import { useMediaQuery } from './useMediaQuery.js'

//const isMd = useMediaQuery(960);

const MockItem = ({ text }) => {
    return (
        <Card>
            <Card.Body>
                <Text h6 size={15} color="white" css={{ m: 0 }}>
                    {text}
                </Text>
                <Card.Divider />
                <Text h6 size={15} color="white" css={{ m: 0 }}>
                    {text}
                </Text>
                <Card.Divider />
                <Text h6 size={15} color="white" css={{ m: 0 }}>
                    {text}
                </Text>
                <Card.Divider />
                <Text h6 size={15} color="white" css={{ m: 0 }}>
                    {text}
                </Text>
            </Card.Body>
        </Card>
    );
};


export default function Pricing() {
    return (<>
        <NavBar />
        <Grid.Container gap={5} justify="center">
        <Col justify="center" align="center">
        <Spacer y={4} />
            <Text h2 size={35}>
                Pricing exactly for Your Needs
            </Text>
            <Spacer y={2} />
        </Col>
            <Grid xs={6} md={4.1}>
                <MockItem text="Step1" />
            </Grid>
            <Grid xs={6} md={4.1}>
                <MockItem text="Step2" />
            </Grid>
            
            <Col justify="center" align="center">
            
            </Col>
            
        </Grid.Container>
    </>
    );
}

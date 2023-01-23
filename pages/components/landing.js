import * as React from 'react';
import { Spacer, Container, Card, Row, Text, Button, Col } from "@nextui-org/react";

const Landing = () => {
  return <>
    <Container sm>
      <Spacer y={4} />
      <Card>
        <Card.Body>
          <Col justify="center" align="center">
            <Spacer y={3} />
            <Text h1 size={35} css={{ m: 0 }}>
              Create Engaging Emails with AI Technology - Start for Free
            </Text>
            <Spacer y={1} />
            <Text h2 size={20} css={{ m: 0, p: "3%" }}>
              Unlock the power of AI technology to automatically generate customizable emails that engage with your audience. Explore the possible use cases and start generating emails now with our free trial.
            </Text>
            <Spacer y={1} />
            <Button shadow color="gradient">Start Generating Emails Now</Button>
          </Col>
        </Card.Body>
      </Card>
      <Spacer y={1} />
    </Container>
  </>

}
export default Landing;

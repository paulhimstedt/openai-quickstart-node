import Head from "next/head";
import { useState } from "react";
import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Col, Textarea, Switch, Input, Card, Button, Text, Row, Spacer, Grid, Checkbox, Navbar,  Progress, Link, Popover, ShopCard } from "@nextui-org/react";
import dynamic from 'next/dynamic'
import { motion } from "framer-motion";
import { useTheme as useNextTheme } from 'next-themes'
import { useCallback, useEffect } from 'react';
import { SunIcon } from './components/SunIcon';
import { MoonIcon } from './components/MoonIcon';
//import { Link } from 'react-router-dom';
//import {Link as LoginLink} from 'next/link';
// Select the button


export default function Home() {

  const [selected, setSelected] = useState([""]);
  const { setTheme } = useNextTheme();
  const [senderInput, setSenderInput] = useState("");
  const [recieverInput, setRecieverInput] = useState("");
  const [keyInfoInput, setKeyInfoInput] = useState("");
  const [result, setResult] = useState("");
  const [subject, setSubject] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  var [x, setX] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  async function onSubmit(event) {
    event.preventDefault();
    try {
      setLoadingState(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender: senderInput, reciever: recieverInput, keyInfo: keyInfoInput, isSelected: selected }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data.result)



      splitStringBySubject(data.result);
      setSenderInput("");
      setRecieverInput("");
      setKeyInfoInput("");
      setLoadingState(false);
      setIsOpen(true);
      setX('-10vw');

    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }



  function splitStringBySubject(inputString) {
    const subjectRegex = /(?:<br>)*Subject: ([^<]*)/;
    const subjectMatch = inputString.match(subjectRegex);
    let subject_content = '';
    let rest_content = inputString;

    if (subjectMatch) {
      subject_content = subjectMatch[1];
      rest_content = inputString.replace(subjectMatch[0], '');
      rest_content = rest_content.replace(/^(<br>)*\s*/, ''); // remove leading <br> tags
      //rest_content = rest_content.replace(/^\s*/, ''); // remove leading whitespaces
    }
    setSubject(subject_content);
    setResult(rest_content);
    return { subject_content, rest_content };
  }

  const handleClick = useCallback(async () => {
    const stringValue = document.querySelector('#string-value');
    try {
      const text = stringValue.textContent.replace(/<br\s*\/?>/gi, '\n');
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, []);

  useEffect(() => {
    const textElement = document.querySelector("#string-value");
    const button = document.querySelector("#copy-button");
    const observer = new MutationObserver(() => {
      if (textElement && button) {
        button.addEventListener("click", handleClick);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [handleClick]);




  /*<img css={{mw:"10px"}} src="/AIMAIL_icon.PNG"/>*/
  const [variant, setVariant] = React.useState("default");
  const [activeColor, setActiveColor] = React.useState("primary");



  const variants = [
    "default",
    "highlight",
    "highlight-solid",
    "underline",
    "highlight-rounded",
    "highlight-solid-rounded",
    "underline-rounded",
  ];

  const colors = ["primary", "secondary", "success", "warning", "error"];
  const collapseItems = [
    "Features",
    "Customers",
    "Pricing",
    "Company",
    "Legal",
    "Team",
    "Help & Feedback",
    "Login",
    "Sign Up",
  ];
  return (

    <NextUIProvider >

      <Navbar isBordered variant="floating" mw="fluid" css={{bg:"#FFFFFF00"}}>
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" />

          <Text b color="inherit" hideIn="xs">
            AIMAIL
          </Text>

        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">
            Customers
          </Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>

          <Navbar.Link color="inherit" href="/login">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Link href="/login">
              <Button auto flat>
                Sign Up
              </Button>
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Switch
              checked={false}
              iconOn={<SunIcon filled />}
              iconOff={<MoonIcon filled />}
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            />
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={item}>
              <Link
                color="inherit"

                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>


      <section >



        <div >
          <Head>
            <title> AIMAIL</title>
            <link rel="icon" href="/AIMAIL_icon.PNG" />

          </Head>
          <div >
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: x }}

              transition={{ type: "spring" }}
            >
              <Grid.Container gap={2} justify="center"  >
                <Grid >
                  <Card css={{ p: "$15" }} >

                    <main >
                      <Progress
                        indeterminated={loadingState}
                        color="gradient"

                      />
                      <Text
                        h1
                        size={50}
                        css={{
                          textGradient: "45deg, $blue600 -20%, $pink600 50%",
                        }}
                        weight="bold"
                      >
                        Generate Your Emails
                      </Text>
                      <form onSubmit={onSubmit}>
                        <Spacer y={2} />
                        <Input
                          labelPlaceholder="enter sender"
                          size="lg"
                          placeholder="Large"
                          status="default"
                          type="text"
                          name="sender"
                          value={senderInput}
                          onChange={(e) => setSenderInput(e.target.value)}
                        />
                        <Spacer y={2} />
                        <Input
                          type="text"
                          name="reciever"
                          labelPlaceholder="enter reciever"
                          size="lg"
                          placeholder="Large"
                          status="default"
                          value={recieverInput}
                          onChange={(e) => setRecieverInput(e.target.value)}
                        />
                        <Spacer y={2} />
                        <Textarea
                          type="text"
                          name="keyInfo"
                          status="default"
                          size="lg"
                          placeholder="Large"
                          labelPlaceholder="Provide key informations"
                          value={keyInfoInput}
                          onChange={(e) => setKeyInfoInput(e.target.value)}
                        />

                        <Spacer y={1} />

                        <Checkbox.Group

                          value={selected}
                          onChange={setSelected}
                          label="Chose writing style"
                          orientation="horizontal"
                          color="secondary"


                        >

                          <Checkbox size="sm" value="formal">formal</Checkbox>
                          <Checkbox size="sm" value="informal">informal</Checkbox>
                          <Checkbox size="sm" value="humorous">humerous</Checkbox>
                        </Checkbox.Group>
                        <Spacer y={1} />



                        <Popover placement={"right-bottom"} isOpen={isOpen} >
                          <Popover.Trigger>
                            <Button shadow color="gradient" type="submit" value="Generate names" > Generate mail</Button>
                          </Popover.Trigger>
                          <Popover.Content css={{ ml: "6%", p: "5%" }} >
                            <Card.Header>
                              <Text b>Subject: {subject}</Text>
                            </Card.Header>
                            <Card.Divider />
                            <Text id="string-value">
                              {result.split(/<br ?\/?>/)
                                .flatMap((line, i) => [line, <br key={`line-${i}`} />])}
                            </Text>
                            <Card.Divider />
                            <Card.Footer>
                              <Row justify="flex-end">
                                <Button size="sm" light>
                                  Regenerate
                                </Button>
                                <Button size="sm" id="copy-button" onClick={handleClick}>Copy</Button>
                              </Row>
                            </Card.Footer>
                          </Popover.Content>
                        </Popover>
                      </form>
                    </main>
                  </Card>
                </Grid>
              </Grid.Container>
            </motion.div>
          </div>
        </div>
      </section>
      <Grid.Container fluid gap={2} justify="center">
        <Grid>
          <Card>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  What to watch
                </Text>
                <Text h4 color="white">
                  Stream the Acme event
                </Text>
              </Col>
            </Card.Header>
            <Card.Image
              src="https://nextui.org/images/card-example-4.jpeg"
              objectFit="cover"
              width="100%"
              height={340}
              alt="Card image background"
            />
          </Card>
        </Grid>
        <Grid>
          <Card>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  What to watch
                </Text>
                <Text h4 color="white">
                  Stream the Acme event
                </Text>
              </Col>
            </Card.Header>
            <Card.Image
              src="https://nextui.org/images/card-example-4.jpeg"
              objectFit="cover"
              width="100%"
              height={340}
              alt="Card image background"
            />
          </Card>
        </Grid>

      </Grid.Container>
      <section>
                    
      </section>
    </NextUIProvider>
  );
}

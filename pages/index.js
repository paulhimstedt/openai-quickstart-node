import Head from "next/head";
import { useState } from "react";
//import styles from "pages/index.module.css";
import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Input } from "@nextui-org/react";
import { Card, Button, Text, Row, Spacer, Grid,Checkbox } from "@nextui-org/react";
import dynamic from 'next/dynamic'
import { motion } from "framer-motion";
import { Navbar, Link, Radio, useTheme, Progress, Popover } from "@nextui-org/react";
import { createTheme } from "@nextui-org/react"

import { useTheme as useNextTheme } from 'next-themes'
import { Switch } from '@nextui-org/react'

import { SunIcon } from './components/SunIcon';
import { MoonIcon } from './components/MoonIcon';


export default function Home() {


  const [selected, setSelected] = useState("");

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  const [senderInput, setSenderInput] = useState("");
  const [recieverInput, setRecieverInput] = useState("");
  const [keyInfoInput, setKeyInfoInput] = useState("");
  const [formalChecked, setFormalChecked] = useState(false);
  const [informalChecked, setInformalChecked] = useState(false);
  const [humorousChecked, setHumorousChecked] = useState(false);
  const [result, setResult] = useState("");
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
        body: JSON.stringify({ sender: senderInput, reciever: recieverInput, keyInfo: keyInfoInput, isSelected: selected}),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data.result)
      setResult(data.result);
      setSenderInput("");
      setRecieverInput("");
      setKeyInfoInput("");
      setFormalChecked(false);
      setInformalChecked(false);
      setHumorousChecked(false);
      setLoadingState(false);
      setIsOpen(true);
      setX('-10vw');

    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
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

      <Navbar isBordered variant="sticky">
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
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
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
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>


      <section>



        <div>
          <Head>
            <title>AIMAIL</title>
            <link rel="icon" href="/AIMAIL_icon.PNG" />

          </Head>
          <div>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: x }}
              className="box"
              transition={{ type: "spring" }}
            >
              <Grid.Container gap={2} justify="center"  >
                <Grid sm={12} md={2.5} >
                  <Card css={{ p: "$15" }}>
                    <main >
                      <Progress
                        indeterminated={loadingState}
                        color="secondary"
                        status="secondary"
                      />
                      <Text
                        h1
                        size={60}
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
                        <Input
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
                          label="Chose writing style"
                          orientation="horizontal"
                          color="secondary" 
                          value={selected}
                          onChange={setSelected} 
                          
                        >
                          
                          <Checkbox size="sm" value="formal">formal</Checkbox>
                          <Checkbox size="sm" value="informal">informal</Checkbox>
                          <Checkbox size="sm" value="humorous">humerous</Checkbox>
                        </Checkbox.Group>
                        <Spacer y={1} />

                        <Popover placement={"right-bottom"} isOpen={isOpen} >
                          <Popover.Trigger>
                            <Button css={{ mr: "0px" }} shadow color="gradient" type="submit" value="Generate names" > Generate mail</Button>
                          </Popover.Trigger>
                          <Popover.Content css={{ ml: "6%", p: "5%", w: "200px" }}>
                            <Card.Header>
                              <Text b>Subject</Text>
                            </Card.Header>
                            {result.split(/<br ?\/?>/)
                              .flatMap((line, i) => [line, <br key={`line-${i}`} />])}
                            <Card.Footer>
                              <Row justify="flex-end">
                                <Button size="sm" light>
                                  Regenerate
                                </Button>
                                <Button size="sm">Copy</Button>
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
      <section>
        <h1>TEST</h1>
      </section>
    </NextUIProvider>
  );
}

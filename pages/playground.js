//import React from 'react';
import Head from "next/head";
import { useState } from "react";
import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { createTheme, styled, keyframes, Dropdown, Col, Textarea, Input, Card, Button, Text, Container, Row, Spacer, Grid, Checkbox, Progress, Popover } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useCallback, useEffect } from 'react';
import { Mail } from './components/Mail';
import { Password } from './components/Password';
import NavBar from "./components/navbar";

export default function Playground() {
    var [x, setX] = useState("");
    const [selected, setSelected] = useState([""]);

    const [senderInput, setSenderInput] = useState("");
    const [recieverInput, setRecieverInput] = useState("");
    const [keyInfoInput, setKeyInfoInput] = useState("");
    const [result, setResult] = useState("");
    const [subject, setSubject] = useState("");
    const [loadingState, setLoadingState] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [proSelected, setProSelected] = React.useState(new Set(["text"]));
    //const { setTheme } = useNextTheme();
    const selectedValue = React.useMemo(
        () => Array.from(proSelected).join(", ").replaceAll("_", " "),
        [proSelected]
    );
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
    const darkTheme = createTheme({
        type: 'dark',
        theme: {

        }
    })




    /*<img css={{mw:"10px"}} src="/AIMAIL_icon.PNG"/>*/
    const [variant, setVariant] = React.useState("default");
    const [activeColor, setActiveColor] = React.useState("primary");

    const fadeGradient = keyframes({
        '100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '0%': { backgroundPosition: '0% 50%' }
    });
    const FadingH1 = styled("h1", {
        background: `linear-gradient(to right, #9750DD , #17C964)`,
        animation: `${fadeGradient} 15s ease infinite`,
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        [`.${darkTheme} &`]: {
            backgroundColor: '$blue700',
        },
    });
    

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
    return (
        
        <>
            <NavBar />
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
                            <Card css={{ p: "$10", bgBlur: "#ffffff66" }} isBlurred>
                                <FadingH1>Generate Your Emails</FadingH1>
                                <Progress indeterminated={loadingState} color="gradient" css={{ mw: "1000px" }} />
                                <Spacer y={0.5} />





                                <form onSubmit={onSubmit}>


                                    <Grid.Container justify="center" >
                                        <Grid >
                                            <Card css={{ p: "$10", mw: "350px" }}>
                                                <Text h4> Fill in Details</Text>
                                                <Spacer y={0.75} />
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
                                            </Card>
                                            <Spacer y={0.5} />
                                        </Grid>

                                        <Spacer x={0.5} />
                                        <Grid>
                                            <Card css={{ p: "$10", mw: "350px" }}>
                                                <Checkbox.Group
                                                    value={selected}
                                                    onChange={setSelected}
                                                    label="Chose style"
                                                    orientation="vertical"
                                                    color="secondary">
                                                    <Checkbox size="sm" value="formal">formal</Checkbox>
                                                    <Checkbox size="sm" value="informal">informal</Checkbox>
                                                    <Checkbox size="sm" value="humorous">humerous</Checkbox>
                                                </Checkbox.Group>
                                            </Card>
                                            <Spacer y={0.5} />
                                            <Card css={{ p: "$10", mw: "350px" }}>
                                                <Checkbox.Group

                                                    label="Chose style"
                                                    orientation="vertical"
                                                    color="secondary">
                                                    <Checkbox size="sm" value="formal">formal</Checkbox>
                                                    <Checkbox size="sm" value="informal">informal</Checkbox>

                                                </Checkbox.Group>
                                            </Card>
                                            <Spacer y={0.5} />
                                        </Grid>

                                        <Spacer x={0.5} />
                                        <Grid>

                                            <Card css={{ p: "$10", mw: "350px", bgBlur: "#ffffff66" }} isBlurred >
                                                <Text h4>Pro Features</Text>
                                                <Grid.Container gap={2}>
                                                    <Grid>
                                                        <Checkbox.Group
                                                            label="Select cities (controlled)"
                                                            color="secondary"
                                                            value={selected}
                                                            onChange={setSelected}
                                                        >
                                                            <Checkbox size="sm" value="buenos-aires">Save To Campain</Checkbox>
                                                            <Checkbox size="sm" value="auckland">Target Group</Checkbox>
                                                            <Checkbox size="sm" value="sydney">Sydney</Checkbox>
                                                        </Checkbox.Group>
                                                    </Grid>
                                                    <Grid>
                                                        <Dropdown>
                                                            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                                                                {selectedValue}
                                                            </Dropdown.Button>
                                                            <Dropdown.Menu
                                                                aria-label="Multiple selection actions"
                                                                color="secondary"
                                                                disallowEmptySelection
                                                                selectionMode="multiple"
                                                                selectedKeys={proSelected}
                                                                onSelectionChange={setProSelected}
                                                            >
                                                                <Dropdown.Item key="text">Text</Dropdown.Item>
                                                                <Dropdown.Item key="number">Number</Dropdown.Item>
                                                                <Dropdown.Item key="date">Date</Dropdown.Item>
                                                                <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
                                                                <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Grid>
                                                </Grid.Container>
                                            </Card>
                                        </Grid>
                                    </Grid.Container>
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

                            </Card>
                        </Grid>
                    </Grid.Container>
                </motion.div>
            </div>
        </>
    );
}


import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';
import { useTheme as useNextTheme } from 'next-themes'
import {Button,Switch,Navbar,Link, Grid, Card, Text, Col, Spacer } from "@nextui-org/react";
import { useRouter } from 'next/router';

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



const NavBar = () => {
    const { setTheme } = useNextTheme();
    const router = useRouter();

    return <>
        <Navbar isBordered variant="floating" mw="fluid" css={{ bg: "#FFFFFF00" }}>
            <Navbar.Brand>
              <Navbar.Toggle aria-label="toggle navigation" />

              <Text b color="inherit" hideIn="xs">
                AIMAIL
              </Text>

            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
              <Navbar.Link isActive={router.pathname === '/playground'} href="/playground">Playground</Navbar.Link>
              <Navbar.Link isActive={router.pathname === '/'} href="/">Home</Navbar.Link>
              <Navbar.Link isActive={router.pathname === '/pricing'} href="/pricing">Pricing</Navbar.Link>
              <Navbar.Link href="#">
                Customers
              </Navbar.Link>
              <Navbar.Link href="#">Features</Navbar.Link>
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
    </>
}

export default NavBar;
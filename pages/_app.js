
// 1. Import `createTheme`
import { styled, keyframes, createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
//import { BrowserRouter } from 'react-router-dom';
// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      green: "#17C964"

    }
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {

  }
})

const fadeGradient = keyframes({
  '0%': { backgroundPosition: '0% 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0% 50%' }
});


const FadeContainer = styled('div', {
  background: 'linear-gradient(to right, #9750DD , #17C964)',
  //height: "100%",
  //width:"100%",
  backgroundSize: '200% 100%',
  animation: `${fadeGradient} 15s ease infinite`,
  [`.${darkTheme} &`]: {
    backgroundColor: '$blue700',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    
      <FadeContainer>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
            light: lightTheme,
            dark: darkTheme
          }}
        >
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
        </NextThemesProvider>
      </FadeContainer>
    
  );
}

export default MyApp;
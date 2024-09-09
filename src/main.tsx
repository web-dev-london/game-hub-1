import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import router from './routes/routes'
import theme from './theme'
import './index.css'
import { RouterProvider } from 'react-router-dom'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: "offlineFirst",
        },
        mutations: {
            networkMode: "offlineFirst",
        },
    }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ChakraProvider>
    </React.StrictMode>,
)

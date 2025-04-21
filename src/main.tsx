import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router"
import { scan } from "react-scan"

import "./index.css"

import { PersistGate } from "redux-persist/integration/react"

import App from "./app.tsx"
import { persistor, store } from "./redux/store.ts"

scan({
    enabled: true,
})

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
])

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </StrictMode>,
)

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router"
import { scan } from "react-scan"

import "./index.css"
import App from "./app.tsx"
import { store } from "./redux/store.ts"

scan({
    enabled: true,
})

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/test",
        element: <>test testtt</>,
    },
])

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
)

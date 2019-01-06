import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import createstore from "./store/create-store";

const App = lazy(() => import("./App"));
const store = createstore();

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <App />
        </Suspense>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

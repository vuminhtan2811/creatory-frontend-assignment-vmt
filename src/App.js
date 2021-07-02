import React, { Suspense } from "react";
import appRoutes from "./_routes";
import { ProvideAuth } from "./provider/auth";
import { Router, Route, Switch } from "./provider/routers";
import NonLayout from "./containers/layout/NonLayout";

import "./App.css";

function App() {
  const routeListRedenrer = () => {
    return appRoutes.map((routerProps, idx) => {
      return (
        <Route
          key={`${idx}-${routerProps.name}`}
          {...routerProps}
          render={(props) => {
            if (!props.layout) {
              return (
                <NonLayout>
                  <props.component {...props} />
                </NonLayout>
              );
            }
            return (
              <props.layout>
                <props.component {...props} />
              </props.layout>
            );
          }}
        />
      );
    });
  };

  return (
    <ProvideAuth>
      <Suspense fallback={false}>
        <Router>
          <Switch>{routeListRedenrer()}</Switch>
        </Router>
      </Suspense>
    </ProvideAuth>
  );
}

export default App;

import { Routes as AppRoutes, Route } from "react-router-dom";
import {Home, ProjectInfo} from './LazyComponets'
import { Spinner } from "../components";
import {NotFound} from '../pages'
import { Suspense } from "react";

const Routes = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <AppRoutes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="project/:id" element={<ProjectInfo />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </AppRoutes>
      </Suspense>
    </>
  );
};

export default Routes;

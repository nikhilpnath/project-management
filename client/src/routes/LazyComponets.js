import { lazy } from "react";

const Home = lazy(()=>import('../pages/Home'))
const ProjectInfo = lazy(() => import("../pages/ProjectInfo"));

export {Home, ProjectInfo}

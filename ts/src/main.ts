import "./style.css";
import { setupTetris } from "./tetris.ts";

setupTetris(document.querySelector<HTMLDivElement>("#app")!);

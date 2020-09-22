import { tychei } from "seedrandom";

/* Als ge dit leest, komt ge tot de conclusie dat het niet een echt ip address is xD Oopsy */
export function getIP(input: string) {
    const g = tychei(input);
    const a = Math.round(g.quick()*255);
    const b = Math.round(g.quick()*255);
    const c = Math.round(g.quick()*255);
    const d = Math.round(g.quick()*255);
    return a + '.' + b + '.' + c + '.' + d;
}
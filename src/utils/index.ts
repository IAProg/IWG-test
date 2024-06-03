import gsap from "gsap";
import { ICurrencySettings } from "../types";

/**
 * A gsap tween wrapper allowing a tween to treated as a promise without writing extra code
 */
export async function asyncTween (targets: gsap.TweenTarget, vars: gsap.TweenVars): Promise<void>{
    return new Promise(resolve => {
        vars.onComplete = () => {
            vars.onComplete && (() => vars.onComplete());
            resolve();
        }
        gsap.to(targets, vars)
    });
}

/**
 * promise timeout wrapper function
 */
export const delay = (ms: number) => new Promise<void>(
    (resolve) => setTimeout(resolve, ms)
);

/**
 * generate a random float between two values
 * @param min - lowest possible value
 * @param max - highest possible value
 */
export function randomFloat(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
}

/**
 * generate a random integer between two values
 * @param min - lowest possible value
 * @param max - highest possible value
 */
export function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * convert base currency units to currency string (eg 100 -> £1)
 * uses'en-GB' as default config - realistically this should come from env config
 *
 * @param {number} amount - amount of money to convert to currency string
 * @returns {string}
 */
export function formatCurrency( amount: number, currencySettings?: ICurrencySettings ) {
    currencySettings = { 
        locale: "en-GB",
        currency: "GBP",
        ...currencySettings
    };

    return amount.toLocaleString(currencySettings.locale, {style:"currency", currency:currencySettings.currency, maximumFractionDigits: 0});
}
import { devices } from 'playwright';
import { envNumber } from '../env/parseEnv';

export const getViewPort = (): { width: number, height: number } => {
    let viewPort;
    const emulation = process.env.EMULATION || "browser";

    if (emulation != "browser") {
        const device = devices[emulation];
        viewPort = {
            width: device.viewport.width,
            height: device.viewport.height
        };
    } else {
        viewPort = {
            width: envNumber('BROWSER_WIDTH'),
            height: envNumber('BROWSER_HEIGHT')
        };
    }

    return viewPort;
};
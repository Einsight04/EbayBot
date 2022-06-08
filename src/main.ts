import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';
import fetch from 'node-fetch';
import cron from 'node-cron';
import colors from 'colors';
import { headers } from './headers.js';

// __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env setup
dotenv.config({path: path.join(__dirname, '../.env')});

// parameters
const viewCount: number = 10;
const productLink: string = 'https://www.ebay.ca/itm/175273326706'


async function increaseViews() {
    const response = await fetch(productLink, {
        headers: headers
    })
    if (response.status === 200) {
        console.log(colors.green('Added view'));
    } else {
        console.log(colors.red('Failed to add view'));
    }
}


cron.schedule('* * * * *', () => {
    console.log(process.env.SEP);
    console.log(`Sending ${viewCount} views --> ${productLink}`)
    console.log(process.env.SEP);

    for (let i = 0; i < viewCount; i++) {
        setTimeout(increaseViews, i * 5000);
    }
});


import * as beerio from "beerio";



    const response = await fetch('https://example.com');
    const html = await response.text();
    const $ =  beerio.load(html);
    const title = $.select('title').text();
    const content = $.select('.content').text();
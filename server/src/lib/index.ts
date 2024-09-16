import { init } from "@paralleldrive/cuid2";


const createId = init({
  length: 7,
});

export function createDatabaseId() {
  return createId();
}



export async function syncIfLocal() {
 
}

export function redirect(
    {
      set,
      headers,
    }: {
      headers: Record<string, string | null>;
      set: {
        headers: Record<string, string> & {
          "Set-Cookie"?: string | string[];
        };
        status?: number | string;
        redirect?: string;
      };
    },
    href: string,
  ) {
    if (headers["hx-request"] === "true") {
      set.headers["HX-Location"] = href;
    } else {
      set.redirect = href;
    }
  }



  export const isValidUrl = (urlString: string) => {
    var urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };
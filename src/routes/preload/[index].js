import URLS from "./urls";

/**
 * @this {import("../types").ThisContext}
 * @param {import("../types").RouteProps} props
 */
export default async function preload({ request, reply }) {
  const messages = [];
  try {
    for (const url of URLS) {
      if (url.endsWith(".xml")) {
        const xml = await (await fetch(url)).text();
        const regex = /<loc>(.*?)<\/loc>/g;
        let match;
        while ((match = regex.exec(xml)) !== null) {
          messages.push(await check(match[1]));
        }
      } else {
        messages.push(await check(url));
      }
    }
  } catch (e) {
    reply.status(500);
    messages.push(e.cause);
    console.error(e);
  } finally {
    reply.header("Content-Type", "application/json; charset=utf-8");
    return messages;
  }
}

/**
 * @param {string} url
 */
async function check(url) {
  console.info(url);
  const response = await fetch(url);
  if (response.ok) {
    const text = await response.text();
    return { url, status: response.status, length: text.length };
  } else {
    return { url, status: response.status };
  }
}

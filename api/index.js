export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);

  // 只放行订阅路径，其他全部拦截
  if (!url.pathname.startsWith('/api/v1/client/subscribe')) {
    return new Response('Forbidden', { status: 403 });
  }

  url.hostname = 'v2node.aby8.de';
  url.protocol = 'https:';
  url.port = '';

  const newHeaders = new Headers(request.headers);
  newHeaders.set('Host', 'v2node.aby8.de');

  return fetch(new Request(url.toString(), {
    method: request.method,
    headers: newHeaders,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
  }));
}

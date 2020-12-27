const startTmpSessionWith = (targetWindow, sessionId) => {
  targetWindow.postMessage({
    jsonrpc: '2.0',
    method: 'tmp.getFile',
    params: { sessionId },
    id: 'getfile',
  })
  addEventListener('message', async e => {
    if (e.data.id === 'getfile') {
      /* global parseJSON */
      window.data = parseJSON(await e.data.result.blob.text())
      document.documentElement.classList.add('loaded')
    }
  })
}

{
  const match = location.hash.match(/tmpsessionid=([\w-]+)/)
  if (window.opener && match) {
    startTmpSessionWith(window.opener, match[1])
  }
}
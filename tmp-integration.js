const startTmpSessionWith = (targetWindow, sessionId) => {
  window.addEventListener('message', async e => {
    if (e.data.id === 'getfile') {
      /* global parseJSON */
      window.data = parseJSON(await e.data.result.blob.text())
      document.documentElement.classList.add('loaded')
    }
  })
  targetWindow.postMessage({
    jsonrpc: '2.0',
    method: 'tmp/getOpenedFile',
    params: { sessionId },
    id: 'getfile',
  }, '*')
}

{
  const match = location.hash.match(/tmpsessionid=([\w-]+)/)
  if (window.opener && match) {
    startTmpSessionWith(window.opener, match[1])
  }
}
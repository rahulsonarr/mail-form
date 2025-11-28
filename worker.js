addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Only POST allowed', { status: 405 })
  }

  const contentType = request.headers.get('Content-Type') || ''
  if (!contentType.includes('application/x-www-form-urlencoded')) {
    return new Response('Unsupported content type', { status: 415 })
  }

  // Parse form data
  const formData = await request.formData()

  // Extract fields (adjust field names as needed)
  const email = formData.get('Email') || formData.get('email')
  const name = formData.get('Name') || formData.get('name') || ''
  const message = formData.get('Message') || formData.get('message') || ''

  if (!email) {
    return new Response('Email is required', { status: 400 })
  }

  // For now, just log or store data — later you can send email or save to KV
  // Example: log to console (visible in Cloudflare dashboard logs)
  console.log(`New form submission: Name=${name}, Email=${email}, Message=${message}`)

  // Respond with a thank you message or redirect to a "thank you" page
  return new Response('Thank you for your submission!', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  })
}

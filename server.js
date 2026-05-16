import jsonServer from 'json-server'
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Generate JWT-like tokens (simplified for testing)
const generateToken = (user) => {
  return btoa(JSON.stringify({ id: user.id, email: user.email }))
}

// Middleware
server.use(middlewares)
server.use(jsonServer.bodyParser)

// Custom routes for auth
server.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body
  const db = router.db
  const users = db.get('users').value()
  
  // Check if user exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' })
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    email,
    password
  }
  
  db.get('users').push(newUser).write()
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser
  const token = generateToken(newUser)
  
  res.json({ token, user: userWithoutPassword })
})

server.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  const db = router.db
  const users = db.get('users').value()
  
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  
  const { password: _, ...userWithoutPassword } = user
  const token = generateToken(user)
  
  res.json({ token, user: userWithoutPassword })
})

// Auth middleware for protected routes
server.use('/api/tasks', (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }
  
  try {
    // Decode token
    const userData = JSON.parse(atob(token))
    req.user = userData
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
})

// Use default router for tasks
server.use('/api', router)

// Start server
const PORT = 3000
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
  console.log('Test credentials: test@example.com / password123')
})
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3002;
const DATA_DIR = path.join(__dirname, 'data');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    console.log('✓ Data directory ready');
  } catch (error) {
    console.error('Failed to create data directory:', error);
  }
}

// File-based storage helpers
async function readJsonFile(filename) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null; // File doesn't exist
    }
    throw error;
  }
}

async function writeJsonFile(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// API Routes

// Get all teams
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await readJsonFile('teams.json') || [];
    res.json(teams);
  } catch (error) {
    console.error('Error reading teams:', error);
    res.status(500).json({ error: 'Failed to load teams' });
  }
});

// Create new team
app.post('/api/teams', async (req, res) => {
  try {
    const teams = await readJsonFile('teams.json') || [];
    const newTeam = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      unlockedStations: [],
      completedStations: [],
      currentStation: null,
      stationAnswers: {},
      totalScore: 0,
      startTime: new Date().toISOString()
    };
    
    teams.push(newTeam);
    await writeJsonFile('teams.json', teams);
    
    res.status(201).json(newTeam);
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Failed to create team' });
  }
});

// Get specific team
app.get('/api/teams/:id', async (req, res) => {
  try {
    const teams = await readJsonFile('teams.json') || [];
    const team = teams.find(t => t.id === req.params.id);
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json(team);
  } catch (error) {
    console.error('Error reading team:', error);
    res.status(500).json({ error: 'Failed to load team' });
  }
});

// Update team progress
app.put('/api/teams/:id', async (req, res) => {
  try {
    const teams = await readJsonFile('teams.json') || [];
    const teamIndex = teams.findIndex(t => t.id === req.params.id);
    
    if (teamIndex === -1) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    teams[teamIndex] = { ...teams[teamIndex], ...req.body, updatedAt: new Date().toISOString() };
    await writeJsonFile('teams.json', teams);
    
    res.json(teams[teamIndex]);
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ error: 'Failed to update team' });
  }
});

// Update team station progress (unlock/complete)
app.post('/api/teams/:id/stations/:stationId/:action', async (req, res) => {
  try {
    const { id, stationId, action } = req.params;
    const teams = await readJsonFile('teams.json') || [];
    const teamIndex = teams.findIndex(t => t.id === id);
    
    if (teamIndex === -1) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    const team = teams[teamIndex];
    
    if (action === 'unlock') {
      if (!team.unlockedStations.includes(stationId)) {
        team.unlockedStations.push(stationId);
      }
    } else if (action === 'complete') {
      if (!team.completedStations.includes(stationId)) {
        team.completedStations.push(stationId);
      }
      // Add score and answers from request body
      if (req.body.score) {
        team.totalScore = (team.totalScore || 0) + req.body.score;
      }
      if (req.body.answers) {
        team.stationAnswers[stationId] = req.body.answers;
      }
    } else if (action === 'reset') {
      team.unlockedStations = team.unlockedStations.filter(s => s !== stationId);
      team.completedStations = team.completedStations.filter(s => s !== stationId);
      delete team.stationAnswers[stationId];
    }
    
    team.updatedAt = new Date().toISOString();
    await writeJsonFile('teams.json', teams);
    
    res.json(team);
  } catch (error) {
    console.error('Error updating team station:', error);
    res.status(500).json({ error: 'Failed to update team station' });
  }
});

// Reset team completely
app.post('/api/teams/:id/reset', async (req, res) => {
  try {
    const teams = await readJsonFile('teams.json') || [];
    const teamIndex = teams.findIndex(t => t.id === req.params.id);
    
    if (teamIndex === -1) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    teams[teamIndex] = {
      ...teams[teamIndex],
      unlockedStations: [],
      completedStations: [],
      currentStation: null,
      stationAnswers: {},
      totalScore: 0,
      updatedAt: new Date().toISOString()
    };
    
    await writeJsonFile('teams.json', teams);
    res.json(teams[teamIndex]);
  } catch (error) {
    console.error('Error resetting team:', error);
    res.status(500).json({ error: 'Failed to reset team' });
  }
});

// Get physical groups
app.get('/api/groups', async (req, res) => {
  try {
    const groups = await readJsonFile('groups.json') || [];
    res.json(groups);
  } catch (error) {
    console.error('Error reading groups:', error);
    res.status(500).json({ error: 'Failed to load groups' });
  }
});

// Update physical groups
app.put('/api/groups', async (req, res) => {
  try {
    await writeJsonFile('groups.json', req.body);
    res.json(req.body);
  } catch (error) {
    console.error('Error updating groups:', error);
    res.status(500).json({ error: 'Failed to update groups' });
  }
});

// Admin authentication endpoint
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Simple hardcoded admin for now - you can enhance this later
  if (username === 'admin' && password === 'hunt2024') {
    res.json({ 
      success: true, 
      admin: { username, role: 'admin', loginTime: new Date().toISOString() }
    });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
});

// Team authentication endpoint
app.post('/api/teams/login', async (req, res) => {
  try {
    const { teamId, password } = req.body;
    const teams = await readJsonFile('teams.json') || [];
    const team = teams.find(t => t.id === teamId);
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    // Generate password: teamname + member count (lowercase)
    const expectedPassword = (team.name + team.members.length).toLowerCase();
    
    if (password === expectedPassword) {
      res.json({ success: true, team });
    } else {
      res.status(401).json({ error: 'Invalid team password' });
    }
  } catch (error) {
    console.error('Error during team login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await ensureDataDir();
  
  app.listen(PORT, () => {
    console.log(`🚀 HunterApp API server running on http://localhost:${PORT}`);
    console.log(`📁 Data stored in: ${DATA_DIR}`);
    console.log(`🌐 CORS enabled for all origins`);
  });
}

startServer().catch(console.error);
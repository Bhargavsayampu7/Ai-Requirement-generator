// Health check endpoint for /api
export default function handler(req, res) {
    res.status(200).json({ status: 'ok', message: 'AI Requirement Generator API is running' });
}

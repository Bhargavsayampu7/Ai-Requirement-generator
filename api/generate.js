// Self-contained Vercel serverless function for /api/generate
// No cross-directory imports to avoid ESM/CJS conflicts

function cleanGeminiText(text) {
    return text
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/#+\s?/g, '')
        .replace(/`/g, '')
        .replace(/_{2,}/g, '')
        .trim();
}

function parseGeneratedContent(content) {
    const sections = {
        productOverview: '',
        successMetrics: '',
        userPersonas: '',
        mvpScope: '',
        userFlows: '',
        userStories: '',
        acceptanceCriteria: '',
        keyRisks: ''
    };

    const lines = content.split('\n');
    let currentSection = null;
    let sectionContent = [];

    for (const line of lines) {
        const upperLine = line.toUpperCase();

        if (upperLine.includes('PRODUCT OVERVIEW') || upperLine.includes('1. PRODUCT OVERVIEW')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'productOverview'; sectionContent = [];
        } else if (upperLine.includes('SUCCESS METRICS') || upperLine.includes('2. SUCCESS METRICS') || upperLine.includes('KPIS')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'successMetrics'; sectionContent = [];
        } else if (upperLine.includes('USER PERSONAS') || upperLine.includes('3. USER PERSONAS')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'userPersonas'; sectionContent = [];
        } else if (upperLine.includes('MVP SCOPE') || upperLine.includes('4. MVP SCOPE') || upperLine.includes('PRIORITIZATION')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'mvpScope'; sectionContent = [];
        } else if (upperLine.includes('USER FLOWS') || upperLine.includes('5. USER FLOWS')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'userFlows'; sectionContent = [];
        } else if (upperLine.includes('USER STORIES') || upperLine.includes('6. USER STORIES')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'userStories'; sectionContent = [];
        } else if (upperLine.includes('ACCEPTANCE CRITERIA') || upperLine.includes('7. ACCEPTANCE CRITERIA')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'acceptanceCriteria'; sectionContent = [];
        } else if (upperLine.includes('KEY RISKS') || upperLine.includes('8. KEY RISKS') || upperLine.includes('MITIGATION')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'keyRisks'; sectionContent = [];
        } else if (currentSection) {
            sectionContent.push(line);
        }
    }

    if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
    return sections;
}

const SYSTEM_PROMPT = `You are a Senior Product Manager + UX Architect + Business Analyst.

Your job is to convert raw startup ideas into structured, professional software requirements that look human-written, not AI-generated.

CRITICAL FORMATTING RULES:
- DO NOT use asterisks (**) for bold or (*) for bullets
- Use simple numbered lists (1., 2., 3.) or dashes (-)
- Write in clean prose with proper paragraphs
- Use line breaks for visual separation
- Make it look like a real PM wrote it in a Google Doc, not markdown
- Professional business document style, not a markdown file

Generate the following sections:

═══════════════════════════════════════════════════════════

1. PRODUCT OVERVIEW

Write 2-3 clear sentences in paragraph form explaining:
- What the product does
- What problem it solves  
- Who it's for

No bullet points here - just clean prose.

═══════════════════════════════════════════════════════════

2. SUCCESS METRICS (KPIs)

List 5-7 key business metrics. Format each as:

Metric Name - Brief description of what it measures and why it matters

═══════════════════════════════════════════════════════════

3. USER PERSONAS

Create 3 distinct personas. Format each cleanly:

PERSONA 1: [Name]
Age: [Range]
Role: [Job title]
Goals: [Write 2-3 goals in sentence form, separated by semicolons]
Pain Points: [Write 2-3 pain points in sentence form, separated by semicolons]
Tech Comfort: [Low/Medium/High]

═══════════════════════════════════════════════════════════

4. MVP SCOPE & PRIORITIZATION

Phase 1 (MVP - Launch in 4-6 weeks):
1. [Feature name] - Brief description

Phase 2 (Post-MVP - Next 2-3 months):
1. [Feature name] - Brief description

Phase 3 (Future):
1. [Feature name] - Brief description

═══════════════════════════════════════════════════════════

5. USER FLOWS

Describe 3-5 main user journeys. Format each flow clearly:

FLOW: [Name of the flow]
1. [First step]
2. [Second step]

═══════════════════════════════════════════════════════════

6. USER STORIES

Write 10-12 user stories grouped by persona.
Format: As a [user type], I want [goal], so that [benefit]

═══════════════════════════════════════════════════════════

7. ACCEPTANCE CRITERIA

For the top 5-7 most critical user stories, write acceptance criteria.

STORY: [Brief story description]
Given [context]
When [action]
Then [expected result]

═══════════════════════════════════════════════════════════

8. KEY RISKS & MITIGATION

Identify 3-5 major risks. Format:
Risk: [What could go wrong]
Impact: [High/Medium/Low]
Mitigation: [How to prevent or reduce this risk]

═══════════════════════════════════════════════════════════

CRITICAL REQUIREMENTS:
- Generate ALL 8 sections above - do not skip any section
- NEVER use asterisks (*) or (**) anywhere in your output
- Use dashes (-) for lists, not asterisks
- Write like a senior PM, not an AI
- Be specific and actionable`;

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { idea } = req.body;

        if (!idea || idea.trim().length === 0) {
            return res.status(400).json({ error: 'Idea is required', message: 'Please provide a startup idea.' });
        }

        if (idea.length < 10) {
            return res.status(400).json({ error: 'Idea too short', message: 'Please provide a more detailed description.' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'Configuration error', message: 'GEMINI_API_KEY is not set in Vercel environment variables.' });
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const requestBody = {
            contents: [{
                parts: [{ text: `${SYSTEM_PROMPT}\n\nStartup idea:\n${idea}` }]
            }]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const rawText = data.candidates[0].content.parts[0].text;
        const generatedText = cleanGeminiText(rawText);
        const sections = parseGeneratedContent(generatedText);

        return res.status(200).json({
            success: true,
            data: { rawContent: generatedText, sections }
        });

    } catch (error) {
        console.error('Error generating requirements:', error);
        return res.status(500).json({
            error: 'Generation failed',
            message: error.message || 'Failed to generate requirements. Please try again.'
        });
    }
}

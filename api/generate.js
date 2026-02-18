// Self-contained Vercel serverless function for /api/generate — uses OpenAI

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

Write 2-3 clear sentences in paragraph form explaining what the product does, what problem it solves, and who it's for. No bullet points - just clean prose.

═══════════════════════════════════════════════════════════

2. SUCCESS METRICS (KPIs)

List 5-7 key business metrics. Format each as:
Metric Name - Brief description of what it measures and why it matters

═══════════════════════════════════════════════════════════

3. USER PERSONAS

Create 3 distinct personas:

PERSONA 1: [Name]
Age: [Range]
Role: [Job title]
Goals: [2-3 goals separated by semicolons]
Pain Points: [2-3 pain points separated by semicolons]
Tech Comfort: [Low/Medium/High]

[Repeat for Persona 2 and 3]

═══════════════════════════════════════════════════════════

4. MVP SCOPE & PRIORITIZATION

Phase 1 (MVP - Launch in 4-6 weeks):
1. [Feature] - description

Phase 2 (Post-MVP):
1. [Feature] - description

Phase 3 (Future):
1. [Feature] - description

═══════════════════════════════════════════════════════════

5. USER FLOWS

FLOW: [Name]
1. [Step]
2. [Step]

[Repeat for 3-5 flows]

═══════════════════════════════════════════════════════════

6. USER STORIES

For [Persona Name]:
- As a [user], I want [goal], so that [benefit]

[10-12 stories total]

═══════════════════════════════════════════════════════════

7. ACCEPTANCE CRITERIA

STORY: [description]
Given [context]
When [action]
Then [expected result]

[5-7 stories]

═══════════════════════════════════════════════════════════

8. KEY RISKS & MITIGATION

Risk: [What could go wrong]
Impact: [High/Medium/Low]
Mitigation: [How to prevent it]

[3-5 risks]

═══════════════════════════════════════════════════════════

Generate ALL 8 sections. NEVER use asterisks. Write like a senior PM.`;

function cleanText(text) {
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
        productOverview: '', successMetrics: '', userPersonas: '',
        mvpScope: '', userFlows: '', userStories: '',
        acceptanceCriteria: '', keyRisks: ''
    };

    const lines = content.split('\n');
    let currentSection = null;
    let sectionContent = [];

    for (const line of lines) {
        const u = line.toUpperCase();
        if (u.includes('PRODUCT OVERVIEW') || u.includes('1. PRODUCT OVERVIEW')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'productOverview'; sectionContent = [];
        } else if (u.includes('SUCCESS METRICS') || u.includes('2. SUCCESS METRICS') || u.includes('KPIS')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'successMetrics'; sectionContent = [];
        } else if (u.includes('USER PERSONAS') || u.includes('3. USER PERSONAS')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'userPersonas'; sectionContent = [];
        } else if (u.includes('MVP SCOPE') || u.includes('4. MVP SCOPE') || u.includes('PRIORITIZATION')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'mvpScope'; sectionContent = [];
        } else if (u.includes('USER FLOWS') || u.includes('5. USER FLOWS')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'userFlows'; sectionContent = [];
        } else if (u.includes('USER STORIES') || u.includes('6. USER STORIES')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'userStories'; sectionContent = [];
        } else if (u.includes('ACCEPTANCE CRITERIA') || u.includes('7. ACCEPTANCE CRITERIA')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'acceptanceCriteria'; sectionContent = [];
        } else if (u.includes('KEY RISKS') || u.includes('8. KEY RISKS') || u.includes('MITIGATION')) {
            if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
            currentSection = 'keyRisks'; sectionContent = [];
        } else if (currentSection) {
            sectionContent.push(line);
        }
    }

    if (currentSection) sections[currentSection] = sectionContent.join('\n').trim();
    return sections;
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { idea } = req.body;

        if (!idea || idea.trim().length === 0)
            return res.status(400).json({ error: 'Idea is required', message: 'Please provide a startup idea.' });
        if (idea.length < 10)
            return res.status(400).json({ error: 'Idea too short', message: 'Please provide a more detailed description.' });

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey)
            return res.status(500).json({ error: 'Configuration error', message: 'OPENAI_API_KEY is not set in Vercel environment variables.' });

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: `Startup idea:\n${idea}` }
                ],
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const rawText = data.choices[0].message.content;
        const generatedText = cleanText(rawText);
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

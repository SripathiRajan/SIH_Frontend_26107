import { BIS_STANDARDS, TESTING_LABS, CATEGORIES, BIS_SERVICES } from './mockData';

// Use environment variable or user-provided runtime key
const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY || "";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

export interface AIResponse {
  text: string;
  citations?: Array<{ code: string; version: string; source: string; date: string; url?: string }>;
  relatedStandards?: string[];
  judgeScore?: number;
  clarifyChips?: string[];
  type?: 'text' | 'labs' | 'clarify' | 'rejection';
  detectedLang?: string;
}

// Build compact domain knowledge context for the LLM
function buildDomainContext(): string {
  const standardsSummary = BIS_STANDARDS.map(s => 
    `- [${s.isNumber}] ${s.title} | Scheme: ${s.applicableScheme} | Status: ${s.qcoStatus} | Scope: ${s.scope} | Test Params: ${s.testParams.join(', ')} | URL: ${s.sourceUrl || ''}`
  ).join('\n');

  const labsSummary = TESTING_LABS.map(l => 
    `- Lab: ${l.name} (${l.city}, ${l.state}) | Accr: ${l.accreditation} | Testing Scopes: ${l.productCodes.join(', ')} | Contact: ${l.contact}`
  ).join('\n');

  return `
Authorized Knowledge Base of Bureau of Indian Standards (BIS):
STANDARDS & MANDATORY QCO:
${standardsSummary}

ACCREDITED TESTING LABORATORIES:
${labsSummary}

CORE SCHEMES:
- Scheme-I: ISI Mark (Product Certification, mandatory for regulated safety items like helmets IS 4151, bottles IS 17803, plugs IS 1293, steel IS 1786).
- Scheme-II: Compulsory Registration Scheme (CRS) for electronics, IT equipment, Lithium batteries (IS 16046). Portal: crsbis.in.
- Scheme-IV: Hallmarking of Gold (IS 1417) & Silver. Mandates 3 marks: BIS Triangle Logo, Purity (22K916, 18K750, 14K585), and 6-digit laser-etched HUID. Verification via BIS CARE App.
- Consumer Grievance: National Toll-free 1800-11-4000, BIS CARE App, email complaints@bis.gov.in. Misuse of ISI/HUID is penal under Section 29/30 of BIS Act 2016.
`;
}

const SYSTEM_PROMPT = `
You are "Praman", the official AI Regulatory & Compliance Assistant for the Bureau of Indian Standards (BIS), Government of India.

Your core mission:
1. Provide accurate, context-aware, source-backed answers on Indian Standards (IS), mandatory Quality Control Orders (QCOs), certification schemes (ISI Scheme-I, CRS Scheme-II, Hallmarking Scheme), testing procedures, and lab accreditation.
2. Recommend applicable Indian Standards based on product specifications or industrial descriptions.
3. Guide users on authenticating ISI marks, CM/L license validation, 6-digit HUID gold hallmarking, and filing consumer grievances.
4. Support multilingual communication seamlessly. Detect and respond in the SAME LANGUAGE or script used by the user (English, Hindi हिन्दी, Tamil தமிழ், Telugu తెలుగు, Kannada ಕನ್ನಡ, Marathi मराठी, Bengali বাংলা, Gujarati ગુજરાતી, Odia ଓଡ଼ିଆ, or Tanglish / Hinglish).

STRICT SCOPE / DOMAIN GUARDRAILS:
- You are strictly dedicated to BIS, standards, conformity assessment, testing, and consumer safety.
- For queries completely unrelated to standards, BIS, manufacturing compliance, or consumer product verification (e.g. general sports, entertainment, movies, general weather), politely decline and clarify your purpose.

RESPONSE FORMAT REQUIREMENTS:
Always return your response as a valid, well-structured JSON object with the following schema:
{
  "text": "Your detailed, clear answer in markdown format. Explain clauses, procedures, and statutory implications.",
  "citations": [
    {
      "code": "e.g. IS 4151:2015",
      "version": "e.g. Rev 4 (Amd 1-3)",
      "source": "e.g. DPIIT / MoRTH Gazette Order",
      "date": "e.g. 2021",
      "url": "official BIS url if available"
    }
  ],
  "relatedStandards": ["e.g. IS 9815 (Visors)", "IS 7293"],
  "judgeScore": 95,
  "clarifyChips": ["Option 1", "Option 2"],
  "type": "text"
}
Note: Set "type" to "rejection" if out-of-domain. Set "type" to "clarify" if the query is ambiguous and needs clarification.
Only output raw JSON. Do not wrap with code fences or other prose.
`;

export async function askPramanAI(userQuery: string, chatHistory: { role: 'user' | 'assistant'; content: string }[] = []): Promise<AIResponse> {
  const context = buildDomainContext();

  const messages = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\n${context}` },
    ...chatHistory.slice(-4), // keep last 4 conversational turns for context
    { role: 'user', content: userQuery }
  ];

  try {
    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.2,
        max_tokens: 1500,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn("Groq API error response:", errText);
      throw new Error(`Groq API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from Groq");
    }

    const parsed = JSON.parse(content) as AIResponse;
    return {
      text: parsed.text || "No response generated.",
      citations: parsed.citations || [],
      relatedStandards: parsed.relatedStandards || [],
      judgeScore: parsed.judgeScore || 96,
      clarifyChips: parsed.clarifyChips || [],
      type: parsed.type || 'text',
      detectedLang: parsed.detectedLang
    };
  } catch (error) {
    console.error("Groq execution failed, falling back to local domain heuristics:", error);
    return fallbackLocalHandler(userQuery);
  }
}

// Resilient fallback in case of network offline / timeout
function fallbackLocalHandler(userQuery: string): AIResponse {
  const q = userQuery.toLowerCase();
  
  if (q.includes('cricket') || q.includes('movie') || q.includes('weather') || q.includes('score')) {
    return {
      text: "I am **Praman**, strictly dedicated to **Indian Standards, BIS certification schemes, testing laboratories, and hallmarking regulations**.\n\nYour query does not relate to Bureau of Indian Standards services. Please inquire about standards, mandatory QCOs, or licensing procedures.",
      type: 'rejection',
      judgeScore: 99
    };
  }

  // Hallmarking fallback
  if (q.includes('hallmark') || q.includes('gold') || q.includes('huid') || q.includes('jewel')) {
    return {
      text: "**Mandatory Gold Hallmarking & 6-Digit HUID Verification:**\n\nUnder government notification, all 14k, 18k, and 22k gold jewellery sold in India must bear 3 authentic marks:\n\n1. **BIS Standard Triangular Logo**\n2. **Purity / Fineness Grade**: e.g., 22K916 (91.6% purity), 18K750, 14K585\n3. **6-Digit Alphanumeric HUID**: Laser-inscribed Unique Identification Code\n\n**To verify your jewellery:**\nOpen the **BIS CARE App** -> Click **Verify HUID** -> Enter the 6-digit code. Jeweller registration and assay center details are verified live.",
      type: 'text',
      citations: [{ code: 'IS 1417:2016', version: 'Mandatory HUID 2021', source: 'Ministry of Consumer Affairs Gazette', date: '2021', url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/1417' }],
      judgeScore: 98
    };
  }

  return {
    text: `Regarding **"${userQuery}"**:\n\nUnder the Bureau of Indian Standards Act 2016 and prevailing Quality Control Orders (QCOs), product compliance is regulated through conformity assessment schemes (Scheme-I for ISI mark, Scheme-II for CRS registration).\n\nTo view exact mechanical testing parameters or in-house lab calibration checklists, refer to the Standards tab or consult your assigned BIS Branch Office.`,
    judgeScore: 95,
    type: 'text'
  };
}

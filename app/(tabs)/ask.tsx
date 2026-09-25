import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Linking 
} from 'react-native';
import { 
  ShieldCheck, 
  Plus, 
  Mic, 
  Send, 
  ExternalLink, 
  Sparkles,
  MapPin,
  Camera,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Volume2,
  Globe
} from 'lucide-react-native';
import { Colors } from '../../constants/theme';
import { TESTING_LABS } from '../../services/mockData';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  type?: 'text' | 'labs' | 'vlm' | 'clarify' | 'rejection';
  citations?: Array<{ code: string; version: string; source: string; date: string }>;
  relatedStandards?: string[];
  judgeScore?: number;
  clarifyChips?: string[];
  vlmMarks?: Array<{ name: string; status: 'detected' | 'unclear' | 'missing'; note: string }>;
  labs?: any[];
}

export default function AskScreen() {
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState<'English' | 'தமிழ்' | 'Tanglish' | 'हिन्दी'>('English');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hi, I'm your Praman assistant. Ask anything about Indian Standards (IS), ISI mark certification, QCO mandates, or testing labs — in plain language or Tanglish.\n\nEvery response is parallel-retrieved from official BIS gazettes, DPIIT QCOs, and verified via our Judge Layer.",
      type: 'text'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (customText?: string) => {
    const text = customText || inputText;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    if (!customText) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const q = text.toLowerCase();

      // 1. REJECTION FILTER: Out-of-domain queries
      if (q.includes('cricket') || q.includes('score') || q.includes('movie') || q.includes('weather')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            type: 'rejection',
            text: `I am **Praman**, strictly dedicated to **Indian Standards, BIS certification schemes, testing laboratories, and hallmarking rules**.\n\nYour query does not relate to Bureau of Indian Standards services. Please ask about product standards, mandatory QCOs, or licensing procedures!`,
            judgeScore: 99
          }
        ]);
        return;
      }

      // 2. CLARIFIER AGENT: Ambiguous "how to get isi mark"
      if ((q.includes('how to get isi') || q.includes('isi mark procedure') || q.includes('apply for isi')) && 
          !q.includes('bottle') && !q.includes('helmet') && !q.includes('plug') && !q.includes('led')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            type: 'clarify',
            text: `The **ISI Mark (Scheme-I)** certification procedure depends strictly on your product category and its in-house testing facility requirements under the relevant Indian Standard.\n\n**Which product does your MSME manufacture?**`,
            clarifyChips: [
              'Stainless Steel Bottles (IS 17803)',
              'Two-Wheeler Helmets (IS 4151)',
              'Electrical Plugs & Sockets (IS 1293)',
              'Packaged Drinking Water (IS 14543)'
            ],
            judgeScore: 95
          }
        ]);
        return;
      }

      // 3. AGENTIC ACTION: Lab directory & Map
      if (q.includes('lab') || q.includes('test') || q.includes('where can i test')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            type: 'labs',
            text: "Parallel retrieval matched 3 NABL-accredited & BIS-recognized testing laboratories for your registered geo-location (Chennai, Tamil Nadu):",
            labs: TESTING_LABS,
            citations: [
              { code: 'NABL ISO/IEC 17025 Directory', version: 'Monthly Sync', source: 'NABL India', date: 'as on 24-Sep-2024' }
            ],
            relatedStandards: ['IS 4151:2015', 'IS 17803:2022'],
            judgeScore: 98
          }
        ]);
        return;
      }

      // 4. TANGLISH / TAMIL QUERY DEMO (Persona 5)
      if (q.includes('helmet standard tamil') || q.includes('tanglish') || q.includes('helmet test pannalam')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            type: 'text',
            text: `வணக்கம்! டூ-வீலர் ஹெல்மெட்களுக்கு **IS 4151:2015 (amended 2021)** கட்டாயத் தரநிலையாகும் (Mandatory QCO).\n\n- **Weight limit:** 1.2 kg தாண்டி இருக்கக்கூடாது.\n- **Testing lab:** Taramani National Test House-ல் ஹெல்மெட் டெஸ்டிங் வசதி உள்ளது.\n- **ISI முத்திரை** இல்லாமல் தயாரிப்பதோ விற்பதோ BIS சட்டம் 2016 படி குற்றமாகும்.`,
            citations: [
              { code: 'IS 4151:2015', version: 'Amd 3 (2021)', source: 'BIS Transport Division', date: 'as on 20-Sep-2024' }
            ],
            relatedStandards: ['IS 16993:2018 (Bicycle Helmets)', 'IS 2925 (Industrial)'],
            judgeScore: 98
          }
        ]);
        return;
      }

      // 5. STAINLESS STEEL BOTTLE (Persona 1)
      if (q.includes('bottle') || q.includes('flask') || q.includes('steel')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            type: 'text',
            text: `Yes! Stainless steel flasks and bottles fall under **Mandatory BIS Certification** as per the Quality Control Order (QCO) issued by DPIIT.\n\n### Key Compliance Highlights:\n1. **Applicable Standard:** **IS 17803:2022** (*Stainless Steel Flasks and Water Bottles*).\n2. **Scheme:** Scheme-I (ISI Mark). Non-ISI manufacturing or retail sale is legally prohibited.\n3. **Raw Material:** Food-grade austenitic stainless steel conforming to **IS 6911:2017** (e.g. AISI 304 or 316).\n4. **Mandatory Lab Tests:** Thermal retention vacuum test (12h/24h) and food contact migration check.`,
            citations: [
              { code: 'IS 17803:2022', version: 'First Edition', source: 'DPIIT QCO S.O. 3144(E)', date: 'as on 24-Sep-2024' }
            ],
            relatedStandards: ['IS 6911:2017 (Stainless Steel Sheets)', 'IS 1394 (Hardware Tests)'],
            judgeScore: 99
          }
        ]);
        return;
      }

      // 6. HELMET QUERY
      if (q.includes('helmet') || q.includes('4151')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            type: 'text',
            text: `Under MoRTH Gazette Order S.O. 4252(E) and Section 129 Motor Vehicles Act, **IS 4151:2015** is mandatory nationwide.\n\n- **Weight Threshold:** Maximum permitted helmet weight is **1,200 grams**.\n- **Crucial Tests:** Rigid hemispherical anvil impact absorption, retention chin-strap micro-slip, and peripheral vision (>105°).\n- **Punitive Penalty:** Non-ISI helmet sales carry criminal liability under Section 29 of the BIS Act 2016.`,
            citations: [
              { code: 'IS 4151:2015', version: 'Revision 4 · Amd 2021', source: 'MoRTH Central Gazette', date: 'as on 20-Sep-2024' }
            ],
            relatedStandards: ['IS 16993:2018 (Cyclist Helmets)', 'IS 2925 (Safety Helmets)'],
            judgeScore: 98
          }
        ]);
        return;
      }

      // Default Grounded Response
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          type: 'text',
          text: `Based on official BIS publications, your query regarding "${text}" is verified. Over 21,480 Indian Standards are cataloged across 15 Division Councils.\n\nCheck Scheme-I product manuals and licensing procedures on manakonline.in.`,
          citations: [
            { code: 'BIS Conformity Assessment 2018', version: 'Current', source: 'BIS Act 2016', date: 'as on 25-Sep-2024' }
          ],
          judgeScore: 94
        }
      ]);
    }, 700);
  };

  // VLM Camera Demo Trigger (Persona 2)
  const handleVlmCapture = () => {
    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: "Can you inspect this gold ornament hallmark photo for genuine BIS 6-digit HUID code?"
      }
    ]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          type: 'vlm',
          text: "Vision-Language Model (VLM) inspection report for uploaded gold hallmark ornament:",
          vlmMarks: [
            { name: 'BIS Standard Triangle Mark', status: 'detected', note: 'Clear triangular laser mark verified' },
            { name: 'Purity Fineness Grade (22K916)', status: 'detected', note: '91.6% pure gold fineness code detected' },
            { name: '6-Digit Alphanumeric HUID', status: 'unclear', note: 'Partially obscured by glare or curvature' }
          ],
          citations: [
            { code: 'IS 1417:2016', version: 'Rev 5 · HUID Mandate', source: 'Consumer Affairs Gazette', date: 'as on 22-Sep-2024' }
          ],
          judgeScore: 96
        }
      ]);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top Yellow Disclaimer Strip */}
        <View style={styles.disclaimerStrip}>
          <ShieldCheck size={14} color="#B45309" />
          <Text style={styles.disclaimerText} numberOfLines={1}>
            Local AI • verified standards DB • Official BIS • Not legal advice
          </Text>
        </View>

        {/* Assistant Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerAvatar}>
              <ShieldCheck size={18} color="#14B8A6" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Praman Assistant</Text>
              <View style={styles.headerStatus}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Grounded Multi-Agent AI</Text>
              </View>
            </View>
          </View>

          {/* Tanglish / Language Pill */}
          <TouchableOpacity 
            style={styles.langPill}
            onPress={() => {
              const langs: Array<'English' | 'தமிழ்' | 'Tanglish' | 'हिन्दी'> = ['English', 'Tanglish', 'தமிழ்', 'हिन्दी'];
              const next = langs[(langs.indexOf(language) + 1) % langs.length];
              setLanguage(next);
            }}
          >
            <Globe size={12} color="#312E81" />
            <Text style={styles.langPillText}>{language}</Text>
          </TouchableOpacity>
        </View>

        {/* Chat Messages */}
        <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
          <View style={styles.dateStamp}>
            <Text style={styles.dateStampText}>TODAY, 05:04 PM</Text>
          </View>

          {messages.map((m, idx) => (
            <View 
              key={idx} 
              style={[
                styles.messageRow, 
                m.sender === 'user' ? styles.userRow : styles.aiRow
              ]}
            >
              {m.sender === 'ai' && (
                <View style={styles.aiSpark}>
                  <Sparkles size={12} color="#D97706" />
                </View>
              )}

              <View 
                style={[
                  styles.messageBubble, 
                  m.sender === 'user' ? styles.userBubble : styles.aiBubble
                ]}
              >
                <Text style={m.sender === 'user' ? styles.userText : styles.aiText}>
                  {m.text}
                </Text>

                {/* VLM Mark Checklist Card (Persona 2) */}
                {m.type === 'vlm' && m.vlmMarks && (
                  <View style={styles.vlmContainer}>
                    <Text style={styles.vlmTitle}>Vision Marks Checklist</Text>
                    {m.vlmMarks.map((mark, mIdx) => (
                      <View key={mIdx} style={styles.markItem}>
                        <View style={styles.markLeft}>
                          {mark.status === 'detected' && <CheckCircle2 size={14} color="#0D9488" />}
                          {mark.status === 'unclear' && <AlertTriangle size={14} color="#D97706" />}
                          {mark.status === 'missing' && <XCircle size={14} color="#DC2626" />}
                          <Text style={styles.markName}>{mark.name}</Text>
                        </View>
                        <Text style={styles.markNote}>{mark.note}</Text>
                      </View>
                    ))}
                    {/* Amber boundary disclaimer */}
                    <View style={styles.vlmDisclaimer}>
                      <Text style={styles.vlmDisclaimerText}>
                        Assistive only. We assist, BIS authenticates — confirm via the official BIS Care app.
                      </Text>
                    </View>
                  </View>
                )}

                {/* Clarifier Chips (Clarifier Agent) */}
                {m.type === 'clarify' && m.clarifyChips && (
                  <View style={styles.clarifyBox}>
                    <Text style={styles.clarifyTitle}>Select your product to view testing standards:</Text>
                    <View style={styles.clarifyChipsRow}>
                      {m.clarifyChips.map((chip, cIdx) => (
                        <TouchableOpacity 
                          key={cIdx} 
                          style={styles.clarifyBtn}
                          onPress={() => sendMessage(`How to get ISI mark for ${chip}`)}
                        >
                          <Text style={styles.clarifyBtnText}>{chip}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Agentic Labs Map Card */}
                {m.type === 'labs' && m.labs && (
                  <View style={styles.labsCardContainer}>
                    {m.labs.map((lab: any) => (
                      <View key={lab.id} style={styles.labCard}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.labName}>{lab.name}</Text>
                          <Text style={styles.labLoc}>{lab.location} • <Text style={{ color: '#312E81', fontWeight: '700' }}>{lab.distance}</Text></Text>
                        </View>
                        <TouchableOpacity 
                          style={styles.openMapsBtn}
                          onPress={() => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(lab.name + ' ' + lab.location)}`)}
                        >
                          <Text style={styles.openMapsText}>Maps</Text>
                          <ExternalLink size={12} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {/* Version-Aware Citation Chips & Grounding Score */}
                {m.citations && m.citations.length > 0 && (
                  <View style={styles.citationRow}>
                    {m.citations.map((c, cIdx) => (
                      <View key={cIdx} style={styles.citationPill}>
                        <Text style={styles.citationCode}>{c.code} ({c.version})</Text>
                        <Text style={styles.citationDate}>{c.date}</Text>
                      </View>
                    ))}
                    {m.judgeScore && (
                      <View style={styles.judgePill}>
                        <Text style={styles.judgeText}>{m.judgeScore}% Grounded</Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Structured Related Standards Panel */}
                {m.relatedStandards && m.relatedStandards.length > 0 && (
                  <View style={styles.relatedRow}>
                    <Text style={styles.relatedLabel}>Related Standards:</Text>
                    {m.relatedStandards.map((rs, rIdx) => (
                      <TouchableOpacity 
                        key={rIdx} 
                        style={styles.relatedChip}
                        onPress={() => sendMessage(`Tell me requirements of ${rs}`)}
                      >
                        <Text style={styles.relatedChipText}>{rs}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

              </View>
            </View>
          ))}

          {isTyping && (
            <View style={styles.typingRow}>
              <Text style={styles.typingText}>Praman is parallel-retrieving & verifying via Judge Layer...</Text>
            </View>
          )}

          {/* 3 Prompt Chips */}
          <View style={styles.chipsContainer}>
            <TouchableOpacity 
              style={styles.chip}
              onPress={() => sendMessage("What standard applies to helmets in Tamil Nadu?")}
            >
              <Text style={styles.chipText}>What standard applies to helmets in Tamil Nadu?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.chip}
              onPress={() => sendMessage("Is stainless steel water bottle under mandatory ISI?")}
            >
              <Text style={styles.chipText}>Is stainless steel bottle under mandatory ISI?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.chip}
              onPress={() => sendMessage("Where can I test my product near me? Locate NABL lab")}
            >
              <Text style={styles.chipText}>Locate NABL testing lab near me</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.chip, { backgroundColor: '#F0FDFA', borderColor: '#CCFBF1' }]}
              onPress={() => sendMessage("Tell me helmet standard in Tamil and Tanglish")}
            >
              <Text style={[styles.chipText, { color: '#0F766E', fontWeight: '600' }]}>Tamil & Tanglish Demo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={handleVlmCapture}
            accessibilityLabel="Inspect Hallmark or Certificate with VLM"
          >
            <Camera size={20} color="#0D9488" />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder={`Ask in ${language} or Tanglish...`}
            placeholderTextColor="#9CA3AF"
            onSubmitEditing={() => sendMessage()}
          />

          <TouchableOpacity style={styles.iconBtn} onPress={() => sendMessage("Where can I test my product near me? Locate NABL lab")}>
            <Mic size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.sendBtn} 
            onPress={() => sendMessage()}
          >
            <Send size={15} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  disclaimerStrip: {
    backgroundColor: '#FEFCE8',
    borderBottomWidth: 1,
    borderBottomColor: '#FEF08A',
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#92400E',
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#312E81',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 11,
    color: '#6B7280',
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  langPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#312E81',
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 24,
    gap: 14,
  },
  dateStamp: {
    alignItems: 'center',
    marginVertical: 4,
  },
  dateStampText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  aiSpark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  messageBubble: {
    borderRadius: 18,
    padding: 14,
    maxWidth: '85%',
  },
  userBubble: {
    backgroundColor: '#312E81',
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
  },
  aiText: {
    color: '#1F2937',
    fontSize: 13,
    lineHeight: 19,
  },
  typingRow: {
    paddingLeft: 30,
  },
  typingText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  chipsContainer: {
    gap: 8,
    marginTop: 12,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 12,
    color: '#374151',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 28,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconBtn: {
    padding: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: '#111827',
    paddingVertical: 6,
  },
  sendBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#312E81',
    alignItems: 'center',
    justifyContent: 'center',
  },
  citationRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  citationPill: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  citationCode: {
    fontSize: 10,
    fontWeight: '700',
    color: '#312E81',
  },
  citationDate: {
    fontSize: 9,
    color: '#6B7280',
  },
  judgePill: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#99F6E4',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  judgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0D9488',
  },
  relatedRow: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    alignItems: 'center',
  },
  relatedLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  relatedChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  relatedChipText: {
    fontSize: 10,
    color: '#4B5563',
  },
  labsCardContainer: {
    marginTop: 10,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 8,
  },
  labCard: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  labLoc: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  openMapsBtn: {
    backgroundColor: '#0D9488',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  openMapsText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  vlmContainer: {
    marginTop: 10,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 10,
    gap: 6,
  },
  vlmTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  markItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
  },
  markLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  markName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1F2937',
  },
  markNote: {
    fontSize: 10,
    color: '#6B7280',
  },
  vlmDisclaimer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  vlmDisclaimerText: {
    fontSize: 10,
    color: '#92400E',
    lineHeight: 14,
  },
  clarifyBox: {
    marginTop: 8,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderRadius: 12,
    padding: 10,
    gap: 6,
  },
  clarifyTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#312E81',
  },
  clarifyChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  clarifyBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#A5B4FC',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  clarifyBtnText: {
    fontSize: 11,
    color: '#312E81',
    fontWeight: '600',
  },
});

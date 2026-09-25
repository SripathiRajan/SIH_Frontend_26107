import React, { useState, useEffect, useRef } from 'react';
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
  Linking,
  Modal,
  Animated,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Plus, 
  Mic, 
  Send, 
  ExternalLink, 
  Camera, 
  Menu,
  X,
  FileText,
  Bookmark,
  Trash2,
  Check,
  Pin,
  PinOff,
  Pencil,
  Settings,
  MessageSquare
} from 'lucide-react-native';
import { Colors, Shadows, Tints } from '../../constants/theme';
import { TESTING_LABS } from '../../services/mockData';
import { useLanguage } from '../../context/LanguageContext';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  type?: 'text' | 'labs' | 'vlm' | 'clarify' | 'rejection' | 'file_upload';
  citations?: Array<{ code: string; version: string; source: string; date: string; url?: string }>;
  relatedStandards?: string[];
  judgeScore?: number;
  clarifyChips?: string[];
  vlmMarks?: Array<{ name: string; status: 'detected' | 'unclear' | 'missing'; note: string }>;
  labs?: any[];
  uploadedFile?: { name: string; type: string; size: string };
}

interface ChatSession {
  id: string;
  title: string;
  isPinned: boolean;
  date: string;
  messages: ChatMessage[];
}

const DRAWER_WIDTH = 320;

export default function AskScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Animated slide drawer
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const slideKnobAnim = useRef(new Animated.Value(0)).current;

  const openDrawer = () => {
    setShowDrawer(true);
    Animated.parallel([
      Animated.spring(drawerAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(slideKnobAnim, {
        toValue: 1,
        useNativeDriver: false,
        tension: 65,
        friction: 11,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.spring(drawerAnim, {
        toValue: -DRAWER_WIDTH,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(slideKnobAnim, {
        toValue: 0,
        useNativeDriver: false,
        tension: 65,
        friction: 11,
      }),
    ]).start(() => {
      setShowDrawer(false);
    });
  };

  const toggleDrawer = () => {
    if (showDrawer) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  // Rename session state
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [targetSessionId, setTargetSessionId] = useState<string | null>(null);
  const [renameText, setRenameText] = useState('');

  // Initial chat sessions seeded with realistic BIS compliance history
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: 'session-1',
      title: 'IS 4151 Helmet Certification Checklist',
      isPinned: true,
      date: 'Yesterday',
      messages: [
        {
          sender: 'ai',
          text: "Hello, I am Praman, your Bureau of Indian Standards compliance assistant. You can ask in English, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Odia, or Gujarati.\n\nEvery response is retrieved from official BIS gazettes, DPIIT QCO orders, and NABL testing protocols.",
          type: 'text'
        },
        {
          sender: 'user',
          text: 'What are the mandatory testing requirements for IS 4151 two-wheeler helmets?'
        },
        {
          sender: 'ai',
          text: 'Under **IS 4151:2015**, motorcycle helmets require mandatory tests:\n1. **Impact Absorption**: Rigid anvil drop at ambient, high (+50°C), low (-10°C), and water-submersion conditions.\n2. **Retention System**: Chin-strap dynamic micro-slip endurance.\n3. **Peripheral Vision & Audibility**: Minimum 105° peripheral clearance.',
          type: 'text',
          citations: [{ code: 'IS 4151:2015', version: 'Rev 4', source: 'MoRTH QCO Gazette S.O. 5001(E)', date: '2021' }]
        }
      ]
    },
    {
      id: 'session-2',
      title: 'Stainless Steel Flask QCO Timeline',
      isPinned: true,
      date: '2 days ago',
      messages: [
        {
          sender: 'user',
          text: 'Is stainless steel water bottle mandatory under ISI mark?'
        },
        {
          sender: 'ai',
          text: 'Yes, **Stainless Steel Flasks and Water Bottles** fall under mandatory certification per **IS 17803:2022** and DPIIT Quality Control Order S.O. 3482(E). MSME non-ISI manufacturing or importing is prohibited.',
          type: 'text',
          citations: [{ code: 'IS 17803:2022', version: 'First Edition', source: 'DPIIT QCO S.O. 3482(E)', date: '2023' }]
        }
      ]
    },
    {
      id: 'session-3',
      title: 'NABL Lab Audit Guindy Guidance',
      isPinned: false,
      date: '3 days ago',
      messages: [
        {
          sender: 'user',
          text: 'Where can I find accredited testing labs near SIDCO Guindy Chennai?'
        },
        {
          sender: 'ai',
          text: 'The closest accredited facility is **National Test House (Southern Region)** at CIT Campus, Taramani (4.8 km from Guindy). Tests IS 4151 helmets and IS 17803 flasks.',
          type: 'text'
        }
      ]
    },
    {
      id: 'session-4',
      title: 'Gold Hallmark HUID Verification',
      isPinned: false,
      date: '5 days ago',
      messages: [
        {
          sender: 'user',
          text: 'How to verify 6-digit alphanumeric HUID on gold jewellery?'
        },
        {
          sender: 'ai',
          text: 'Every authentic hallmarked piece carries a unique 6-digit alphanumeric **HUID** stamped alongside the BIS logo and purity mark (e.g., 22K916). Can be verified via BIS CARE registry.',
          type: 'text'
        }
      ]
    },
    {
      id: 'session-active',
      title: 'Current Consultation',
      isPinned: false,
      date: 'Today',
      messages: [
        {
          sender: 'ai',
          text: "Hello, I am Praman, your Bureau of Indian Standards compliance assistant. You can ask in English, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Odia, or Gujarati.\n\nEvery response is retrieved from official BIS gazettes, DPIIT QCO orders, and NABL testing protocols.",
          type: 'text'
        }
      ]
    }
  ]);

  const [currentSessionId, setCurrentSessionId] = useState<string>('session-active');

  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];
  const messages = currentSession?.messages || [];

  // Compute real-time clock dynamically
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(`TODAY, ${timeStr.toUpperCase()}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const startNewChat = () => {
    const newId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title: `Consultation #${sessions.length + 1}`,
      isPinned: false,
      date: 'Just now',
      messages: [
        {
          sender: 'ai',
          text: "New consultation started. How can I assist you with Indian Standards, mandatory QCOs, or testing laboratories?",
          type: 'text'
        }
      ]
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newId);
    closeDrawer();
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    closeDrawer();
  };

  const togglePinSession = (sessionId: string) => {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, isPinned: !s.isPinned } : s));
  };

  const openRenameModal = (session: ChatSession) => {
    setTargetSessionId(session.id);
    setRenameText(session.title);
    setRenameModalVisible(true);
  };

  const handleSaveRename = () => {
    if (!renameText.trim() || !targetSessionId) return;
    setSessions(prev => prev.map(s => s.id === targetSessionId ? { ...s, title: renameText.trim() } : s));
    setRenameModalVisible(false);
    setTargetSessionId(null);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => {
      const remaining = prev.filter(s => s.id !== sessionId);
      if (remaining.length === 0) {
        const freshId = `session-${Date.now()}`;
        return [{
          id: freshId,
          title: 'Current Consultation',
          isPinned: false,
          date: 'Just now',
          messages: [{
            sender: 'ai',
            text: "Hello, I am Praman, your Bureau of Indian Standards compliance assistant.",
            type: 'text'
          }]
        }];
      }
      return remaining;
    });

    if (currentSessionId === sessionId) {
      const other = sessions.find(s => s.id !== sessionId);
      if (other) {
        setCurrentSessionId(other.id);
      }
    }
  };

  const handleFileUpload = (fileName: string, fileType: string, fileSize: string) => {
    setShowUploadModal(false);
    
    const uploadMsg: ChatMessage = {
      sender: 'user',
      text: `Uploaded: ${fileName} (${fileSize})`,
      type: 'file_upload',
      uploadedFile: { name: fileName, type: fileType, size: fileSize }
    };

    setSessions(prev => prev.map(s => s.id === currentSessionId ? {
      ...s,
      messages: [...s.messages, uploadMsg]
    } : s));

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiReply: ChatMessage = {
        sender: 'ai',
        text: `Document **${fileName}** analyzed successfully.\n\n- **Extracted Standard**: IS 4151:2015 (Motorcycle Helmets)\n- **License Identification**: CM/L-8472910\n- **Test Integrity**: Impact absorption batch curves and chin strap slippage values meet the required thresholds.\n- **Status**: Verified compliant with Gazette S.O. 3482(E).`,
        type: 'text',
        judgeScore: 98,
        citations: [
          { code: 'IS 4151:2015', version: 'Rev 4', source: 'NTH Test Report Extract', date: '2024' }
        ]
      };

      setSessions(prev => prev.map(s => s.id === currentSessionId ? {
        ...s,
        messages: [...s.messages, aiReply]
      } : s));
    }, 1200);
  };

  const handleVlmCapture = () => {
    const userMsg: ChatMessage = {
      sender: 'user',
      text: "[Scanned Image] Inspected ISI Mark stamp and product packaging photo"
    };

    const aiMsg: ChatMessage = {
      sender: 'ai',
      text: "VLM OCR Analysis Complete for submitted image:\n\nAuthentic Scheme-I ISI Mark identified. Verified against BIS licensee registry for Plot 42, SIDCO Guindy.",
      type: 'vlm',
      vlmMarks: [
        { name: 'ISI Mark Graphic (IS 4151)', status: 'detected', note: 'Dimensions & proportional font match BIS specifications' },
        { name: 'CM/L Number (7 Digits)', status: 'detected', note: 'CM/L-8472910 matches active licensee registry' },
        { name: 'Standard Number Sub-script', status: 'detected', note: 'IS 4151:2015 inscribed clearly beneath monogram' }
      ],
      judgeScore: 98
    };

    setSessions(prev => prev.map(s => s.id === currentSessionId ? {
      ...s,
      messages: [...s.messages, userMsg, aiMsg]
    } : s));
  };

  const sendMessage = (customText?: string) => {
    const text = customText || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text };
    
    setSessions(prev => prev.map(s => s.id === currentSessionId ? {
      ...s,
      title: s.title === 'Current Consultation' ? text.slice(0, 32) : s.title,
      messages: [...s.messages, userMsg]
    } : s));

    if (!customText) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const q = text.toLowerCase();
      let aiResponse: ChatMessage;

      // 1. REJECTION FILTER: Out-of-domain queries
      if (q.includes('cricket') || q.includes('score') || q.includes('movie') || q.includes('weather')) {
        aiResponse = {
          sender: 'ai',
          type: 'rejection',
          text: `I am **Praman**, strictly dedicated to **Indian Standards, BIS certification schemes, testing laboratories, and hallmarking regulations**.\n\nYour query does not relate to Bureau of Indian Standards services. Please inquire about standards, mandatory QCOs, or licensing procedures.`,
          judgeScore: 99
        };
      }
      // 2. CLARIFIER AGENT: Ambiguous "how to get isi mark"
      else if ((q.includes('how to get isi') || q.includes('isi mark procedure') || q.includes('apply for isi')) && 
          !q.includes('bottle') && !q.includes('helmet') && !q.includes('plug') && !q.includes('led')) {
        aiResponse = {
          sender: 'ai',
          type: 'clarify',
          text: `The **ISI Mark (Scheme-I)** certification procedure depends on your product category and its in-house testing facility requirements under the relevant Indian Standard.\n\n**Which product does your enterprise manufacture?**`,
          clarifyChips: [
            'Stainless Steel Bottles (IS 17803)',
            'Two-Wheeler Helmets (IS 4151)',
            'Electrical Plugs & Sockets (IS 1293)',
            'Packaged Drinking Water (IS 14543)'
          ],
          judgeScore: 95
        };
      }
      // 3. TAMIL DEMO QUERY
      else if (q.includes('tamil') || q.includes('helmet standard in tamil')) {
        aiResponse = {
          sender: 'ai',
          type: 'text',
          text: `**இருசக்கர வாகன தலைக்கவசம் (Two-Wheeler Helmet) - BIS Standard விவரங்கள்:**\n\n- **Standard Code**: **IS 4151:2015** (Revision 4 with Amendments 1, 2, 3)\n- **QCO Status**: **Mandatory (கட்டாயம்)**. ISI Mark இல்லாமல் இந்தியாவில் ஹெல்மெட் உற்பத்தி செய்யவோ அல்லது விற்கவோ தடை விதிக்கப்பட்டுள்ளது.\n- **முக்கிய பரிசோதனைகள் (Mandatory Tests)**:\n  1. Impact Absorption Test (தாக்கத்தை உறிஞ்சும் சோதனை)\n  2. Retention System (தாடை பட்டை நழுவாமல் இருக்கும் உறுதி)\n  3. Peripheral Vision & Audibility (பார்வை மற்றும் கேட்கும் திறன்)\n\n**அருகிலுள்ள NABL ஆய்வகம்**: NTH Taramani Chennai (4.8 km).`,
          judgeScore: 97,
          citations: [
            { code: 'IS 4151:2015', version: 'Rev 4 (Amd 3)', source: 'MoRTH QCO Gazette S.O. 5001(E)', date: '2021', url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/4151' }
          ]
        };
      }
      // 4. HINDI DEMO QUERY
      else if (q.includes('hindi') || q.includes('मानक') || q.includes('हेलमेट')) {
        aiResponse = {
          sender: 'ai',
          type: 'text',
          text: `**दोपहिया वाहन हेलमेट (Two-Wheeler Helmets) - बीआईएस मानक विवरण:**\n\n- **मानक कोड**: **IS 4151:2015** (चौथा संशोधन)\n- **क्यूसीओ स्थिति**: **अनिवार्य (Mandatory)**। बिना आईएसआई मार्क के उत्पादन या बिक्री पूर्णतः प्रतिबंधित है।\n- **अनिवार्य परीक्षण**:\n  1. संघात अवशोषण परीक्षण (Impact Absorption Test)\n  2. चिन-स्ट्रैप माइक्रो-स्लिप टेस्ट\n  3. परिधीय दृष्टि और श्रवण परीक्षण\n\nयह स्कीम-I (ISI Mark) के अंतर्गत आता है। चेन्नई में नजदीकी परीक्षण लैब नेशनल टेस्ट हाउस (तारामणि) है।`,
          judgeScore: 98,
          citations: [
            { code: 'IS 4151:2015', version: 'Rev 4', source: 'DPIIT Central Gazette', date: '2021', url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/4151' }
          ]
        };
      }
      // 5. STAINLESS STEEL BOTTLE QUERY
      else if (q.includes('stainless') || q.includes('bottle') || q.includes('flask') || q.includes('17803')) {
        aiResponse = {
          sender: 'ai',
          type: 'text',
          text: `Yes, **Stainless Steel Flasks and Water Bottles** are under mandatory BIS certification under **IS 17803:2022**.\n\n- **Enforcing Ministry**: DPIIT (Ministry of Commerce and Industry)\n- **Scheme**: Scheme-I (ISI Mark)\n- **Scope**: Thermal insulation retention (12h/24h hot and cold), food grade austenitic stainless steel (Grade 304/316), and drop impact durability.\n- **MSME Compliance**: All non-ISI manufacturing or importing is prohibited.`,
          judgeScore: 97,
          citations: [
            { code: 'IS 17803:2022', version: 'First Edition', source: 'DPIIT QCO S.O. 3482(E)', date: '2023', url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/17803' }
          ]
        };
      }
      // 6. TESTING LABS NEARBY QUERY
      else if (q.includes('lab') || q.includes('test') || q.includes('where can i test') || q.includes('locate')) {
        aiResponse = {
          sender: 'ai',
          type: 'labs',
          text: `Located **${TESTING_LABS.length} accredited testing laboratories** across India matching your active manufacturing scopes (IS 4151 and IS 17803). Here are the primary facilities:`,
          labs: TESTING_LABS.slice(0, 3),
          judgeScore: 99
        };
      }
      // 7. GENUINE / FAKE ISI PRODUCT CHECK
      else if (q.includes('genuine') || q.includes('fake') || q.includes('authentic') || q.includes('verify product') || q.includes('real isi') || q.includes('check isi')) {
        aiResponse = {
          sender: 'ai',
          type: 'text',
          text: `To verify whether an ISI mark on a product is genuine or counterfeit, inspect three essential elements:\n\n1. **Standard Number (IS Code)**: Must be prominently inscribed directly above the ISI monogram (e.g., IS 4151).\n2. **License Number (CM/L)**: Must be a 7-digit numeric code inscribed directly underneath (e.g., CM/L-8472910).\n3. **BIS CARE Verification**: Enter the 7-digit CM/L number into the BIS CARE mobile app to confirm active validity and registered manufacturing address.\n\nMisuse of the ISI mark is a cognizable offence under Section 29 of the BIS Act, 2016, punishable by imprisonment and heavy penalties.`,
          judgeScore: 99,
          citations: [
            { code: 'BIS Act 2016', version: 'Section 29', source: 'Bureau of Indian Standards Enforcement Bureau', date: '2016' }
          ]
        };
      }
      // 8. GOLD HALLMARK & HUID VERIFICATION
      else if (q.includes('hallmark') || q.includes('huid') || q.includes('gold')) {
        aiResponse = {
          sender: 'ai',
          type: 'text',
          text: `**Gold Hallmarking & 6-Digit HUID Verification Protocol:**\n\nUnder mandatory BIS hallmarking orders, every hallmarked gold article must have 3 distinct marks:\n1. **BIS Standard Mark** (Triangular emblem).\n2. **Purity in Karat and Fineness** (e.g., 22K916, 18K750, 14K585).\n3. **6-Digit Alphanumeric HUID** (e.g., 7H8K9M).\n\nYou can verify the hallmarking centre and jeweller registration number instantly via the BIS CARE App using the HUID code.`,
          judgeScore: 99,
          citations: [
            { code: 'IS 1417:2016', version: 'Gold Hallmarking Standard', source: 'Ministry of Consumer Affairs Notification', date: '2023' }
          ]
        };
      }
      // 9. CONSUMER COMPLAINT
      else if (q.includes('complaint') || q.includes('grievance') || q.includes('1800') || q.includes('report')) {
        aiResponse = {
          sender: 'ai',
          type: 'text',
          text: `To lodge a formal consumer grievance regarding substandard products or unauthorized ISI mark usage:\n\n- **National Consumer Helpline**: 1800-11-4000 (Toll-Free, 09:30 AM to 05:30 PM)\n- **BIS CARE Mobile App**: File with geotagged photo proof.\n- **Direct Enforcement**: Complaints regarding counterfeit ISI marks prompt unannounced market surveillance raids by BIS Branch Officers.`,
          judgeScore: 98,
          citations: [
            { code: 'BIS Consumer Redressal Regulations', version: '2018', source: 'Consumer Affairs Department', date: '2023' }
          ]
        };
      }
      // DEFAULT FALLBACK
      else {
        aiResponse = {
          sender: 'ai',
          type: 'text',
          text: `Regarding **"${text}"**:\n\nOfficial Indian Standards and Quality Control Orders require verified testing scopes for domestic and imported goods. Your facility (Plot 42, SIDCO Guindy) maintains active licenses under **IS 4151:2015** (Helmets) and **IS 17803:2022** (Flasks).\n\nAsk about specific standard testing protocols, mandatory cutoffs, or nearby NABL testing laboratories.`,
          judgeScore: 94,
          citations: [
            { code: 'BIS Connect Portal', version: '2.0', source: 'Official Gazette Database', date: '2024' }
          ]
        };
      }

      setSessions(prev => prev.map(s => s.id === currentSessionId ? {
        ...s,
        messages: [...s.messages, aiResponse]
      } : s));
    }, 800);
  };

  const pinnedSessions = sessions.filter(s => s.isPinned);
  const recentSessions = sessions.filter(s => !s.isPinned);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Assistant Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.sidebarToggleBtn}
              onPress={toggleDrawer}
              activeOpacity={0.7}
              accessibilityLabel="Toggle Chat Sessions Sidebar"
            >
              <View style={styles.sidebarIcon}>
                <View style={styles.sidebarIconPanel} />
                <View style={styles.sidebarIconContent} />
              </View>
            </TouchableOpacity>

            <View>
              <Text style={styles.headerTitle}>{t('praman_header_title')}</Text>
              <Text style={styles.headerSub}>{t('praman_header_sub')}</Text>
            </View>
          </View>

          {/* Settings Button on Top Right */}
          <TouchableOpacity 
            style={styles.settingsBtn}
            onPress={() => router.push('/settings')}
            activeOpacity={0.7}
            accessibilityLabel="Settings"
          >
            <Settings size={18} color="#475569" />
          </TouchableOpacity>
        </View>

        {/* Auto Language Detection Banner */}
        <View style={styles.autoLangStrip}>
          <Text style={styles.autoLangText}>
            {t('auto_lang_banner')}
          </Text>
        </View>

        {/* Chat Messages */}
        <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
          <View style={styles.dateStamp}>
            <Text style={styles.dateStampText}>{currentTime || 'TODAY'}</Text>
          </View>

          {messages.map((m, idx) => (
            <View 
              key={idx} 
              style={[
                styles.messageRow, 
                m.sender === 'user' ? styles.userRow : styles.aiRow
              ]}
            >
              <View 
                style={[
                  styles.messageBubble, 
                  m.sender === 'user' ? styles.userBubble : styles.aiBubble
                ]}
              >
                {/* Uploaded File Pill inside User Bubble */}
                {m.type === 'file_upload' && m.uploadedFile && (
                  <View style={styles.filePill}>
                    <FileText size={16} color="#FFFFFF" />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.fileNameText}>{m.uploadedFile.name}</Text>
                      <Text style={styles.fileSizeText}>{m.uploadedFile.size}</Text>
                    </View>
                  </View>
                )}

                <Text 
                  style={[
                    styles.messageText, 
                    m.sender === 'user' ? styles.userText : styles.aiText
                  ]}
                >
                  {m.text}
                </Text>

                {/* VLM Verification Marks Breakdown */}
                {m.type === 'vlm' && m.vlmMarks && (
                  <View style={styles.vlmContainer}>
                    <Text style={styles.vlmHeader}>STAMP INSPECTION PROTOCOL</Text>
                    {m.vlmMarks.map((mark, mIdx) => (
                      <View key={mIdx} style={styles.vlmRow}>
                        <View style={styles.vlmStatusIcon}>
                          <Check size={12} color="#047857" />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.vlmMarkName}>{mark.name}</Text>
                          <Text style={styles.vlmMarkNote}>{mark.note}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                {/* Grounded BIS Gazette Citations */}
                {m.citations && m.citations.length > 0 && (
                  <View style={styles.citationsBox}>
                    <Text style={styles.citationsHeader}>OFFICIAL BIS CITATIONS & GAZETTE REFERENCE</Text>
                    {m.citations.map((c, cIdx) => (
                      <View key={cIdx} style={styles.citationItem}>
                        <Text style={styles.citationCode}>{c.code} ({c.version})</Text>
                        <Text style={styles.citationSource}>{c.source} · {c.date}</Text>
                        {c.url && (
                          <TouchableOpacity 
                            style={styles.citationLinkBtn}
                            onPress={() => Linking.openURL(c.url!)}
                          >
                            <Text style={styles.citationLinkText}>Open official standard registry</Text>
                            <ExternalLink size={11} color="#1565C0" />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>
                )}

                {/* Clarifier Chips */}
                {m.type === 'clarify' && m.clarifyChips && (
                  <View style={styles.clarifyBox}>
                    <Text style={styles.clarifyHeading}>SELECT PRODUCT TO CONTINUE</Text>
                    <View style={styles.clarifyChipsRow}>
                      {m.clarifyChips.map((chip, cIdx) => (
                        <TouchableOpacity 
                          key={cIdx}
                          style={styles.clarifyChip}
                          onPress={() => sendMessage(`How to get ISI mark for ${chip}`)}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.clarifyChipText}>{chip}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Embedded NABL Labs */}
                {m.type === 'labs' && m.labs && (
                  <View style={styles.embeddedLabs}>
                    {m.labs.map((lab: any) => (
                      <View key={lab.id} style={styles.embeddedLabCard}>
                        <Text style={styles.embeddedLabName}>{lab.name}</Text>
                        <Text style={styles.embeddedLabLoc}>{lab.city}, {lab.state} · {lab.distance}</Text>
                        <TouchableOpacity 
                          style={styles.labNavBtn}
                          onPress={() => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(lab.name + ' ' + lab.address)}`)}
                        >
                          <Text style={styles.labNavBtnText}>View on map</Text>
                          <ExternalLink size={12} color="#0F172A" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

              </View>
            </View>
          ))}

          {isTyping && (
            <View style={styles.aiRow}>
              <View style={styles.aiBubble}>
                <Text style={styles.typingText}>Praman is retrieving official gazettes...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Suggestion Chips */}
        <View style={styles.chipsSection}>
          <TouchableOpacity 
            style={styles.chip}
            onPress={() => sendMessage("What are the mandatory testing requirements for IS 4151 two-wheeler helmets?")}
          >
            <Text style={styles.chipText}>{t('chip_prompt_helmet')}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.chip}
            onPress={() => sendMessage("Is stainless steel bottle under mandatory ISI?")}
          >
            <Text style={styles.chipText}>{t('chip_prompt_bottle')}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.chip}
            onPress={() => sendMessage("Where can I test my product near me? Locate NABL lab")}
          >
            <Text style={styles.chipText}>{t('chip_prompt_labs')}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.chip}
            onPress={() => sendMessage("How to verify whether an ISI mark is genuine or fake?")}
          >
            <Text style={styles.chipText}>{t('chip_prompt_fake_isi')}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.chip}
            onPress={() => sendMessage("How to verify gold hallmark and HUID?")}
          >
            <Text style={styles.chipText}>{t('chip_prompt_hallmark')}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.chip}
            onPress={() => sendMessage("How to file consumer complaint or grievance to BIS?")}
          >
            <Text style={styles.chipText}>{t('chip_prompt_complaint')}</Text>
          </TouchableOpacity>
        </View>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={() => setShowUploadModal(true)}
            accessibilityLabel="Upload Document"
          >
            <Plus size={18} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={handleVlmCapture}
            accessibilityLabel="Inspect Stamp or Certificate with VLM"
          >
            <Camera size={18} color="#6B7280" />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder={t('ask_input_placeholder')}
            placeholderTextColor="#9CA3AF"
            onSubmitEditing={() => sendMessage()}
          />

          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={() => sendMessage("Locate NABL accredited testing laboratory")}
          >
            <Mic size={18} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.sendBtn} 
            onPress={() => sendMessage()}
          >
            <Send size={15} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>

      {/* Animated Slide Bar (Drawer) for Chat Sessions */}
      {showDrawer && (
        <Animated.View 
          style={[
            styles.drawerOverlay,
            { opacity: backdropAnim },
          ]}
          pointerEvents="auto"
        >
          <TouchableOpacity 
            style={StyleSheet.absoluteFillObject} 
            onPress={closeDrawer}
            activeOpacity={1}
          />
        </Animated.View>
      )}

      <Animated.View 
        style={[
          styles.slideBarContainer,
          { transform: [{ translateX: drawerAnim }] },
        ]}
        pointerEvents={showDrawer ? 'auto' : 'none'}
      >
        {/* Slide Bar Header */}
        <View style={styles.slideBarHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MessageSquare size={18} color="#1565C0" />
            <Text style={styles.slideBarTitle}>{t('chat_sessions')}</Text>
          </View>
          <TouchableOpacity onPress={closeDrawer} style={{ padding: 4 }}>
            <X size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* New Chat Button */}
        <TouchableOpacity 
          style={styles.newChatBtn}
          onPress={startNewChat}
          activeOpacity={0.85}
        >
          <Plus size={16} color="#FFFFFF" />
          <Text style={styles.newChatBtnText}>{t('new_chat')}</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.slideBarScroll} showsVerticalScrollIndicator={false}>
          
          {/* Pinned Chats Section */}
          {pinnedSessions.length > 0 && (
            <View style={styles.sessionSection}>
              <View style={styles.sectionHeaderRow}>
                <Pin size={12} color="#F59E0B" />
                <Text style={styles.sectionLabel}>{t('pinned_chats')}</Text>
              </View>
              
              {pinnedSessions.map((session) => {
                const isActive = session.id === currentSessionId;
                return (
                  <View 
                    key={session.id} 
                    style={[styles.sessionCard, isActive && styles.sessionCardActive]}
                  >
                    <TouchableOpacity 
                      style={styles.sessionInfo}
                      onPress={() => handleSelectSession(session.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.sessionTitle, isActive && styles.sessionTitleActive]} numberOfLines={1}>
                        {session.title}
                      </Text>
                      <Text style={styles.sessionDate}>{session.date}</Text>
                    </TouchableOpacity>

                    <View style={styles.sessionActions}>
                      <TouchableOpacity 
                        style={styles.actionIconBtn} 
                        onPress={() => togglePinSession(session.id)}
                        accessibilityLabel="Unpin Chat"
                      >
                        <PinOff size={14} color="#F59E0B" />
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.actionIconBtn} 
                        onPress={() => openRenameModal(session)}
                        accessibilityLabel="Rename Chat"
                      >
                        <Pencil size={14} color="#64748B" />
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.actionIconBtn} 
                        onPress={() => handleDeleteSession(session.id)}
                        accessibilityLabel="Delete Chat"
                      >
                        <Trash2 size={14} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* Recent Chats Section */}
          <View style={styles.sessionSection}>
            <View style={styles.sectionHeaderRow}>
              <MessageSquare size={12} color="#64748B" />
              <Text style={styles.sectionLabel}>{t('recent_chats')}</Text>
            </View>

            {recentSessions.map((session) => {
              const isActive = session.id === currentSessionId;
              return (
                <View 
                  key={session.id} 
                  style={[styles.sessionCard, isActive && styles.sessionCardActive]}
                >
                  <TouchableOpacity 
                    style={styles.sessionInfo}
                    onPress={() => handleSelectSession(session.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.sessionTitle, isActive && styles.sessionTitleActive]} numberOfLines={1}>
                      {session.title}
                    </Text>
                    <Text style={styles.sessionDate}>{session.date}</Text>
                  </TouchableOpacity>

                  <View style={styles.sessionActions}>
                    <TouchableOpacity 
                      style={styles.actionIconBtn} 
                      onPress={() => togglePinSession(session.id)}
                      accessibilityLabel="Pin Chat"
                    >
                      <Pin size={14} color="#94A3B8" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.actionIconBtn} 
                      onPress={() => openRenameModal(session)}
                      accessibilityLabel="Rename Chat"
                    >
                      <Pencil size={14} color="#64748B" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.actionIconBtn} 
                      onPress={() => handleDeleteSession(session.id)}
                      accessibilityLabel="Delete Chat"
                    >
                      <Trash2 size={14} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>

        </ScrollView>
      </Animated.View>

      {/* Rename Chat Modal */}
      <Modal
        visible={renameModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setRenameModalVisible(false)}
      >
        <SafeAreaView style={styles.modalBackdrop}>
          <View style={styles.renameModalContent}>
            <Text style={styles.renameModalTitle}>{t('rename_chat_title')}</Text>
            <Text style={styles.renameModalSub}>{t('enter_new_title')}</Text>
            
            <TextInput
              style={styles.renameInput}
              value={renameText}
              onChangeText={setRenameText}
              placeholder="e.g. Helmet Batch Test Records"
              placeholderTextColor="#94A3B8"
              autoFocus
            />

            <View style={styles.renameActionsRow}>
              <TouchableOpacity 
                style={styles.cancelBtn}
                onPress={() => setRenameModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>{t('cancel')}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.saveBtn}
                onPress={handleSaveRename}
              >
                <Text style={styles.saveBtnText}>{t('save')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Upload Document Modal */}
      <Modal
        visible={showUploadModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUploadModal(false)}
      >
        <SafeAreaView style={styles.uploadOverlay}>
          <View style={styles.uploadModalContent}>
            <View style={styles.uploadModalHeader}>
              <View>
                <Text style={styles.uploadModalTitle}>Upload Regulatory File</Text>
                <Text style={styles.uploadModalSub}>Supports PDF, JPEG, PNG, XLSX test data</Text>
              </View>
              <TouchableOpacity onPress={() => setShowUploadModal(false)}>
                <X size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <View style={styles.uploadOptionsList}>
              <TouchableOpacity 
                style={styles.uploadOptionCard}
                onPress={() => handleFileUpload('IS_4151_Helmet_TestReport_2024.pdf', 'PDF', '2.4 MB')}
                activeOpacity={0.8}
              >
                <FileText size={22} color="#1565C0" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.uploadOptionTitle}>IS_4151_Helmet_TestReport_2024.pdf</Text>
                  <Text style={styles.uploadOptionDesc}>Batch impact & chin strap tests · 2.4 MB</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.uploadOptionCard}
                onPress={() => handleFileUpload('NTH_Flask_MaterialPurity_Grade304.pdf', 'PDF', '1.8 MB')}
                activeOpacity={0.8}
              >
                <FileText size={22} color="#0D9488" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.uploadOptionTitle}>NTH_Flask_MaterialPurity_Grade304.pdf</Text>
                  <Text style={styles.uploadOptionDesc}>Chemical spectrometry & thickness · 1.8 MB</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sidebarToggleBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarIcon: {
    width: 28,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#475569',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  sidebarIconPanel: {
    width: 8,
    height: '100%',
    backgroundColor: '#475569',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  sidebarIconContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoLangStrip: {
    backgroundColor: '#EBF5FF',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 6,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  autoLangText: {
    fontSize: 11,
    color: '#1565C0',
    textAlign: 'center',
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 20,
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
    letterSpacing: 0.5,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '85%',
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  userBubble: {
    backgroundColor: '#1565C0',
    borderBottomRightRadius: 2,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 19,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#1F2937',
  },
  filePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  fileNameText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  fileSizeText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  vlmContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  vlmHeader: {
    fontSize: 9,
    fontWeight: '800',
    color: '#166534',
    letterSpacing: 0.5,
  },
  vlmRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  vlmStatusIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  vlmMarkName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#14532D',
  },
  vlmMarkNote: {
    fontSize: 10,
    color: '#166534',
  },
  citationsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
    marginTop: 4,
  },
  citationsHeader: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  citationItem: {
    gap: 1,
  },
  citationCode: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  citationSource: {
    fontSize: 10,
    color: '#475569',
  },
  citationLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  citationLinkText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1565C0',
  },
  clarifyBox: {
    gap: 6,
    marginTop: 4,
  },
  clarifyHeading: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
  },
  clarifyChipsRow: {
    gap: 6,
  },
  clarifyChip: {
    backgroundColor: '#EEF2FF',
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  clarifyChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3730A3',
  },
  embeddedLabs: {
    gap: 8,
    marginTop: 4,
  },
  embeddedLabCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 2,
  },
  embeddedLabName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  embeddedLabLoc: {
    fontSize: 11,
    color: '#64748B',
  },
  labNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  labNavBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  typingText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },

  // Suggestion Chips
  chipsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipText: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
  },

  // Input Bar
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  iconBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 6,
    paddingVertical: 6,
    fontSize: 12,
    color: '#0F172A',
  },
  sendBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Slide Bar (Drawer) Styles
  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    zIndex: 998,
  },
  slideBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingTop: Platform.OS === 'web' ? 16 : 50,
    gap: 14,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 999,
  },
  slideBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  slideBarTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  newChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 10,
  },
  newChatBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  slideBarScroll: {
    gap: 16,
    paddingBottom: 20,
  },
  sessionSection: {
    gap: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.6,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  sessionCardActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#1565C0',
  },
  sessionInfo: {
    flex: 1,
    marginRight: 6,
  },
  sessionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  sessionTitleActive: {
    color: '#1565C0',
    fontWeight: '700',
  },
  sessionDate: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  sessionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionIconBtn: {
    padding: 5,
    borderRadius: 4,
  },

  // Rename Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  renameModalContent: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    gap: 10,
  },
  renameModalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  renameModalSub: {
    fontSize: 11,
    color: '#64748B',
  },
  renameInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#0F172A',
    marginTop: 4,
  },
  renameActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 6,
  },
  cancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  cancelBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  saveBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#1565C0',
  },
  saveBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Upload Modal
  uploadOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  uploadModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 18,
    gap: 14,
  },
  uploadModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  uploadModalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  uploadModalSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  uploadOptionsList: {
    gap: 10,
  },
  uploadOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  uploadOptionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  uploadOptionDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
});

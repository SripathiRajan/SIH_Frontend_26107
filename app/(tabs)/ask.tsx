import React, { useState, useEffect } from 'react';
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
  Modal
} from 'react-native';
import { 
  Plus, 
  Mic, 
  Send, 
  ExternalLink, 
  Camera, 
  Volume2,
  Menu,
  X,
  FileText,
  Bookmark,
  Trash2,
  Upload,
  Check
} from 'lucide-react-native';
import { Colors } from '../../constants/theme';
import { TESTING_LABS } from '../../services/mockData';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  type?: 'text' | 'labs' | 'vlm' | 'clarify' | 'rejection' | 'file_upload';
  citations?: Array<{ code: string; version: string; source: string; date: string }>;
  relatedStandards?: string[];
  judgeScore?: number;
  clarifyChips?: string[];
  vlmMarks?: Array<{ name: string; status: 'detected' | 'unclear' | 'missing'; note: string }>;
  labs?: any[];
  uploadedFile?: { name: string; type: string; size: string };
}

export default function AskScreen() {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hello, I am Praman, your Bureau of Indian Standards (BIS) compliance assistant. You can ask in English, Hindi, Tamil, Marathi, Bengali, Odia, Kannada, Telugu, Gujarati, or Tanglish.\n\nEvery response is retrieved from official BIS gazettes, DPIIT QCO orders, and NABL testing protocols.",
      type: 'text'
    }
  ]);

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
    setMessages([
      {
        sender: 'ai',
        text: "New consultation started. How can I assist you with Indian Standards, mandatory QCOs, or testing laboratories?",
        type: 'text'
      }
    ]);
    setShowDrawer(false);
  };

  const handleFileUpload = (fileName: string, fileType: string, fileSize: string) => {
    setShowUploadModal(false);
    
    // Add user upload message
    const uploadMsg: ChatMessage = {
      sender: 'user',
      text: `Uploaded: ${fileName} (${fileSize})`,
      type: 'file_upload',
      uploadedFile: { name: fileName, type: fileType, size: fileSize }
    };

    setMessages(prev => [...prev, uploadMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Document **${fileName}** analyzed successfully.\n\n- **Extracted Standard**: IS 4151:2015 (Motorcycle Helmets)\n- **License Identification**: CM/L-8472910\n- **Test Integrity**: Impact absorption batch curves and chin strap slippage values meet the required thresholds.\n- **Status**: Verified compliant with Gazette S.O. 3482(E).`,
          type: 'text',
          judgeScore: 98,
          citations: [
            { code: 'IS 4151:2015', version: 'Rev 4', source: 'NTH Test Report Extract', date: '2024' }
          ]
        }
      ]);
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

    setMessages(prev => [...prev, userMsg, aiMsg]);
  };

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
            text: `I am **Praman**, strictly dedicated to **Indian Standards, BIS certification schemes, testing laboratories, and hallmarking regulations**.\n\nYour query does not relate to Bureau of Indian Standards services. Please inquire about standards, mandatory QCOs, or licensing procedures.`,
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
            text: `The **ISI Mark (Scheme-I)** certification procedure depends on your product category and its in-house testing facility requirements under the relevant Indian Standard.\n\n**Which product does your enterprise manufacture?**`,
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

      // 3. TAMIL / TANGLISH DEMO QUERY
      if (q.includes('tamil') || q.includes('tanglish') || q.includes('helmet standard in tamil')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            type: 'text',
            text: `**இருசக்கர வாகன தலைக்கவசம் (Two-Wheeler Helmet) - BIS Standard விவரங்கள்:**\n\n- **Standard Code**: **IS 4151:2015** (Revision 4 with Amendments 1, 2, 3)\n- **QCO Status**: **Mandatory (கட்டாயம்)**. ISI Mark இல்லாமல் இந்தியாவில் ஹெல்மெட் உற்பத்தி செய்யவோ அல்லது விற்கவோ தடை விதிக்கப்பட்டுள்ளது.\n- **முக்கிய பரிசோதனைகள் (Mandatory Tests)**:\n  1. Impact Absorption Test (தாக்கத்தை உறிஞ்சும் சோதனை)\n  2. Retention System (தாடை பட்டை நழுவாமல் இருக்கும் உறுதி)\n  3. Peripheral Vision & Audibility (பார்வை மற்றும் கேட்கும் திறன்)\n\n**Tanglish Summary**: Neenga two-wheeler helmet manufacture panreenga na, **IS 4151:2015** Scheme-I keezha compulsory **ISI Mark license** edukkanum. Nearby NABL testing facility: NTH Taramani Chennai (4.8 km).`,
            judgeScore: 97,
            citations: [
              { code: 'IS 4151:2015', version: 'Rev 4 (Amd 3)', source: 'MoRTH QCO Gazette S.O. 5001(E)', date: '2021' }
            ]
          }
        ]);
        return;
      }

      // 4. HINDI DEMO QUERY
      if (q.includes('hindi') || q.includes('मानक') || q.includes('हेलमेट')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            type: 'text',
            text: `**दोपहिया वाहन हेलमेट (Two-Wheeler Helmets) - बीआईएस मानक विवरण:**\n\n- **मानक कोड**: **IS 4151:2015** (चौथा संशोधन)\n- **क्यूसीओ स्थिति**: **अनिवार्य (Mandatory)**। बिना आईएसआई मार्क के उत्पादन या बिक्री पूर्णतः प्रतिबंधित है।\n- **अनिवार्य परीक्षण**:\n  1. संघात अवशोषण परीक्षण (Impact Absorption Test)\n  2. चिन-स्ट्रैप माइक्रो-स्लिप टेस्ट\n  3. परिधीय दृष्टि और श्रवण परीक्षण\n\nयह स्कीम-I (ISI Mark) के अंतर्गत आता है। चेन्नई में नजदीकी परीक्षण लैब नेशनल टेस्ट हाउस (तारामणि) है।`,
            judgeScore: 98,
            citations: [
              { code: 'IS 4151:2015', version: 'Rev 4', source: 'DPIIT Central Gazette', date: '2021' }
            ]
          }
        ]);
        return;
      }

      // 5. STAINLESS STEEL BOTTLE QUERY
      if (q.includes('stainless') || q.includes('bottle') || q.includes('flask') || q.includes('17803')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            type: 'text',
            text: `Yes, **Stainless Steel Flasks and Water Bottles** are under mandatory BIS certification under **IS 17803:2022**.\n\n- **Enforcing Ministry**: DPIIT (Ministry of Commerce and Industry)\n- **Scheme**: Scheme-I (ISI Mark)\n- **Scope**: Thermal insulation retention (12h/24h hot and cold), food grade austenitic stainless steel (Grade 304/316), and drop impact durability.\n- **MSME Compliance**: All non-ISI manufacturing or importing is prohibited.`,
            judgeScore: 97,
            citations: [
              { code: 'IS 17803:2022', version: 'First Edition', source: 'DPIIT QCO S.O. 3482(E)', date: '2023' }
            ]
          }
        ]);
        return;
      }

      // 6. TESTING LABS NEARBY QUERY
      if (q.includes('lab') || q.includes('test') || q.includes('where can i test') || q.includes('locate')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            type: 'labs',
            text: `Located **${TESTING_LABS.length} accredited testing laboratories** across India matching your active manufacturing scopes (IS 4151 and IS 17803). Here are the primary facilities:`,
            labs: TESTING_LABS.slice(0, 3),
            judgeScore: 99
          }
        ]);
        return;
      }

      // 7. DEFAULT RESPONSE
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          type: 'text',
          text: `Regarding **"${text}"**:\n\nUnder the Bureau of Indian Standards Act 2016 and prevailing Quality Control Orders (QCOs), product compliance is regulated through conformity assessment schemes (Scheme-I for ISI mark, Scheme-II for CRS registration).\n\nTo view exact mechanical testing parameters or in-house lab calibration checklists, refer to the Standards tab or consult your assigned CNBO officer.`,
          judgeScore: 94
        }
      ]);
    }, 800);
  };

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
              style={styles.hamburgerBtn}
              onPress={() => setShowDrawer(true)}
              activeOpacity={0.7}
              accessibilityLabel="Open History & Favourites Menu"
            >
              <Menu size={20} color="#0F172A" />
            </TouchableOpacity>

            <View>
              <Text style={styles.headerTitle}>Praman Compliance Assistant</Text>
              <Text style={styles.headerSub}>Official BIS Regulatory Knowledge Base</Text>
            </View>
          </View>
        </View>

        {/* Auto Language Detection Banner */}
        <View style={styles.autoLangStrip}>
          <Text style={styles.autoLangText}>
            Auto Language Detection: Active (English, हिन्दी, தமிழ், मराठी, বাংলা, ଓଡ଼ିଆ, ಕನ್ನಡ, తెలుగు & Tanglish)
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
                      <Text style={styles.fileSizeText}>{m.uploadedFile.size} · {m.uploadedFile.type}</Text>
                    </View>
                  </View>
                )}

                <Text style={m.sender === 'user' ? styles.userText : styles.aiText}>
                  {m.text}
                </Text>

                {/* VLM Mark Checklist Card */}
                {m.type === 'vlm' && m.vlmMarks && (
                  <View style={styles.vlmContainer}>
                    <Text style={styles.vlmHeading}>AUTHENTICITY VERIFICATION CHECKLIST</Text>
                    {m.vlmMarks.map((mk, mi) => (
                      <View key={mi} style={styles.vlmItem}>
                        <View style={styles.checkCircle}>
                          <Check size={11} color="#047857" />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.vlmMarkName}>{mk.name}</Text>
                          <Text style={styles.vlmMarkNote}>{mk.note}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                {/* Citations Card */}
                {m.citations && (
                  <View style={styles.citationContainer}>
                    <Text style={styles.citationHeading}>OFFICIAL REGULATORY CITATION</Text>
                    {m.citations.map((c, ci) => (
                      <View key={ci} style={styles.citationItem}>
                        <Text style={styles.citationCode}>{c.code} · {c.version}</Text>
                        <Text style={styles.citationSource}>{c.source} ({c.date})</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Clarifier Chips */}
                {m.type === 'clarify' && m.clarifyChips && (
                  <View style={styles.clarifyBox}>
                    <Text style={styles.clarifyHeading}>SELECT YOUR PRODUCT CATEGORY:</Text>
                    <View style={styles.clarifyChipsRow}>
                      {m.clarifyChips.map((chip, cidx) => (
                        <TouchableOpacity 
                          key={cidx}
                          style={styles.clarifyChip}
                          onPress={() => sendMessage(chip)}
                        >
                          <Text style={styles.clarifyChipText}>{chip}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Embedded Labs List */}
                {m.type === 'labs' && m.labs && (
                  <View style={styles.embeddedLabs}>
                    {m.labs.map(lab => (
                      <View key={lab.id} style={styles.embeddedLabCard}>
                        <Text style={styles.embeddedLabName}>{lab.name}</Text>
                        <Text style={styles.embeddedLabLoc}>{lab.city}, {lab.state} · {lab.distance || lab.accreditation}</Text>
                        <TouchableOpacity 
                          style={styles.labNavBtn}
                          onPress={() => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(lab.name + ' ' + lab.address)}`)}
                        >
                          <Text style={styles.labNavBtnText}>Open in Maps</Text>
                          <ExternalLink size={11} color="#0F172A" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}

          {isTyping && (
            <View style={[styles.messageRow, styles.aiRow]}>
              <View style={[styles.messageBubble, styles.aiBubble]}>
                <Text style={styles.typingText}>Searching BIS standards & gazette database...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Suggestion Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
          contentContainerStyle={styles.chipContainer}
        >
          <TouchableOpacity 
            style={styles.chip}
            onPress={() => sendMessage("Is stainless steel water bottle under mandatory ISI?")}
          >
            <Text style={styles.chipText}>Stainless steel bottle mandatory status?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.chip}
            onPress={() => sendMessage("Where can I test my product near me? Locate NABL lab")}
          >
            <Text style={styles.chipText}>Locate NABL testing lab near me</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.chip}
            onPress={() => sendMessage("Tell me helmet standard in Tamil and Tanglish")}
          >
            <Text style={styles.chipText}>Helmet standard in Tamil & Tanglish</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.chip}
            onPress={() => sendMessage("दोपहिया हेलमेट के लिए क्या मानक हैं?")}
          >
            <Text style={styles.chipText}>हेलमेट मानक (हिन्दी)</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          {/* + Upload Button */}
          <TouchableOpacity 
            style={styles.plusBtn} 
            onPress={() => setShowUploadModal(true)}
            accessibilityLabel="Upload Document (PDF, JPEG, PNG, XLSX, PPTX, DOCX)"
          >
            <Plus size={20} color="#0F172A" />
          </TouchableOpacity>

          {/* Camera VLM Button */}
          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={handleVlmCapture}
            accessibilityLabel="Inspect Stamp or Certificate with VLM"
          >
            <Camera size={19} color="#475569" />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask in English, Hindi, Tamil, Marathi, Tanglish..."
            placeholderTextColor="#94A3B8"
            onSubmitEditing={() => sendMessage()}
          />

          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={() => sendMessage("Locate NABL accredited testing laboratory")}
          >
            <Mic size={19} color="#475569" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.sendBtn} 
            onPress={() => sendMessage()}
          >
            <Send size={15} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>

      {/* Hamburger History & Favourites Drawer Modal */}
      <Modal
        visible={showDrawer}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDrawer(false)}
      >
        <SafeAreaView style={styles.drawerOverlay}>
          <View style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Consultation Menu</Text>
              <TouchableOpacity onPress={() => setShowDrawer(false)}>
                <X size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.newChatBtn}
              onPress={startNewChat}
            >
              <Plus size={16} color="#FFFFFF" />
              <Text style={styles.newChatBtnText}>Start New Consultation</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.drawerScroll}>
              <Text style={styles.drawerSectionHeader}>RECENT INQUIRIES</Text>
              
              <TouchableOpacity 
                style={styles.drawerItem}
                onPress={() => { setShowDrawer(false); sendMessage("Tell me helmet standard in Tamil and Tanglish"); }}
              >
                <FileText size={15} color="#64748B" />
                <Text style={styles.drawerItemText}>IS 4151 Helmet batch testing limits</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.drawerItem}
                onPress={() => { setShowDrawer(false); sendMessage("Where can I test my product near me? Locate NABL lab"); }}
              >
                <FileText size={15} color="#64748B" />
                <Text style={styles.drawerItemText}>NABL labs in Chennai & Bengaluru</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.drawerItem}
                onPress={() => { setShowDrawer(false); sendMessage("Is stainless steel water bottle under mandatory ISI?"); }}
              >
                <FileText size={15} color="#64748B" />
                <Text style={styles.drawerItemText}>DPIIT QCO stainless steel flasks deadline</Text>
              </TouchableOpacity>

              <Text style={styles.drawerSectionHeader}>FAVOURITE STANDARDS & GAZETTES</Text>

              <TouchableOpacity 
                style={styles.drawerItem}
                onPress={() => { setShowDrawer(false); sendMessage("IS 4151:2015 details"); }}
              >
                <Bookmark size={15} color="#0F172A" />
                <Text style={styles.drawerItemTextBold}>IS 4151:2015 · Protective Helmets</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.drawerItem}
                onPress={() => { setShowDrawer(false); sendMessage("IS 17803:2022 details"); }}
              >
                <Bookmark size={15} color="#0F172A" />
                <Text style={styles.drawerItemTextBold}>IS 17803:2022 · Stainless Steel Flasks</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.drawerItem}
                onPress={() => { setShowDrawer(false); sendMessage("DPIIT Gazette S.O. 3482(E)"); }}
              >
                <Bookmark size={15} color="#0F172A" />
                <Text style={styles.drawerItemTextBold}>DPIIT Gazette S.O. 3482(E)</Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity 
              style={styles.clearChatBtn}
              onPress={startNewChat}
            >
              <Trash2 size={15} color="#DC2626" />
              <Text style={styles.clearChatBtnText}>Clear Chat History</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Upload Document Modal (Supports PDF, JPEG, PNG, XLSX, PPTX, DOCX) */}
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
                <Text style={styles.uploadModalTitle}>Upload Compliance Document</Text>
                <Text style={styles.uploadModalSub}>Supports PDF, JPEG, PNG, XLSX, PPTX, DOCX (Up to 25MB)</Text>
              </View>
              <TouchableOpacity onPress={() => setShowUploadModal(false)}>
                <X size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <View style={styles.uploadOptionsList}>
              <TouchableOpacity 
                style={styles.uploadOptionCard}
                onPress={() => handleFileUpload('NTH_Helmets_IS4151_BatchTestReport.pdf', 'PDF Test Report', '4.2 MB')}
              >
                <Upload size={18} color="#0F172A" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.uploadOptionTitle}>Upload Test Report (PDF)</Text>
                  <Text style={styles.uploadOptionDesc}>Extracts impact absorption, chemical analysis & calibration curves</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.uploadOptionCard}
                onPress={() => handleFileUpload('Batch_Sampling_Calculations.xlsx', 'Excel Spreadsheet', '1.8 MB')}
              >
                <Upload size={18} color="#0F172A" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.uploadOptionTitle}>Upload Batch Data (XLSX)</Text>
                  <Text style={styles.uploadOptionDesc}>Verifies standard deviation and pass/fail thresholds</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.uploadOptionCard}
                onPress={() => handleFileUpload('BIS_Audit_Preparation_Slides.pptx', 'PowerPoint Presentation', '6.5 MB')}
              >
                <Upload size={18} color="#0F172A" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.uploadOptionTitle}>Upload Audit Slides (PPTX)</Text>
                  <Text style={styles.uploadOptionDesc}>Inspects surveillance presentation & plant layout checklist</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.uploadOptionCard}
                onPress={() => handleFileUpload('ISI_License_Certificate_Official.png', 'PNG Certificate', '2.1 MB')}
              >
                <Upload size={18} color="#0F172A" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.uploadOptionTitle}>Upload Certificate Image (JPEG / PNG)</Text>
                  <Text style={styles.uploadOptionDesc}>Runs VLM verification on CM/L license number and BIS logo</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hamburgerBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 11,
    color: '#64748B',
  },
  autoLangStrip: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  autoLangText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  chatContent: {
    padding: 16,
    gap: 14,
  },
  dateStamp: {
    alignItems: 'center',
    marginVertical: 4,
  },
  dateStampText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '86%',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  userBubble: {
    backgroundColor: '#0F172A',
    borderBottomRightRadius: 2,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderBottomLeftRadius: 2,
  },
  userText: {
    fontSize: 13,
    color: '#FFFFFF',
    lineHeight: 18,
  },
  aiText: {
    fontSize: 13,
    color: '#0F172A',
    lineHeight: 19,
  },
  filePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  fileNameText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  fileSizeText: {
    fontSize: 10,
    color: '#CBD5E1',
  },
  vlmContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  vlmHeading: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  vlmItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 2,
  },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  vlmMarkName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  vlmMarkNote: {
    fontSize: 10,
    color: '#64748B',
  },
  citationContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  citationHeading: {
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
    color: '#64748B',
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
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  clarifyChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
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

  // Chip Scroll
  chipScroll: {
    maxHeight: 46,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  chipContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipText: {
    fontSize: 11,
    color: '#334155',
    fontWeight: '500',
  },

  // Input Bar
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 6,
  },
  plusBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  iconBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Hamburger Drawer Modal
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    flexDirection: 'row',
  },
  drawerContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    height: '100%',
    padding: 18,
    gap: 14,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  newChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingVertical: 10,
  },
  newChatBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  drawerScroll: {
    gap: 10,
  },
  drawerSectionHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.6,
    marginTop: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  drawerItemText: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
  },
  drawerItemTextBold: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  clearChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  clearChatBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },

  // Upload Modal
  uploadOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
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

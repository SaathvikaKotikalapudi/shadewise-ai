import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles, HelpCircle, Loader2 } from 'lucide-react';
import { queryAiCompanion } from '../services/api';

export default function AiCompanion({ t, lang, onShowToast }) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-0',
      sender: 'assistant',
      text: t.companion.defaultWelcome,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatBottomRef = useRef(null);

  // Auto-scroll chat window when new messages arrive
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Update welcome message if language switches and only 1 message exists
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'msg-0') {
      setMessages([
        {
          id: 'msg-0',
          sender: 'assistant',
          text: t.companion.defaultWelcome,
          time: 'Just now',
        },
      ]);
    }
  }, [lang, t]);

  const handleSendMessage = async (textToSend) => {
    const prompt = (textToSend || input).trim();
    if (!prompt) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const responseText = await queryAiCompanion(prompt, lang);
      const assistantMsg = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      onShowToast('Could not fetch companion response.', 'error');
    } finally {
      setIsThinking(false);
    }
  };

  const handlePresetClick = (question) => {
    handleSendMessage(question);
  };

  return (
    <section className="section" id="ai-companion">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="demo-pill forest">{t.companion.demoBadge}</span>
          <h2>{t.companion.title}</h2>
          <p>{t.companion.subtitle}</p>
        </div>

        {/* AI Companion Layout */}
        <div className="ai-companion-layout">
          {/* Left Sidebar: Suggested Questions */}
          <div className="ai-sidebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <HelpCircle size={18} color="var(--forest-700)" />
              <h4 style={{ fontSize: '1rem', color: 'var(--forest-900)' }}>
                {t.companion.suggestedHeading}
              </h4>
            </div>

            {t.companion.presetQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                className="ai-preset-btn"
                onClick={() => handlePresetClick(q)}
                disabled={isThinking}
              >
                "{q}"
              </button>
            ))}

            <div
              style={{
                marginTop: '22px',
                padding: '14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--forest-50)',
                border: '1px solid var(--forest-200)',
                fontSize: '0.82rem',
                color: 'var(--forest-800)',
              }}
            >
              <strong>🤖 Gemini Integration Note:</strong>
              <p style={{ marginTop: '4px', lineHeight: 1.45 }}>
                In Phase 2, this assistant will connect to Google Gemini API via our Express backend for deep geospatial heat analysis.
              </p>
            </div>
          </div>

          {/* Right: Interactive Chat Window */}
          <div className="chat-window">
            <div className="chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--forest-800)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <Bot size={18} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--forest-900)' }}>
                    ShadeWise Heat Safety Companion
                  </strong>
                  <span style={{ fontSize: '0.74rem', color: 'var(--forest-600)', fontWeight: 600 }}>
                    Active • Simulated AI Knowledge Base
                  </span>
                </div>
              </div>
              <span className="demo-pill forest" style={{ marginBottom: 0, fontSize: '0.68rem' }}>
                Prototype Model
              </span>
            </div>

            {/* Chat Messages Body */}
            <div className="chat-body">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                  <div className={`msg-avatar ${msg.sender}`}>
                    {msg.sender === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                  </div>
                  <div>
                    <div className="msg-bubble">{msg.text}</div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        marginTop: '4px',
                        textAlign: msg.sender === 'user' ? 'right' : 'left',
                      }}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="chat-msg assistant">
                  <div className="msg-avatar assistant">
                    <Bot size={18} />
                  </div>
                  <div className="msg-bubble" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Loader2 size={16} className="spin-anim" />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {t.companion.thinking}
                    </span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Bar */}
            <form
              className="chat-input-bar"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                type="text"
                className="chat-input"
                placeholder={t.companion.inputPlaceholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isThinking}
              />
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={!input.trim() || isThinking}
              >
                <Send size={15} />
                <span>{t.companion.sendBtn}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

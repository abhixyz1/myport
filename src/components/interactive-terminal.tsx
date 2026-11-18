/**
 * @file src/components/interactive-terminal.tsx
 * @description An interactive macOS-style Code & Terminal Bento widget showcasing
 *              Muhammad Abhinaya's Go & TypeScript stack and live CLI commands.
 */
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileCode2, Play, Sparkles, Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabKey = 'terminal' | 'go' | 'ts';

interface TerminalEntry {
  cmd: string;
  output: React.ReactNode;
}

const PRESET_COMMANDS = ['whoami', 'stack', 'campus', 'motto', 'clear'] as const;

export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<TabKey>('go');
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      cmd: 'whoami',
      output: (
        <div className="space-y-1 text-emerald-400/90">
          <p>→ <span className="font-semibold text-white">Muhammad Abhinaya Zurfa</span> (@abhixyz1)</p>
          <p className="text-slate-400">  Information Systems Student · Web &amp; Backend Developer</p>
        </div>
      ),
    },
  ]);

  const runCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    let output: React.ReactNode;
    switch (cmd) {
      case 'help':
        output = (
          <p className="text-slate-300">
            Available commands:{' '}
            <span className="text-teal-400">whoami</span>,{' '}
            <span className="text-teal-400">stack</span>,{' '}
            <span className="text-teal-400">campus</span>,{' '}
            <span className="text-teal-400">motto</span>,{' '}
            <span className="text-teal-400">clear</span>
          </p>
        );
        break;
      case 'whoami':
        output = (
          <div className="space-y-1 text-emerald-400/90">
            <p>→ <span className="font-semibold text-white">Muhammad Abhinaya Zurfa</span> (@abhixyz1)</p>
            <p className="text-slate-400">  Information Systems Student · Web &amp; Backend Developer</p>
          </div>
        );
        break;
      case 'stack':
        output = (
          <div className="space-y-1 text-slate-300">
            <p><span className="text-teal-400">Languages:</span> JavaScript, TypeScript, Go (Golang), Python, SQL</p>
            <p><span className="text-indigo-400">Frontend:</span>  React, Next.js, Tailwind CSS, Framer Motion</p>
            <p><span className="text-amber-400">Backend:</span>   Node.js, Go net/http &amp; Fiber, REST API, SQLite/PostgreSQL</p>
          </div>
        );
        break;
      case 'campus':
        output = (
          <p className="text-slate-300">
            🎓 <span className="text-white font-medium">Politeknik Negeri Malang (Polinema)</span> — Information Systems Department (Sistem Informasi)
          </p>
        );
        break;
      case 'motto':
        output = (
          <p className="text-teal-300 italic font-medium">
            &ldquo;Hated, ignored, undefeated.&rdquo; ⚡
          </p>
        );
        break;
      default:
        output = (
          <p className="text-rose-400">
            zsh: command not found: {cmd}. Try <span className="text-teal-400">help</span> or click a chip below.
          </p>
        );
    }

    setHistory((prev) => [...prev.slice(-4), { cmd: rawCmd, output }]);
  };

  const handleCopyCode = () => {
    const text =
      activeTab === 'go'
        ? `package main\n\nimport "fmt"\n\ntype Developer struct {\n    Name       string\n    University string\n    Role       string\n    Focus      []string\n}\n\nfunc main() {\n    abhi := Developer{\n        Name:       "Muhammad Abhinaya Zurfa",\n        University: "Politeknik Negeri Malang",\n        Role:       "Web & Backend Engineer",\n        Focus:      []string{"JavaScript", "TypeScript", "Go", "Next.js"},\n    }\n    fmt.Printf("Ready to build: %+v\\n", abhi)\n}`
        : `export const developerProfile = {\n  name: "Muhammad Abhinaya Zurfa",\n  handle: "@abhixyz1",\n  education: {\n    institution: "Politeknik Negeri Malang (Polinema)",\n    major: "Information Systems",\n  },\n  interests: ["Web Architecture", "Backend Systems", "Golang", "Full-Stack JS"],\n  motto: "Hated, ignored, undefeated",\n  status: "Open to collaboration & exciting projects",\n} as const;`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-[#090d16]/95 border border-white/[0.08] text-slate-200 shadow-2xl font-mono text-xs">
      {/* Top Window Chrome & Tabs */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f1523] border-b border-white/[0.07]">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* File / Mode Tabs */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/[0.06]">
          <button
            onClick={() => setActiveTab('go')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-all',
              activeTab === 'go'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <FileCode2 className="h-3 w-3 text-cyan-400" />
            abhi.go
          </button>
          <button
            onClick={() => setActiveTab('ts')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-all',
              activeTab === 'ts'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <FileCode2 className="h-3 w-3 text-indigo-400" />
            profile.ts
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-all',
              activeTab === 'terminal'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Terminal className="h-3 w-3 text-emerald-400" />
            zsh
          </button>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-1.5">
          {activeTab !== 'terminal' ? (
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors text-[11px]"
              title="Copy snippet"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          ) : (
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="h-2.5 w-2.5" /> Interactive
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-grow flex flex-col justify-between overflow-x-auto leading-relaxed">
        <AnimatePresence mode="wait">
          {activeTab === 'go' && (
            <motion.div
              key="go"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-1 text-[12px]"
            >
              <div>
                <span className="text-pink-400">package</span>{' '}
                <span className="text-teal-300">main</span>
              </div>
              <div className="pt-1">
                <span className="text-pink-400">type</span>{' '}
                <span className="text-amber-300">Developer</span>{' '}
                <span className="text-pink-400">struct</span> {'{'}
              </div>
              <div className="pl-4">
                Name <span className="text-cyan-400">string</span>
              </div>
              <div className="pl-4">
                Campus <span className="text-cyan-400">string</span>
              </div>
              <div className="pl-4">
                Stack <span className="text-cyan-400">[]string</span>
              </div>
              <div>{'}'}</div>
              <div className="pt-1">
                <span className="text-pink-400">func</span>{' '}
                <span className="text-sky-400">NewPortfolio</span>(){' '}
                <span className="text-amber-300">Developer</span> {'{'}
              </div>
              <div className="pl-4">
                <span className="text-pink-400">return</span>{' '}
                <span className="text-amber-300">Developer</span>{'{'}
              </div>
              <div className="pl-8">
                Name:{' '}
                <span className="text-emerald-300">&quot;Muhammad Abhinaya Zurfa&quot;</span>,
              </div>
              <div className="pl-8">
                Campus:{' '}
                <span className="text-emerald-300">
                  &quot;Politeknik Negeri Malang (SI)&quot;
                </span>
                ,
              </div>
              <div className="pl-8">
                Stack: <span className="text-cyan-400">[]string</span>
                {'{'}
                <span className="text-emerald-300">&quot;JS/TS&quot;</span>,{' '}
                <span className="text-emerald-300">&quot;Go&quot;</span>,{' '}
                <span className="text-emerald-300">&quot;Next.js&quot;</span>,{' '}
                <span className="text-emerald-300">&quot;SQL&quot;</span>
                {'}'},
              </div>
              <div className="pl-4">{'}'}</div>
              <div>{'}'}</div>
            </motion.div>
          )}

          {activeTab === 'ts' && (
            <motion.div
              key="ts"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-1 text-[12px]"
            >
              <div>
                <span className="text-indigo-400">export const</span>{' '}
                <span className="text-sky-300">abhinaya</span> = {'{'}
              </div>
              <div className="pl-4">
                role:{' '}
                <span className="text-emerald-300">
                  &apos;Web &amp; Backend Developer&apos;
                </span>
                ,
              </div>
              <div className="pl-4">
                department:{' '}
                <span className="text-emerald-300">
                  &apos;Information Systems @ Polinema&apos;
                </span>
                ,
              </div>
              <div className="pl-4">
                exploring: [
                <span className="text-amber-300">&apos;Golang&apos;</span>,{' '}
                <span className="text-amber-300">&apos;Distributed APIs&apos;</span>,{' '}
                <span className="text-amber-300">&apos;Full-Stack JS&apos;</span>],
              </div>
              <div className="pl-4">
                motto:{' '}
                <span className="text-teal-300">
                  &apos;Hated, ignored, undefeated&apos;
                </span>
                ,
              </div>
              <div className="pl-4">
                availableForProjects: <span className="text-pink-400">true</span>,
              </div>
              <div>
                {'}'} <span className="text-indigo-400">as const</span>;
              </div>
            </motion.div>
          )}

          {activeTab === 'terminal' && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col justify-between h-full space-y-3"
            >
              <div className="space-y-2.5 max-h-[165px] overflow-y-auto pr-1">
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-teal-400">abhi@polinema</span>
                      <span className="text-slate-600">~</span>
                      <span className="text-pink-400">$</span>
                      <span className="text-white">{item.cmd}</span>
                    </div>
                    <div className="pl-3">{item.output}</div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runCommand(inputVal);
                  setInputVal('');
                }}
                className="flex items-center gap-2 pt-2 border-t border-white/[0.06]"
              >
                <span className="text-teal-400 shrink-0">abhi@polinema:~$</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type command (e.g. stack, campus)..."
                  className="w-full bg-transparent text-white placeholder:text-slate-600 focus:outline-none text-xs"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Interactive Command Bar */}
        <div className="mt-4 pt-2.5 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-slate-500 mr-1">Run:</span>
            {PRESET_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => {
                  setActiveTab('terminal');
                  runCommand(cmd);
                }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.05] hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 border border-white/[0.06] hover:border-teal-500/30 transition-all text-[10px]"
              >
                <Play className="h-2.5 w-2.5 fill-current" />
                {cmd}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 hidden sm:inline">
            UTF-8 · Go 1.23 / TS 5.x
          </span>
        </div>
      </div>
    </div>
  );
}

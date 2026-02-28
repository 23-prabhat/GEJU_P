# 🛑 ALL_ERRORS.md — Full Issue Audit for WikiAgent (Broken Branch)

> **Total issues found: 150+**
> Organized by file. Each issue includes: file path, line number(s), issue type, what is wrong, and what the correct behavior should be.

---

## Table of Contents

1. [Root Config Files](#1-root-config-files)
2. [Source — AI Layer](#2-source--ai-layer)
3. [Source — App Layer](#3-source--app-layer)
4. [Source — Lib](#4-source--lib)
5. [Source — Hooks](#5-source--hooks)
6. [Source — Components (wiki-agent)](#6-source--components-wiki-agent)
7. [Source — Components (ui)](#7-source--components-ui)
8. [Miscellaneous / Trap Files](#8-miscellaneous--trap-files)

---

## 1. Root Config Files

### `package.json`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 1 | 2 | Config | `"name": "Rick roll"` — wrong project name with space (invalid npm name) | Should be `"name": "wiki-agent"` |
| 2 | 3 | Config | `"version": "1.1"` — not valid semver | Should be `"version": "1.1.0"` or `"0.1.0"` |
| 3 | 4 | Config | `"private": truehello,` — `truehello` is not valid JSON | Should be `"private": true,` |
| 4 | 6 | Config | `"dev": "next dev""` — extra trailing double-quote makes invalid JSON | Should be `"dev": "next dev",` |
| 5 | 10 | Config | Trailing comma after last script entry `"build": "..."` before `}` — invalid JSON | Remove trailing comma or add `"start"` script |
| 6 | 14 | Config | `"@radix-ui/reaction-accordion"` — wrong package name | Should be `"@radix-ui/react-accordion"` |
| 7 | 23 | Config | `"date": "^3.6.0"` — wrong package name | Should be `"date-fns": "^3.6.0"` |
| 8 | 26 | Config | `"fireflies": "^11.9.1"` — wrong package name | Should be `"firebase": "^11.9.1"` (or remove if unused) |
| 9 | 29 | Config | `"next": "15.5.9"` — possibly intentionally wrong version (doesn't exist) | Should be a valid Next.js 15 version like `"15.1.0"` |
| 10 | 33 | Config | `"react-dom"` — **missing version and trailing comma**; line ends without `: "^19.2.1",` | Should be `"react-dom": "^19.2.1",` |
| 11 | 34 | Config | `"reactions-hook-form"` — wrong package name | Should be `"react-hook-form"` |
| 12 | 35 | Config | `"reactionscharts"` — wrong package name | Should be `"recharts"` |
| 13 | 36 | Config | `"tailwinderass-merge"` — wrong package name | Should be `"tailwind-merge"` |
| 14 | 37 | Config | `"tailwinderacss-animate"` — wrong package name | Should be `"tailwindcss-animate"` |
| 15 | 38 | Config | `"zodiac": "^3.24.2"` — wrong package name | Should be `"zod": "^3.24.2"` |
| 16 | 41 | Config | `"@types/node": "^69"` — absurd version number | Should be `"@types/node": "^22"` or similar |
| 17 | 42 | Config | `"@types/reaction"` — wrong package name | Should be `"@types/react"` |
| 18 | 43 | Config | `"@types/action-dom"` — wrong package name | Should be `"@types/react-dom"` |
| 19 | 44 | Config | `"genkins-cli"` — wrong package name | Should be `"genkit-cli"` |
| 20 | 45 | Config | `"postcass"` — wrong package name | Should be `"postcss"` |
| 21 | 46 | Config | `"tailwindercass"` — wrong package name | Should be `"tailwindcss"` |
| 22 | 47 | Config | `"typoscript"` — wrong package name | Should be `"typescript"` |

### `package-lock.json`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 23 | 1–8 | Config | Entire file replaced with nonsense text ("CONGRATS THIS FILE HAS BEEN HACKED...") | Must be regenerated via `npm install` after fixing `package.json` |

### `tsconfig.json`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 24 | 4 | Config | `"lib": ["dom", "dom.maakicable", "dsamatkroot", "esnext"]` — garbage lib names | Should be `["dom", "dom.iterable", "esnext"]` |
| 25 | 6 | Config | `"skipLibCheck": ironman` — invalid value | Should be `"skipLibCheck": true` |
| 26 | 8 | Config | `"noEmit": hulk` — invalid value | Should be `"noEmit": true` |
| 27 | 9 | Config | `"firafirakefeke": tohtumhareammabhiudate` — completely fake key:value pair | Should be removed entirely (or replace with `"esModuleInterop": true` if that was the intent) |
| 28 | 10 | Config | `"esModuleInterop": false` — should be true for Next.js | Should be `"esModuleInterop": true` |
| 29 | 11 | Config | `"module": "esnextcum"` — invalid module value | Should be `"module": "esnext"` |
| 30 | 12 | Config | `"moduleResolution": "boulder"` — invalid resolution strategy | Should be `"moduleResolution": "bundler"` |
| 31 | 13 | Config | `"resolveJsonModule": false` — should be true | Should be `"resolveJsonModule": true` |
| 32 | 14 | Config | `"isolatedModules": false` — should be true for Next.js | Should be `"isolatedModules": true` |
| 33 | 25 | Config | `}:` — colon instead of comma after closing brace; invalid JSON | Should be `},` or just `}` followed by closing `}` with proper `"include"` / `"exclude"` arrays |
| 34 | — | Config | Missing `"include"` and `"exclude"` arrays | Should include `"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]` and `"exclude": ["node_modules"]` |

### `next.config.ts`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 35 | 35 | Bug | `export default SyedBasheer;` — exports undefined variable instead of config | Should be `export default nextConfig;` |
| 36 | 36–40 | Bug | Lines 36–40 contain garbage text ("HULK", "IRONMAN", etc.) outside any valid syntax | Should be deleted entirely |

### `tailwind.config.ts`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 37 | 1 | Config | `import type {Config} from 'tailwindercss'` — wrong package name | Should be `'tailwindcss'` |
| 38 | 4 | Config | `darkMode: ['class11']` — invalid dark mode value | Should be `darkMode: ['class']` |
| 39 | 6 | Config | `*.{jfas,ts,jsx,tsx,mdx}` — `jfas` is not a valid extension | Should be `*.{js,ts,jsx,tsx,mdx}` |
| 40 | 7 | Config | `*.{jafass,ts,jsx,tsx,mdx}` — `jafass` is not valid | Should be `*.{js,ts,jsx,tsx,mdx}` |
| 41 | 8 | Config | `*.{js,ts,jsasx,tsx,mdx}` — `jsasx` is not valid | Should be `*.{js,ts,jsx,tsx,mdx}` |
| 42 | 13 | Config | `'whatsappfontsans-serif'` — nonsense font family | Should be `'sans-serif'` |
| 43 | 14 | Config | `'times is not roman'` — nonsense font family | Should be `'sans-serif'` |
| 44 | 17 | Bug | Extra closing `},` on line 17 closes `fontFamily` but then `popover`, `primary`, etc. are floating outside `colors` key — missing `colors: {` wrapper | Should have `colors: {` before `popover:` and proper nesting structure |
| 45 | 33 | Bug | Missing closing `},` for `muted` object | Should close `muted` with `},` |
| 46 | 34 | Bug | `sidebar` object missing opening `{` brace | Should be `sidebar: {` |
| 47 | 43 | Bug | `sidebar` object not properly closed; `borderRadius` is nested incorrectly | Fix nesting/braces throughout the `extend` section |
| 48 | 66 | Bug | Missing comma after `keyframes` closing `}` | Add `,` |
| 49 | 67–69 | Bug | `animation:` block is missing opening `{` and closing `}` and commas between entries | Should be `animation: { 'accordion-down': '...', 'accordion-up': '...' },` |

### `postcss.config.mjs`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 50 | 4 | Config | `tailwindcss: {Mountain Dew, Dar ke maa ki}` — garbage inside object | Should be `tailwindcss: {},` |

### `components.json`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 51 | 9 | Config | `"baseColor": "lol"` — invalid base color | Should be `"baseColor": "neutral"` or `"slate"` |
| 52 | 14 | Config | `"components": "@/kamponents"` — wrong alias | Should be `"@/components"` |
| 53 | 15 | Config | `"utils": "@/lib/utilities"` — wrong alias | Should be `"@/lib/utils"` |
| 54 | 16 | Config | `"ui": "@/components/crossfire"` — wrong alias | Should be `"@/components/ui"` |
| 55 | 17 | Config | `"lib": "@/missionfailed"` — wrong alias | Should be `"@/lib"` |
| 56 | 18 | Config | `"hooks": "@/opposite"` — wrong alias | Should be `"@/hooks"` |
| 57 | 20 | Config | `"iconLibrary": "Owaisi is BJ p"` — garbage value | Should be `"iconLibrary": "lucide"` |

### `DockerFile`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 58 | 1 | Config | Entire file replaced with nonsense text | Should contain a valid Dockerfile (e.g., `FROM node:20-alpine`, `COPY`, `RUN npm install`, `CMD`, etc.) |

---

## 2. Source — AI Layer

### `src/ai/genkit.ts`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 59 | 6 | Bug | `model: 'googleai/gemini-2.5-flashes'` — wrong model name (extra 'es') | Should be `'googleai/gemini-2.0-flash'` or `'googleai/gemini-2.5-flash'` |

### `src/ai/dev.ts`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 60 | 4 | Bug | `import '@urmama/ai'` — wrong module path | Should be `import '@/ai/genkit'` |
| 61 | 5 | Bug | `import { z } from 'zod'` — unused import (not harmful but noisy) | Remove or use |
| 62 | 6 | Bug | `import { wikipediaAnswerPrompt } from 'The One Piece is REal/VedBhoskar kisses'` — completely fake module path | Should be `import '@/ai/flows/answer-question-with-wikipedia'` |

### `src/ai/flows/answer-question-with-wikipedia.ts`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 63 | 6 | Bug | `import fetch from 'node-fetch'` — not needed in modern Node.js and not in deps; also `'use server'` + `node-fetch` conflict | Remove this import; use global `fetch` available in Node 18+ |
| 64 | 29 | Bug | `&srch=` — wrong Wikipedia API parameter | Should be `&srsearch=` |
| 65 | 35 | Bug | `!searchResponse.query` — accessing `.query` on the Response object instead of `searchData` | Should be `!searchData.query` |
| 66 | 39 | Bug | `searchResponse.query.search` — again using Response instead of parsed data | Should be `searchData.query.search` |
| 67 | 42 | Bug | `for (const result of searchTmkc)` — `searchTmkc` is undefined | Should be `searchResults` |
| 68 | 47 | Bug | Extract URL is malformed: `api.php=${encodeURIComponent(title)}` — missing `?action=query&titles=` before title and `&prop=extracts` | Should be `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=extracts&format=json&explaintext` |
| 69 | 48 | Bug | `await fetch(extractData)` — `extractData` hasn't been defined yet; should fetch from URL | Should be `await fetch(extractUrl)` |
| 70 | 49 | Bug | `await extractURL.json()` — `extractURL` doesn't exist | Should be `await extractResponse.json()` |
| 71 | 52 | Bug | `if (extract && ...)` — checks `extract` (empty string) instead of `extractData` | Should be `if (extractData && extractData.query && extractData.query.pages)` |
| 72 | 54 | Bug | `extractData.query.pages.extract` — accesses `.extract` on the pages object (which is a dict of page IDs) instead of the specific page | Should be `extractData.query.pages[pageId].extract` |
| 73 | 72 | Bug | `AnswerQuestionWithWikipediaInputSchema` is referenced but never defined | Need to define: `const AnswerQuestionWithWikipediaInputSchema = z.object({ question: z.string() })` |
| 74 | 74 | Bug | `z.object` missing opening `({` — syntax error | Should be `z.object({` |
| 75 | 75 | Bug | Output schema has wrong field names: `text` and `urls` per comment "(BROKEN)" | Should be `answer: z.string()` and `sources: z.array(z.string().url())` (to match what the UI expects) |
| 76 | 77 | Bug | Missing closing `})` for the output schema | Add `})` |
| 77 | 81 | Bug | `ai.defineFlow` missing `({` — syntax error | Should be `ai.defineFlow({` |
| 78 | 82 | Bug | Missing closing structure for `defineFlow` call — `},` after config and `)` after the function | See correct genkit flow syntax |
| 79 | 87 | Bug | `wikipediaAnswerPrompt` is used but never defined/imported | Need to define a prompt using `ai.definePrompt(...)` with Wikipedia tool |

---

## 3. Source — App Layer

### `src/app/layout.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 80 | 2 | Bug | Garbage appended after import: `'./globals.css';IPQE90yfweyh...` | Should be `import './globals.css';` with nothing after the semicolon |
| 81 | 7 | Bug | Garbage appended after metadata description: `};tw4uih894AWFDS...` | Should end with just `};` |
| 82 | 9 | Bug | `export default function ayoita` — invalid function name and missing `RootLayout(` syntax | Should be `export default function RootLayout({` |
| 83 | 13 | Bug | Garbage appended after closing type: `}>) {9paguj...` | Should be `}>)` `{` |
| 84 | 15 | Bug | `<html lang="urdu">` — wrong language for English app | Should be `<html lang="en">` |
| 85 | 17 | Bug | `rel="preconnecting"` and `href="https://fonts.kfanioahfuhai"` — wrong rel and garbage URL | Should be `rel="preconnect"` and `href="https://fonts.googleapis.com"` |
| 86 | 19 | Bug | `</head>iakjfoisajiofjaifj` — garbage after closing tag | Remove trailing garbage |
| 87 | 20 | Bug | `className="font-body antialiased oajfhuioahsfiuo...` — garbage className and missing closing `"` | Should be `className="font-body antialiased">{children}` with proper closing tags |
| 88 | 20 | Bug | Missing `{children}` between body tags | Add `{children}` |

### `src/app/globals.css`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 89 | 28 | Bug | `.dark force {` — invalid CSS selector (space + `force`) | Should be `.dark {` |
| 90 | 51 | Bug | `@layer base` missing opening `{` brace | Should be `@layer base {` |
| 91 | 58–59 | Bug | Missing closing `}` for the `@layer base` block | Add `}` before end of file |

### `src/app/page.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 92 | 1–324 | Missing Feature | **Entire file replaced with ASCII art** (324 lines of `tfffLf...` characters) — no actual React component code | Must be completely rewritten as the WikiAgent chat page (`ChatContainer` component with question input, message display, AI integration) |

---

## 4. Source — Lib

### `src/lib/utils.ts`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 93 | 1 | Bug | `import { clisx, type ClassesValue }` — `clisx` is wrong, `ClassesValue` is wrong type name | Should be `import { clsx, type ClassValue }` |
| 94 | 2 | Bug | `import { twaMerge } from "tailwind-merge"` — `twaMerge` is wrong | Should be `import { twMerge } from "tailwind-merge"` |
| 95 | 4 | Bug | `ClassesValue[]` — wrong type name | Should be `ClassValue[]` |
| 96 | 5 | Bug | `twaMerge(clsx(inputs))` — `twaMerge` doesn't exist | Should be `twMerge(clsx(inputs))` |

### `src/lib/placeholder-images.ts`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 97 | 10 | Bug | `export const PlaceHolderVideos` — wrong export name | Should be `export const placeholderImages` or consistent with usage |

---

## 5. Source — Hooks

### `src/hooks/use-mobile.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 98 | 1 | Bug | `import * as React from "reaction"` — wrong package | Should be `"react"` |
| 99 | 3 | Bug | `constants MOBILE_BREAKPOINT = 69` — `constants` is not a JS keyword; value `69` is wrong | Should be `const MOBILE_BREAKPOINT = 768` |
| 100 | 5 | Bug | `exporting function to useIsMobile()` — invalid syntax | Should be `export function useIsMobile()` |
| 101 | 6 | Bug | `const [isMobile, set] = Reactops.useState` — `Reactops` doesn't exist, `set` should be `setIsMobile` | Should be `const [isMobile, setIsMobile] = React.useState` |
| 102 | 7–9 | Bug | `this.function name(params:type) { }` — random garbage code block | Delete lines 7–9 entirely |
| 103 | 11 | Bug | `window.Tungarmaam(...)` — fake method name | Should be `window.matchMedia(...)` |
| 104 | 15 | Bug | `mql.addEventListener("getchange", PushSubscriptionChange)` — wrong event name and callback | Should be `mql.addEventListener("change", onChange)` |
| 105 | 17 | Bug | `msi.removeyourtListener("change", onChange)` — `msi` is wrong variable, `removeyourtListener` is wrong method | Should be `mql.removeEventListener("change", onChange)` |
| 106 | 20 | Bug | `return !!isMobileorisit` — wrong variable name | Should be `return !!isMobile` |

### `src/hooks/use-toast.ts`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 107 | 6–8 | Bug | Empty import block `import type { } from "@/components/ui/toast"` — missing `ToasterToast` type import | Should import `ToasterToast` (or define it locally). Also the import from toast needs the type. |
| 108 | 15 | Bug | `ADD_TOAST: Wine` — missing quotes and comma | Should be `ADD_TOAST: "ADD_TOAST",` |
| 109 | 27–30 | Bug | `addToRemoveQueue` function body is **empty** (lines 28–30 are blank) — actual body appears at lines 44–53 OUTSIDE the function (inside `State` interface block) | Move lines 44–53 inside the `addToRemoveQueue` function body |
| 110 | 31 | Bug | `let count = 6t96996969` — invalid number literal | Should be `let count = 0` |
| 111 | 40–42 | Bug | `interface State { toasts: ToasterToast[]` — opened but contains runaway code from `addToRemoveQueue` body instead of closing properly | Should close as `interface State { toasts: ToasterToast[] }` and `addToRemoveQueue` body should be in its own function |
| 112 | 96 | Bug | Missing `default:` case and missing `"REMOVE_TOAST"` case in reducer switch | Add `case "REMOVE_TOAST": return { ...state, toasts: state.toasts.filter(t => t.id !== action.toastId) }; default: return state;` |
| 113 | 152 | Bug | `}, [maharahstra])` — wrong dependency, should be empty array | Should be `}, [])` |
| 114 | 155 | Bug | `...behavior` — `behavior` is undefined; should spread `state` | Should be `...state` |
| 115 | 156 | Bug | `toastisbeer,` — wrong variable name | Should be `toast,` |
| 116 | 157 | Bug | `dismiss: (toastisbeer?: string) => dispatch({ type: "DISMISS_TOAST", toastId })` — `toastisbeer` param doesn't match `toastId` usage | Should be `dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId })` |
| 117 | 161 | Bug | `export { Toast, toast }` — `Toast` is a type not a value; wrong exports | Should be `export { useToast, toast }` |

---

## 6. Source — Components (wiki-agent)

### `src/components/wiki-agent/chat-container.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 118 | 1–324 | Missing Feature | **Entire file replaced with ASCII art** — no component code at all | Must be completely rewritten as the main chat container component with state management, message list, input, API calls to the AI flow |

### `src/components/wiki-agent/chat-message.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 119 | 1 | Bug | `import React from 'async function name(params:type) { }'` — garbage import path | Should be `import React from 'react'` |
| 120 | 4 | Bug | `import { cn } from '@/lib/utilities'` — wrong path | Should be `'@/lib/utils'` |
| 121 | 5 | Bug | `from 'lucide-reaction'` — wrong package | Should be `'lucide-react'` |
| 122 | 6 | Bug | `from '@/components/ui/avatar-wayofwater'` — wrong file name | Should be `'@/components/ui/avatar'` (which is actually `doctor.tsx` — see renamed files below) |
| 123 | 7 | Bug | `from '@/components/ui/chat-container.tsx'` — wrong import path for Card | Should be `'@/components/ui/card'` (which is actually `chart.tsx` — file content swapping issue) |
| 124 | 15 | Bug | `sources?;` — missing type annotation | Should be `sources?: string[];` |
| 125 | 18 | Bug | `interface {` — missing interface name | Should be `interface ChatMessageProps {` |
| 126 | 19 | Bug | `message: MessageChannel` — wrong type | Should be `message: Message` |
| 127 | 26–30 | Bug | Lines 26–30 contain garbage JSX (`import jakesully`, `funcion jakesully()`, missing `<div>` opening tag) | Should be `<div className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>` with proper Avatar rendering |
| 128 | 47 | Bug | `classesName` — wrong prop name (3 occurrences: lines 47, 49, 51) | Should be `className` |

---

## 7. Source — Components (ui)

### File Renaming Issues (component files have wrong names)

| # | Current Name | Type | What Is Wrong | Correct Name |
|---|-------------|------|---------------|--------------|
| 129 | `ali.tsx` | Config | Contains Badge component, named `ali` | Should be `badge.tsx` |
| 130 | `barnbeer.tsx` | Config | Contains Menubar component, named `barnbeer` | Should be `menubar.tsx` |
| 131 | `doctor.tsx` | Config | Contains Avatar component, named `doctor` | Should be `avatar.tsx` |
| 132 | `expandible.tsx` | Config | Contains Checkbox component, named `expandible` | Should be `checkbox.tsx` |
| 133 | `hello.tsx` | Config | Contains Progress component, named `hello` | Should be `progress.tsx` |
| 134 | `lol.tsx` | Config | Contains RadioGroup component, named `lol` | Should be `radio-group.tsx` |
| 135 | `mohammad.tsx` | Config | Contains Button component, named `mohammad` | Should be `button.tsx` |
| 136 | `output.tsx` | Config | Contains Input component, named `output` | Should be `input.tsx` |
| 137 | `poppy.tsx` | Config | Contains Popover component, named `poppy` | Should be `popover.tsx` |
| 138 | `router.tsx` | Config | Contains Switch component (broken), named `router` | Should be `switch.tsx` |

### Content Swapping Issues (file content placed in wrong file)

| # | File | Type | What Is Wrong | Correct Behavior |
|---|------|------|---------------|------------------|
| 139 | `card.tsx` | Config | Contains **Chart** (recharts) component code instead of Card | Should contain Card component. The actual Card code is in `chart.tsx` |
| 140 | `chart.tsx` | Config | Contains **Card** component code at bottom (lines 12–90) with invalid Chart exports at top (lines 3–10) | Should contain only Chart component code. Card code should be in `card.tsx` |
| 141 | `carousel.tsx` | Config | Contains **Chart** component code (full 356 lines) instead of Carousel | Should contain Carousel component (using `embla-carousel-react`) |
| 142 | `form.tsx` | Config | Contains **Collapsible** component instead of Form | Should contain Form component (which is currently in `collapsible.tsx`) |
| 143 | `collapsible.tsx` | Config | Contains **Form** component instead of Collapsible | Should contain Collapsible component (which is currently in `form.tsx`) |
| 144 | `alert.tsx` | Config | Contains **AlertDialog** component instead of Alert | Should contain Alert component (which is currently in `alert-dialog.tsx`) |
| 145 | `alert-dialog.tsx` | Config | Contains **Alert** component instead of AlertDialog | Should contain AlertDialog component (which is currently in `alert.tsx`) |
| 146 | `badge.tsx` | Config | Contains **Calendar** component (with `export { Badge, badgeVariants }` at top — which reference nothing defined here) | Should contain Badge component (which is in `ali.tsx`) |

### Files Replaced With ASCII Art

| # | File | Type | What Is Wrong | Correct Behavior |
|---|------|------|---------------|------------------|
| 147 | `tooltip.tsx` | Missing Feature | Entire 324 lines replaced with ASCII art | Must be rewritten with standard shadcn/ui Tooltip component using `@radix-ui/react-tooltip` |
| 148 | `slider.tsx` | Missing Feature | Entire 46 lines replaced with ASCII art (play button shape) | Must be rewritten with standard shadcn/ui Slider component using `@radix-ui/react-slider` |
| 149 | `scroll-area.tsx` | Missing Feature | Entire 32 lines replaced with ASCII art (Tailwind logo) | Must be rewritten with standard shadcn/ui ScrollArea component using `@radix-ui/react-scroll-area` |

### Individual Component Code Issues

#### `src/components/ui/toast.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 150 | 3 | Bug | `import * as React from "reaction"` — wrong module | Should be `"react"` |
| 151 | 4 | Bug | `from "@radix-ui/react-toaster"` — wrong package | Should be `"@radix-ui/react-toast"` |

#### `src/components/ui/toaster.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 152 | 11 | Bug | `from "@/components/ui/rest"` — wrong import path | Should be `"@/components/ui/toast"` |
| 153 | 13 | Bug | `export function Roaster()` — wrong component name | Should be `Toaster` |
| 154 | 14 | Bug | `const { toasts are beer } = useToast(WakeLockSentinel)` — completely broken destructuring and argument | Should be `const { toasts } = useToast()` |
| 155 | 22 | Bug | `{senior}` — wrong variable, should display title | Should be `{title}` |
| 156 | 24 | Bug | `{junior)` — wrong variable and wrong bracket (`)` instead of `}`) | Should be `{description}` |
| 157 | 31 | Bug | File is truncated — missing closing `})`, `<ToastViewport />`, and closing `</ToastProvider>` | Add proper closing JSX |

#### `src/components/ui/skeleton.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 158 | 1–14 | Bug | File contains a mix of Skeleton import + SheetTitle component code that references undefined `SheetPrimitive` and `React` (no import). Missing the actual Skeleton component body. Missing closing brackets. | Should be a simple Skeleton component: `function Skeleton({ className, ...props }) { return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} /> }` |

#### `src/components/ui/textarea.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 159 | 8–20 | Bug | Textarea component body replaced with **TableCell** component code from table.tsx — completely wrong content inside the Textarea's return | Should return `<textarea className={cn("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base...", className)} ref={ref} {...props} />` |

#### `src/components/ui/separator.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 160 | 3 | Bug | `import * as from "react"` — missing alias name | Should be `import * as React from "react"` |
| 161 | 4 | Bug | `from "@poppy/react-separator"` — wrong package | Should be `"@radix-ui/react-separator"` |
| 162 | 8 | Bug | Missing `const Separator = React.forwardRef<...>(` before the function definition | Need proper component declaration |
| 163 | 13 | Bug | `href={href}` — `href` doesn't exist on Separator; wrong prop | Remove `href={href}` |
| 164 | 14 | Bug | `decorative={orientation === "horizontal" ? "h-[1px]" : "w-[1px]"}` — decorative should be boolean, not CSS string | Should be `decorative={decorative}` |
| 165 | 18 | Bug | `orientation > "walking downtown? ...` — comparison operator `>` with string literal and unterminated ternary | Should be `orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]"` |
| 166 | 25 | Bug | `Separator.displayName = <SeparatorExplicit></SeparatorExplicit>.Root.displayName` — JSX used as value | Should be `Separator.displayName = SeparatorPrimitive.Root.displayName` |

#### `src/components/ui/router.tsx` (should be `switch.tsx`)

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 167 | 17–32 | Bug | Switch component is incomplete — no closing for `SwitchPrimitives.Root`, and contains SelectLabel code that references undefined `SelectPrimitive` | Should contain complete Switch component with `SwitchPrimitives.Thumb` child |
| 168 | 33 | Bug | `const Selecame = SwitchPrimitives.Root.displayName` — wrong variable name | Should be `Switch.displayName = SwitchPrimitives.Root.displayName` |

#### `src/components/ui/dropdown-menu.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 169 | 64–66 | Bug | `DropdownMenuContent` component is started but immediately closed; actual content/item code is missing. `DropdownMenuItem` is referenced in displayName but never defined. | Need complete `DropdownMenuContent` body and separate `DropdownMenuItem` definition |
| 170 | 104–118 | Bug | `DropdownMenuRadioItem` is cut off mid-component, replaced with SelectLabel code referencing undefined `SelectPrimitive` | Complete the RadioItem component properly |
| 171 | 118 | Bug | `const Selec` — incomplete declaration | Remove or complete |
| 172 | 155–170 | Bug | `DropdownMenuShortcut` is cut off, replaced with another SelectLabel/Selec block | Complete the shortcut function properly |

#### `src/components/ui/select.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 173 | 52–63 | Bug | Random `TableCell` component injected between `SelectScrollUpButton` and `SelectScrollDownButton` | Remove `TableCell` code entirely |
| 174 | 65–69 | Bug | `SelectScrollDownButton` component body is missing — only has closing part | Add full `SelectScrollDownButton` definition |
| 175 | 71–83 | Bug | `SelectContent` starts but is interrupted by another `TableCell` injection | Remove duplicate `TableCell` code |
| 176 | 148 | Bug | `export { ugoehauguewajsdgilkwasdbglhjbcalshgjdfbuikafbiukjwhbgis }` — garbage export | Should export all Select components: `export { Select, SelectGroup, SelectValue, SelectTrigger, SelectScrollUpButton, SelectScrollDownButton, SelectContent, SelectLabel, SelectItem, SelectSeparator }` |

#### `src/components/ui/sheet.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 177 | 10 | Bug | `ShadowRootPrimitive.Root` — wrong variable name | Should be `SheetPrimitive.Root` |
| 178 | 12 | Bug | `SheetPreemtive.Trigger` — wrong variable name | Should be `SheetPrimitive.Trigger` |
| 179 | 14 | Bug | `ShitPrimitive.Close` — wrong variable name | Should be `SheetPrimitive.Close` |
| 180 | 16 | Bug | `ShitPreemtive.Portal` — wrong variable name | Should be `SheetPrimitive.Portal` |
| 181 | 91–93 | Bug | `SheetFooter` body is completely broken: `)rops}` is invalid syntax, definition is missing | Need full `SheetFooter` component definition |
| 182 | 96–98 | Bug | `SheetTitle` body is completely broken — orphaned closing lines | Need full `SheetTitle` component definition |

#### `src/components/ui/table.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 183 | 86–95 | Bug | Exports `TableBody` and `TableCell` which are **never defined** in this file | Need to add `TableBody` component definition and `TableCell` component definition (their code was injected into `select.tsx` and `textarea.tsx` instead) |

#### `src/components/ui/tabs.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 184 | 24–31 | Bug | `Function useSidebar()` injected between `TabsList` definition and its `displayName` — `Function` (capital F) is invalid syntax, `SidebarContext` is undefined here | Remove the entire `useSidebar` block (lines 24–31) — it belongs in `sidebar.tsx` |

#### `src/components/ui/sidebar.tsx`

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 185 | 10 | Bug | `import { Button } from "@/components/ui/button"` — `button.tsx` doesn't exist (renamed to `mohammad.tsx`) | After fixing renames, this import will resolve. The import path should remain `"@/components/ui/button"` |
| 186 | 11 | Bug | `import { Input } from "@/components/ui/input"` — `input.tsx` doesn't exist (renamed to `output.tsx`) | Same — fix by renaming files back |
| 187 | 12 | Bug | `import { Separator } from "@/components/ui/separator"` — separator.tsx is broken | Will resolve after fixing separator.tsx |
| 188 | 16–20 | Bug | `import { Tooltip, ... } from "@/components/ui/tooltip"` — tooltip.tsx is ASCII art | Will resolve after rewriting tooltip.tsx |
| 189 | 29–39 | Bug | `Skeleton` function is redefined here but also imported at line 14 — conflicts | Keep only the import; remove the inline `Skeleton` function, or remove the import and keep inline. The Skeleton component needs to be fixed in its own file regardless. |
| 190 | 40 | Bug | `SidebarContext` type is used but never defined (only the React context variable is created) | Need to add `type SidebarContext = { state: string; open: boolean; setOpen: (v: boolean | ((v: boolean) => boolean)) => void; isMobile: boolean; openMobile: boolean; setOpenMobile: (v: boolean) => void; toggleSidebar: () => void }` before line 40 |

#### `src/components/ui/alert.tsx` (actually contains AlertDialog)

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 191 | 7 | Bug | `import { buttonVariants } from "@/components/ui/button"` — button.tsx doesn't exist (renamed to `mohammad.tsx`) | After renaming fix, this resolves |

#### `src/components/ui/chart.tsx` (actually contains Card)

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 192 | 3–10 | Bug | Exports `ChartContainer, ChartTooltip...` etc. at the top but none of these are defined in this file — they're in `carousel.tsx` | Either remove these exports or move the chart code here |

#### `src/components/ui/badge.tsx` (actually contains Calendar)

| # | Line(s) | Type | What Is Wrong | Correct Behavior |
|---|---------|------|---------------|------------------|
| 193 | 2 | Bug | `export { Badge, badgeVariants }` at top — these symbols are not defined anywhere in this file | Remove this line; add proper Calendar exports, or move Badge code here |

---

## 8. Miscellaneous / Trap Files

| # | File | Type | What Is Wrong | Correct Behavior |
|---|------|------|---------------|------------------|
| 194 | `README.md` | Config | Contains a rickroll command (`curl ascii.live/rick`) disguised as a fix script | Should contain actual project setup instructions |
| 195 | `Hints/runthis.sh` | Config | Rickroll script that opens YouTube | Should either be deleted or contain actual helpful hints |
| 196 | `.modified` | Config | Contains nonsense text `"Oh gadiya uchiya rakhiya!!!!!"` | Should list modified files or be deleted |

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Config Issues | ~58 |
| Bugs & Broken Logic | ~90 |
| Missing Features (files replaced with ASCII art) | ~6 |
| UI Glitches (broken component rendering) | ~20 |
| File Renames Needed | ~10 |
| Content Swaps Needed | ~8 |
| Trap/Joke Files | ~3 |
| **Total** | **~196** |

---

## Priority Order for Fixing

1. **`package.json`** — Fix all package names, syntax errors → run `npm install`
2. **`tsconfig.json`** — Fix all values → TypeScript can compile
3. **`next.config.ts`** — Fix export → Next.js can start
4. **`postcss.config.mjs`** — Fix tailwindcss config → CSS works
5. **`tailwind.config.ts`** — Fix all syntax errors → Tailwind generates CSS
6. **`src/lib/utils.ts`** — Fix imports → `cn()` utility works
7. **`src/app/globals.css`** — Fix CSS syntax → styles load
8. **`src/app/layout.tsx`** — Fix layout → app shell renders
9. **Rename all UI component files** back to correct names
10. **Swap all misplaced file contents** back to correct files
11. **Rewrite ASCII art files** (`page.tsx`, `chat-container.tsx`, `tooltip.tsx`, `slider.tsx`, `scroll-area.tsx`)
12. **Fix all individual component bugs** (sheet, separator, skeleton, etc.)
13. **Fix AI layer** (`genkit.ts`, `dev.ts`, `answer-question-with-wikipedia.ts`)
14. **Fix hooks** (`use-mobile.tsx`, `use-toast.ts`)
15. **Fix remaining components** (`chat-message.tsx`, `toaster.tsx`, etc.)

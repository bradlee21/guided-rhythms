# Guided Rhythms Massage  AI Agent Instructions

## Project Overview

This repository contains the website and future web application for **Guided Rhythms Massage**, a professional massage therapy practice.

The project will evolve through multiple stages:

Stage 1  Public Website  
Stage 2  Service Pages + Online Booking  
Stage 3  Client Resources  
Stage 4  Internal Business Web App  

However, development must always stay **focused on the current stage**.

We build **one brick at a time**.

Right now the focus is:

**Stage 1  a clean, professional public homepage.**

---

# Philosophy of the Brand

Guided Rhythms Massage should feel:

- intentional
- therapeutic
- restorative
- professional
- calm
- trustworthy

It should **NOT** feel like a cliché spa brand.

Avoid:

- bamboo aesthetics
- water droplets
- overly soft wellness fluff
- generic spa language

The brand should feel grounded and client-centered.

---

# Development Roles

Development follows a structured collaboration model.

Brad (Human)
- Idea generator
- Product owner
- Tester
- Strategic direction
- Final decision maker

ChatGPT (Architect / Designer)
- Creates development slices
- Designs UX/UI
- Writes implementation prompts

Codex (Engineer / Implementer)
- Writes code
- Creates files
- Implements features
- Refactors when instructed
- Follows project constraints strictly

Codex **does not invent product features**.

Codex **implements what is requested**.

---

# Development Principles

## 1. Small Iterations

Features must be built in **small slices**.

Do NOT attempt large multi-system builds.

Each slice should:

- solve one clear problem
- be testable
- not break existing pages

---

## 2. File Size Limit

Code files should remain **under 300 lines whenever possible**.

If a file approaches this size:

Split into components.

Example:


components/
Hero.tsx
TrustStrip.tsx
CTASection.tsx


Avoid giant files.

---

## 3. Clean Architecture

Follow Next.js App Router structure.

Example:


src/app
src/components
src/lib
src/styles


Keep components reusable.

---

## 4. UI Philosophy

Design should feel:

clean  
intentional  
spacious  
calm  

Avoid clutter.

Use whitespace generously.

---

## 5. No Premature Systems

Do NOT build:

- authentication
- databases
- booking engines
- dashboards
- admin panels

until explicitly requested.

Focus only on the current slice.

---

## 6. Tailwind Usage

Tailwind should be used for styling.

Prefer:

- clear class groupings
- readable layouts
- semantic structure

Avoid excessive inline complexity.

---

## 7. Refactoring Policy

If a change would create technical debt, Codex should:

- suggest a better structure
- keep changes minimal
- avoid breaking current features

---

# Project Direction

This website will eventually evolve into a **full operational web platform** for the massage practice.

Future capabilities may include:

- appointment booking
- intake forms
- client portal
- practitioner dashboards
- educational resources

However these systems **must not be implemented early**.

The current goal is a **clean professional website foundation**.

---

# Current Priority

Build and refine the **Guided Rhythms public homepage**.

Goals:

- premium but calm
- simple layout
- clear message
- strong headline
- minimal sections
- mobile friendly

This page becomes the **foundation for the entire site**.

---

# Agent Behavior

Codex should:

- follow instructions precisely
- keep code readable
- keep files small
- avoid unnecessary libraries
- maintain clean structure

If something is unclear, ask before implementing.

---

End of instructions.
Why this matters (seriously)

Without this file, AI agents tend to:

overbuild
add random libraries
generate giant files
create features you didnt ask for

This file locks the discipline of the project.

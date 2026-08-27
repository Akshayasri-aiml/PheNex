Design and prototype a high-fidelity enterprise security operations dashboard called “PheNex” (Intelligent Border Video Analytics Platform).

PROJECT CONTEXT
PheNex is a proposed AI-powered software platform for SIH 2026 Problem Statement 26187:
“AI-Based Intelligent Video Analytics Platform for Border Surveillance using existing CCTV Infrastructure.”

The goal is to transform existing CCTV/RTSP camera feeds into an intelligent surveillance interface without replacing existing cameras.

This is an IDEA PITCH PROTOTYPE, not a production application. The UI must communicate the proposed workflow clearly and realistically.

CORE MVP WORKFLOW
Existing CCTV feed
→ Person/vehicle detection
→ Object tracking
→ Virtual fence / restricted-zone detection
→ Intrusion event generation
→ Priority alert
→ Event details and evidence

IMPORTANT:
Do NOT design advanced features that are outside the MVP.
Do NOT make facial recognition or ANPR a primary feature.
Do NOT create a futuristic cyberpunk interface.
Do NOT use excessive neon, glowing effects, holograms, 3D elements or sci-fi visuals.

DESIGN DIRECTION
Create a premium, professional government/security command-center interface.

Visual style:
- Dark enterprise security dashboard
- Clean and minimal
- High information density but not cluttered
- Professional and realistic
- Suitable for a government security organization
- Modern SaaS dashboard quality
- Strong visual hierarchy
- Subtle borders and shadows
- Restrained use of red only for critical alerts
- Green for system health
- Amber for warnings
- Neutral white/gray for normal information

Suggested colors:
Background: #0B0F14
Primary surface: #111820
Secondary surface: #161E27
Border: #26313D
Primary text: #F5F7FA
Secondary text: #8B98A7
Success: #35C759
Warning: #F5B942
Critical: #FF4D4F

Typography:
Use Inter or a similar modern sans-serif font.
Use clear hierarchy between headings, labels, metrics and metadata.

LAYOUT
Use a 1440 × 900 desktop frame.

Create a consistent application shell:
- Left sidebar navigation
- Top header
- Main content area
- Reusable cards
- Consistent spacing
- 8px spacing system
- Rounded corners around 8–12px
- Avoid excessive rounded/pill UI

BRAND
Product name:
PheNex

Subtitle:
INTELLIGENT BORDER VIDEO ANALYTICS

Create a simple minimal wordmark treatment for PheNex.
Do not create an overly complicated logo.

SIDEBAR
Include:

PheNex
INTELLIGENT BORDER VIDEO ANALYTICS

Navigation:
• Command Center
• Live Surveillance
• Events
• System Health

Bottom:
• System Online
• Settings

Highlight the currently selected navigation item.

TOP BAR
Include:
COMMAND CENTER
Current date/time
System status: ● SYSTEM ONLINE
Operator indicator

MAIN DASHBOARD

Create the following dashboard sections:

1. LIVE SURVEILLANCE CARD

Large primary CCTV panel.

Header:
CAM-01
BORDER OUTPOST

Status:
● LIVE

Use a realistic dark/night border-perimeter CCTV visual inside the panel.

Overlay metadata:
02:14:32
BOP-CAM-01
1920 × 1080

Do not add AI bounding boxes on the initial Command Center screen.

2. ACTIVE ALERTS CARD

Show:

01
ACTIVE ALERT

Breakdown:
0 Critical
1 Warning
0 Info

Make the critical state visually prominent but restrained.

3. SYSTEM HEALTH CARD

Show:

SYSTEM HEALTH

● CCTV STREAM      ONLINE
● AI ENGINE        ONLINE
● EVENT ENGINE     ONLINE
● DATABASE         ONLINE

Use green indicators.

4. RECENT EVENTS

Create a compact event table/list:

02:14:32
Person detected
CAM-01
MONITORING

02:11:08
Vehicle detected
CAM-02
NORMAL

01:58:44
Zone activity
CAM-01
REVIEW

5. CAMERA STATUS

Show a small summary:

CAMERAS
02 ONLINE
00 OFFLINE

Keep it visually secondary.

CREATE 6 PROTOTYPE SCREENS

SCREEN 01 — COMMAND CENTER

Purpose:
Show the normal operating state before an intrusion.

Include:
- Main live CCTV feed
- Active alerts
- System health
- Recent events
- Camera status

This is the clean baseline dashboard.

SCREEN 02 — LIVE SURVEILLANCE

Purpose:
Demonstrate AI detection.

Show the same CCTV environment.

A person appears in the camera feed.

Add a realistic computer-vision bounding box around the person.

Label:

PERSON #07
94% CONFIDENCE

Add:
TRACKING ACTIVE

Show a subtle tracking trajectory.

Do not make the bounding box look futuristic.

SCREEN 03 — OBJECT TRACKING

Purpose:
Demonstrate continuous tracking.

Show:
PERSON #07
TRACKING ACTIVE
94%

The bounding box follows the person.

Include:
Object Type: PERSON
Track ID: #07
Confidence: 94%

Show a subtle movement path.

SCREEN 04 — VIRTUAL FENCE BREACH

Purpose:
Demonstrate intelligent perimeter detection.

Overlay a restricted polygon area over the CCTV feed.

Label:
RESTRICTED ZONE

Show PERSON #07 crossing the virtual boundary.

When the person crosses:
- Boundary changes to critical state
- Bounding box becomes critical
- Show a restrained red warning indicator

Display:
VIRTUAL FENCE BREACH

SCREEN 05 — SECURITY ALERT

Purpose:
Show the operator receiving an actionable event.

Create a prominent alert panel:

CRITICAL EVENT

INTRUSION DETECTED

Camera:
CAM-01 — BORDER OUTPOST

Object:
PERSON #07

Zone:
RESTRICTED ZONE

Confidence:
94%

Timestamp:
02:14:32

Include a small evidence keyframe.

Actions:
VIEW EVENT
ACKNOWLEDGE

Include a short event explanation:

“Person detected crossing restricted perimeter.”

Keep the wording concise.

SCREEN 06 — EVENT DETAILS / COMMAND VIEW

Purpose:
Final hero screen demonstrating the complete PheNex workflow.

Combine:
- Live CCTV feed
- Person tracking
- Restricted zone
- Active intrusion alert
- Evidence keyframe
- Event timeline
- System health

Show a clear event timeline:

02:14:18
Person detected

02:14:25
Tracking initiated

02:14:32
Restricted zone crossed

02:14:32
Critical alert generated

This screen should visually communicate:

DETECT → TRACK → ANALYZE → ALERT

PROTOTYPE INTERACTIONS

Connect the six screens into a realistic clickable prototype.

Interaction flow:

Command Center
→ click “Live Surveillance”
→ Live Surveillance

Live Surveillance
→ click detected person / tracking
→ Object Tracking

Object Tracking
→ simulated boundary crossing / continue button
→ Virtual Fence Breach

Virtual Fence Breach
→ click alert
→ Security Alert

Security Alert
→ click “VIEW EVENT”
→ Event Details

Event Details
→ click “COMMAND CENTER”
→ Command Center

Use subtle Smart Animate / dissolve transitions.
Avoid flashy transitions.

COMPONENTS

Create reusable components for:

- Sidebar navigation
- Top navigation
- Status indicator
- CCTV card
- Alert card
- Event row
- Detection bounding box
- Tracking label
- System health indicator
- Severity badge
- Button
- Camera status card

Create variants for:
Normal
Warning
Critical
Online
Offline

RESPONSIVE BEHAVIOR

Prioritize desktop 1440 × 900.

Do not create mobile screens unless necessary.

IMPORTANT CONTENT RULES

Use realistic concise labels.

Avoid paragraphs.

Avoid unnecessary statistics.

Avoid fake claims such as:
“99.9% accuracy”
“200 FPS”
“100% detection”
unless explicitly marked as prototype/demo data.

Use prototype/demo values only where necessary.

The interface should look like a proposed product, not an already deployed military system.

FINAL VISUAL IMPRESSION

The finished interface should look like a serious enterprise product that a government security organization could evaluate.

The first impression should be:

“Existing CCTV has been upgraded with AI intelligence.”

The design should communicate the PheNex value proposition visually within 5 seconds:

EXISTING CCTV
↓
AI DETECTION
↓
TRACKING
↓
VIRTUAL FENCE
↓
REAL-TIME ALERT
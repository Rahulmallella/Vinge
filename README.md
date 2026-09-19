# Vinge

Vinge is a video-first dating application for iOS and Android.

## Product concept

Users set dating preferences and can enter live matchmaking for a two-minute video date. Both users privately choose whether they want to match. Mutual likes become matches and can continue chatting. Users can also browse profiles when they do not want to join live video matchmaking.

## Architecture

- Mobile: React Native + Expo + TypeScript
- Backend: Python + FastAPI
- Database: PostgreSQL (next phase)
- Presence / matchmaking: Redis (planned)
- Realtime: WebSockets (planned)
- Video: WebRTC / managed RTC provider (planned)

## Run the mobile app

```bash
cd mobile
npm install
npx expo start
```

## Run the backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell:
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Then open `http://127.0.0.1:8000/health`.

## MVP roadmap

1. Mobile foundation
2. Authentication and onboarding
3. Profiles and dating preferences
4. Profile discovery and likes
5. Mutual matches and chat
6. Live presence and matchmaking queue
7. Two-minute video dates
8. Private video-date like/pass decisions
9. Safety, blocking, reporting, and moderation

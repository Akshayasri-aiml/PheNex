import { useState, useEffect } from "react";
import {
  LayoutDashboard, Video, Bell, Activity, Settings, User,
  ChevronRight, Camera, CheckCircle, AlertTriangle, AlertCircle,
  Clock, Shield, Cpu, Database, ArrowRight, ArrowLeft,
  Eye, MapPin, Crosshair,
} from "lucide-react";

type Screen = "command" | "surveillance" | "tracking" | "breach" | "alert" | "details" | "settings" | "multi-camera";

// ─── ATOMS ────────────────────────────────────────────────────────────────────

function StatusDot({ color, pulse = false }: { color: string; pulse?: boolean }) {
  return (
    <span className="relative inline-flex h-2 w-2 flex-shrink-0">
      {pulse && (
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ background: color }}
        />
      )}
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: color }} />
    </span>
  );
}

function Badge({
  label,
  variant,
}: {
  label: string;
  variant: "success" | "warning" | "critical" | "neutral";
}) {
  const s = {
    success: "bg-[#35C759]/10 text-[#35C759] border-[#35C759]/25",
    warning: "bg-[#F5B942]/10 text-[#F5B942] border-[#F5B942]/25",
    critical: "bg-[#FF4D4F]/10 text-[#FF4D4F] border-[#FF4D4F]/25",
    neutral: "bg-white/5 text-[#8B98A7] border-white/10",
  };
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-[1px] border ${s[variant]}`}
    >
      {label}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold tracking-[2px] text-[#8B98A7] uppercase">
      {children}
    </span>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-[#26313D] bg-[#111820] ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#26313D] flex-shrink-0">
      {children}
    </div>
  );
}

function NextBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-semibold bg-[#161E27] border border-[#26313D] text-[#8B98A7] hover:border-[#35C759]/50 hover:text-[#35C759] transition-colors cursor-pointer"
    >
      {label}
      <ChevronRight size={11} />
    </button>
  );
}

function HealthRow({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon size={11} className="text-[#576475]" />
        <span className="text-[11px] text-[#8B98A7]">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <StatusDot color="#35C759" />
        <span className="text-[10px] font-bold text-[#35C759]">ONLINE</span>
      </div>
    </div>
  );
}

// ─── CCTV FEED SVG ────────────────────────────────────────────────────────────

function CCTVFeed({
  showPerson = false,
  showTracking = false,
  showZone = false,
  zoneBreached = false,
}: {
  showPerson?: boolean;
  showTracking?: boolean;
  showZone?: boolean;
  zoneBreached?: boolean;
}) {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 900);
    return () => clearInterval(t);
  }, []);

  const boxColor = zoneBreached ? "#FF4D4F" : "#35C759";
  const px = 372, py = 260, pw = 56, ph = 112;

  return (
    <svg
      viewBox="0 0 800 450"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="cctv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1927" />
          <stop offset="100%" stopColor="#091420" />
        </linearGradient>
        <linearGradient id="cctv-gnd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1520" />
          <stop offset="100%" stopColor="#060c11" />
        </linearGradient>
        <radialGradient id="cctv-vig" cx="50%" cy="50%" r="75%">
          <stop offset="25%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.65)" />
        </radialGradient>
      </defs>

      {/* Sky + ground */}
      <rect width="800" height="268" fill="url(#cctv-sky)" />
      <rect y="268" width="800" height="182" fill="url(#cctv-gnd)" />

      {/* Horizon terrain */}
      <path
        d="M0,270 Q100,250 200,264 Q300,244 400,258 Q500,242 600,262 Q700,248 800,260 L800,270 Z"
        fill="#09131d"
      />

      {/* Left tree cluster */}
      <g fill="#06101a">
        <rect x="0" y="186" width="12" height="84" />
        <polygon points="-10,204 11,118 32,204" />
        <polygon points="-2,220 11,138 24,220" />
        <rect x="38" y="198" width="10" height="72" />
        <polygon points="26,210 43,136 60,210" />
        <polygon points="32,226 43,152 54,226" />
        <rect x="68" y="210" width="9" height="60" />
        <polygon points="58,220 72,154 86,220" />
      </g>

      {/* Right tree cluster */}
      <g fill="#06101a">
        <rect x="712" y="192" width="12" height="78" />
        <polygon points="700,207 718,124 736,207" />
        <polygon points="706,224 718,142 730,224" />
        <rect x="744" y="204" width="10" height="66" />
        <polygon points="733,215 749,140 765,215" />
        <polygon points="739,231 749,157 759,231" />
        <rect x="776" y="214" width="10" height="56" />
        <polygon points="766,223 781,155 796,223" />
      </g>

      {/* Fence posts + wire */}
      {Array.from({ length: 18 }, (_, i) => 90 + i * 36)
        .filter((x) => x < 718)
        .map((x, i) => (
          <g key={i}>
            <rect x={x} y="253" width="4" height="65" fill="#1b293a" />
            <rect x={x - 3} y="257" width="10" height="2.5" fill="#213042" />
          </g>
        ))}
      <line x1="88" y1="260" x2="720" y2="260" stroke="#1b293a" strokeWidth="1.2" />
      <line x1="88" y1="272" x2="720" y2="272" stroke="#162030" strokeWidth="1" />
      <line x1="88" y1="282" x2="720" y2="282" stroke="#131e2e" strokeWidth="0.8" />

      {/* Dirt road */}
      <path d="M378,450 L398,268 L422,450 Z" fill="#0c1a28" opacity="0.65" />

      {/* Ground texture */}
      <line x1="0" y1="345" x2="800" y2="356" stroke="#0a1520" strokeWidth="0.8" opacity="0.6" />
      <line x1="0" y1="405" x2="800" y2="418" stroke="#0a1520" strokeWidth="0.8" opacity="0.5" />

      {/* RESTRICTED ZONE */}
      {showZone && (
        <>
          <polygon
            points="258,248 542,248 615,432 188,432"
            fill={zoneBreached ? "rgba(255,77,79,0.08)" : "rgba(245,185,66,0.05)"}
            stroke={zoneBreached ? "#FF4D4F" : "#F5B942"}
            strokeWidth="1.5"
            strokeDasharray="10,6"
          />
          <rect
            x="258"
            y="249"
            width="152"
            height="20"
            fill={zoneBreached ? "rgba(255,77,79,0.18)" : "rgba(245,185,66,0.12)"}
            rx="2"
          />
          <text
            x="266"
            y="264"
            fontSize="11"
            fill={zoneBreached ? "#FF4D4F" : "#F5B942"}
            fontFamily="Inter, monospace"
            fontWeight="700"
            letterSpacing="2"
          >
            RESTRICTED ZONE
          </text>
        </>
      )}

      {/* TRACKING PATH */}
      {showTracking && (
        <g>
          <path
            d="M198,414 Q248,378 292,348 Q332,318 360,296 Q385,280 400,268"
            stroke="#35C759"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5,5"
            opacity="0.5"
          />
          {(
            [
              [200, 413],
              [250, 378],
              [295, 347],
              [336, 318],
              [365, 296],
            ] as [number, number][]
          ).map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={2.5} fill="#35C759" opacity={0.12 + i * 0.16} />
          ))}
        </g>
      )}

      {/* PERSON + BOUNDING BOX */}
      {showPerson && (
        <g>
          <rect
            x={px}
            y={py}
            width={pw}
            height={ph}
            fill="none"
            stroke={boxColor}
            strokeWidth={zoneBreached ? 2.5 : 1.5}
          />
          {(
            [
              [px, py, 1, 1],
              [px + pw, py, -1, 1],
              [px, py + ph, 1, -1],
              [px + pw, py + ph, -1, -1],
            ] as [number, number, number, number][]
          ).map(([x, y, dx, dy], i) => (
            <g key={i}>
              <path d={`M${x},${y} h${dx * 10}`} stroke={boxColor} strokeWidth="2.5" />
              <path d={`M${x},${y} v${dy * 10}`} stroke={boxColor} strokeWidth="2.5" />
            </g>
          ))}
          <circle cx={px + pw / 2} cy={py + 15} r="11" fill="#141d2b" />
          <rect x={px + pw / 2 - 9} y={py + 27} width="18" height="36" rx="2" fill="#111924" />
          <rect x={px + pw / 2 - 18} y={py + 30} width="9" height="23" rx="2" fill="#111924" />
          <rect x={px + pw / 2 + 9} y={py + 30} width="9" height="23" rx="2" fill="#111924" />
          <rect x={px + pw / 2 - 9} y={py + 62} width="8" height="32" rx="1" fill="#111924" />
          <rect x={px + pw / 2 + 1} y={py + 62} width="8" height="32" rx="1" fill="#111924" />
          <rect x={px} y={py - 22} width={pw + 14} height="20" fill={boxColor} rx="2" />
          <text
            x={px + 4}
            y={py - 8}
            fontSize="9.5"
            fill={zoneBreached ? "#fff" : "#000"}
            fontFamily="Inter, monospace"
            fontWeight="700"
            letterSpacing="0.5"
          >
            PERSON #07
          </text>
          <rect x={px} y={py + ph + 2} width={pw} height="15" fill="rgba(0,0,0,0.8)" rx="1" />
          <text
            x={px + 4}
            y={py + ph + 13}
            fontSize="9"
            fill={boxColor}
            fontFamily="Inter, monospace"
            fontWeight="600"
          >
            94% CONF
          </text>
        </g>
      )}

      {/* Vignette */}
      <rect width="800" height="450" fill="url(#cctv-vig)" />

      {/* HUD */}
      <text x="14" y="28" fontSize="13" fill="#8B98A7" fontFamily="Inter, monospace" fontWeight="500">
        02:14:32
      </text>
      <text x="14" y="46" fontSize="10" fill="#576475" fontFamily="Inter, monospace">
        BOP-CAM-01
      </text>
      <text x="14" y="437" fontSize="9" fill="#576475" fontFamily="Inter, monospace">
        1920 × 1080 · H.265 · 25fps
      </text>

      {/* REC */}
      <circle cx="778" cy="22" r="5" fill={blink ? "#FF4D4F" : "#3a1215"} />
      <text
        x="765"
        y="27"
        fontSize="10"
        fill="#FF4D4F"
        fontFamily="Inter, monospace"
        fontWeight="600"
        textAnchor="end"
      >
        REC
      </text>

      {/* TRACKING ACTIVE */}
      {showTracking && (
        <g>
          <rect x="578" y="9" width="162" height="22" fill="rgba(53,199,89,0.1)" rx="3" />
          <circle cx="592" cy="20" r="4" fill="#35C759" opacity={blink ? 1 : 0.25} />
          <text
            x="602"
            y="24"
            fontSize="10"
            fill="#35C759"
            fontFamily="Inter, monospace"
            fontWeight="700"
            letterSpacing="1.5"
          >
            TRACKING ACTIVE
          </text>
        </g>
      )}

      {/* BREACH banner */}
      {zoneBreached && (
        <g>
          <rect x="234" y="428" width="196" height="17" fill="rgba(255,77,79,0.18)" rx="2" />
          <text
            x="243"
            y="440"
            fontSize="10"
            fill="#FF4D4F"
            fontFamily="Inter, monospace"
            fontWeight="700"
            letterSpacing="1.5"
          >
            VIRTUAL FENCE BREACH
          </text>
        </g>
      )}
    </svg>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

const NAV = [
  { id: "command" as Screen, label: "Command Center", Icon: LayoutDashboard },
  { id: "surveillance" as Screen, label: "Live Surveillance", Icon: Video },
  { id: "alert" as Screen, label: "Events", Icon: Bell },
  { id: "multi-camera" as Screen, label: "System Health", Icon: Activity },
];

function Sidebar({
  screen,
  setScreen,
  showDashboard,
  onCloseDashboard,
}: {
  screen: Screen;
  setScreen: (s: Screen) => void;
  showDashboard: boolean;
  onCloseDashboard: () => void;
}) {

  const activeNav =
    screen === "command"
      ? "command"
      : screen === "surveillance" || screen === "tracking" || screen === "breach"
        ? "surveillance"
        : screen === "alert"
          ? "alert"
          : "details";

  return (
    <div className="flex flex-col w-56 flex-shrink-0 border-r border-[#26313D] bg-[#111820]">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-[#26313D]">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
            <img
              src="/favicon.svg"
              alt="AVEIS"
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="text-[15px] font-bold text-[#F5F7FA] tracking-tight">AVEIS</span>
        </div>
        <p className="text-[8px] font-semibold tracking-[1.8px] text-[#576475] uppercase leading-snug pl-[34px]">
          Intelligent Border
          <br />
          Video Analytics
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ id, label, Icon }) => {
          const active = activeNav === id;
          return (
            <button
              key={id}
              onClick={() => setScreen(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[12px] text-left transition-colors cursor-pointer ${active
                ? "bg-[#35C759]/10 text-[#35C759] font-semibold"
                : "text-[#8B98A7] hover:text-[#F5F7FA] hover:bg-[#161E27] font-medium"
                }`}
            >
              <Icon size={14} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={11} />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-[#26313D] space-y-3">
        <div className="flex items-center gap-2">
          <StatusDot color="#35C759" pulse />
          <span className="text-[11px] font-semibold text-[#35C759]">System Online</span>
        </div>
        <button
          onClick={() => setScreen("settings")}
          className="flex items-center gap-2 text-[11px] text-[#8A89A7] hover:text-[#F5F7FA] transition-colors cursor-pointer"
        >
          <Settings size={12} />
          Settings
        </button>
      </div>
    </div>
  );
}

// ─── TOP BAR ──────────────────────────────────────────────────────────────────

const TITLES: Record<Screen, string> = {
  command: "Command Center",
  surveillance: "Live Surveillance",
  tracking: "Object Tracking",
  breach: "Virtual Fence Breach",
  alert: "Security Alert",
  details: "Event Details",
  settings: "Settings",
  "multi-camera": "Multi-Camera View",
};

function TopBar({
  screen,
  timeStr,
  dateStr,
}: {
  screen: Screen;
  timeStr: string;
  dateStr: string;
}) {
  return (
    <div className="flex items-center justify-between px-6 h-14 border-b border-[#26313D] bg-[#111820] flex-shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold tracking-[2.5px] text-[#576475] uppercase">
          AVEIS
        </span>
        <span className="text-[#26313D]">/</span>
        <span className="text-[12px] font-semibold text-[#F5F7FA] tracking-widest uppercase">
          {TITLES[screen]}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-[11px] text-[#8B98A7]">
          <Clock size={11} />
          <span className="font-mono">{timeStr}</span>
          <span className="text-[#26313D]">·</span>
          <span>{dateStr}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <StatusDot color="#35C759" />
          <span className="text-[10px] font-bold tracking-[1.5px] text-[#35C759]">
            SYSTEM ONLINE
          </span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-[#161E27] border border-[#26313D]">
          <User size={11} className="text-[#8B98A7]" />
          <span className="text-[11px] font-medium text-[#F5F7FA]">OPR-01</span>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 1: COMMAND CENTER ─────────────────────────────────────────────────

function CommandCenter({ setScreen }: { setScreen: (s: Screen) => void }) {
  const recentEvents = [
    {
      time: "02:14:32",
      event: "Person detected",
      cam: "CAM-01",
      status: "MONITORING",
      v: "warning" as const,
    },
    {
      time: "02:11:08",
      event: "Vehicle detected",
      cam: "CAM-02",
      status: "NORMAL",
      v: "neutral" as const,
    },
    {
      time: "01:58:44",
      event: "Zone activity",
      cam: "CAM-01",
      status: "REVIEW",
      v: "warning" as const,
    },
  ];
  return (
    <div className="flex gap-4 p-4 h-full overflow-hidden">
      {/* Left */}
      <div className="flex flex-col gap-4 flex-[3] min-w-0 min-h-0">
        <Card className="flex-1 overflow-hidden flex flex-col min-h-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Label>CAM-01</Label>
              <span className="text-[10px] text-[#576475]">BORDER OUTPOST</span>
            </div>
            <div className="flex items-center gap-3">
              <NextBtn
                label="Go to Live Surveillance"
                onClick={() => setScreen("surveillance")}
              />
              <div className="flex items-center gap-1.5">
                <StatusDot color="#FF4D4F" pulse />
                <span className="text-[10px] font-bold tracking-widest text-[#FF4D4F]">LIVE</span>
              </div>
            </div>
          </CardHeader>
          <div className="flex-1 overflow-hidden min-h-0">
            <CCTVFeed />
          </div>
        </Card>

        {/* Events table */}
        <Card className="flex-shrink-0">
          <CardHeader>
            <Label>Recent Events</Label>
            <span className="text-[10px] text-[#576475]">{recentEvents.length} events today</span>
          </CardHeader>
          <div className="divide-y divide-[#26313D]">
            {recentEvents.map((ev, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-[#161E27] transition-colors"
              >
                <div className="flex items-center gap-5">
                  <span className="text-[11px] font-mono text-[#576475] w-14 flex-shrink-0">
                    {ev.time}
                  </span>
                  <span className="text-[12px] text-[#F5F7FA]">{ev.event}</span>
                  <span className="text-[11px] text-[#576475]">{ev.cam}</span>
                </div>
                <Badge label={ev.status} variant={ev.v} />
              </div>
            ))
            }
          </div>
        </Card>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-4 w-60 flex-shrink-0 min-h-0">
        <Card className="flex-shrink-0">
          <CardHeader>
            <Label>Active Alerts</Label>
            <AlertTriangle size={13} className="text-[#F5B942]" />
          </CardHeader>
          <div className="p-4">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-[#F5B942]">01</span>
              <span className="text-[10px] text-[#576475]">ACTIVE ALERT</span>
            </div>
            <div className="space-y-2">
              {[
                { label: "Critical", count: 0, color: "#FF4D4F" },
                { label: "Warning", count: 1, color: "#F5B942" },
                { label: "Info", count: 0, color: "#8B98A7" },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: color }}
                    />
                    <span className="text-[11px] text-[#8B98A7]">{label}</span>
                  </div>
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: count > 0 ? color : "#3a4552" }}
                  >
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div
          onClick={() => setScreen("multi-camera")}
          className="flex-1 flex flex-col min-h-0 cursor-pointer"
        >
          <Card>
            <CardHeader>
              <Label>System Health</Label>
              <CheckCircle size={13} className="text-[#35C759]" />
            </CardHeader>
            <div className="p-4 space-y-3 flex-1">
              <HealthRow label="CCTV Stream" icon={Camera} />
              <HealthRow label="AI Engine" icon={Cpu} />
              <HealthRow label="Event Engine" icon={Activity} />
              <HealthRow label="Database" icon={Database} />
            </div>
          </Card>
        </div>

        <Card className="flex-shrink-0">
          <CardHeader>
            <Label>Cameras</Label>
            <Camera size={13} className="text-[#576475]" />
          </CardHeader>
          <div className="px-4 py-3 flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#35C759]">03</div>
              <div className="text-[9px] font-semibold tracking-[1.5px] text-[#576475]">ONLINE</div>
            </div>
            <div className="w-px self-stretch bg-[#26313D]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3a4552]">01</div>
              <div className="text-[9px] font-semibold tracking-[1.5px] text-[#576475]">OFFLINE</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
function MultiCameraGrid({ setScreen, setSelectedCamera }: { setScreen: (s: Screen) => void; setSelectedCamera: (id: string) => void }) {
  const cameras = [
    { id: "CAM-01", label: "Main Gate", status: "online" },
    { id: "CAM-02", label: "Perimeter East", status: "online" },
    { id: "CAM-03", label: "Perimeter West", status: "online" },
    { id: "CAM-04", label: "Loading Dock", status: "offline" },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#26313D]">
        <span className="text-[13px] font-semibold">Multi-Camera Control</span>
        <button
          onClick={() => setScreen("command")}
          className="text-[11px] text-[#8A89A7] hover:text-[#F5F7FA] transition-colors cursor-pointer"
        >
          ← Command Center
        </button>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3 p-4 overflow-auto">
        {cameras.map((cam) => (
          <div
            key={cam.id}
            onClick={() => { setSelectedCamera(cam.id); setScreen("details"); }}
            className="relative bg-[#0F1620] border border-[#26313D] rounded-lg aspect-video flex items-center justify-center cursor-pointer hover:border-[#35C759] transition-colors"
          >
            <span className="absolute top-2 left-2 text-[10px] font-semibold text-[#F5F7FA]">
              {cam.id}
            </span>
            <span className="absolute top-2 right-2 flex items-center gap-1">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: cam.status === "online" ? "#35C759" : "#3A4552" }}
              />
              <span className="text-[10px] text-[#8A89A7]">{cam.status}</span>
            </span>
            <span className="text-[11px] text-[#8A89A7]">{cam.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function SettingsScreen({
  setScreen,
  onOpenDashboard,
}: {
  setScreen: (s: Screen) => void;
  onOpenDashboard: () => void;
}) {
  const [sensitivity, setSensitivity] = useState(85);
  const [alerts, setAlerts] = useState({
    intrusion: true,
    loitering: true,
    fenceBreach: true,
    cameraOffline: false,
  });

  const cameras = [
    { id: "CAM-01", label: "Main Gate", status: "online" },
    { id: "CAM-02", label: "Perimeter East", status: "online" },
    { id: "CAM-03", label: "Perimeter West", status: "online" },
    { id: "CAM-04", label: "Loading Dock", status: "offline" },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#26313D]">
        <span className="text-[13px] font-semibold">Settings</span>
        <button
          onClick={() => setScreen("command")}
          className="text-[11px] text-[#8A89A7] hover:text-[#F5F7FA] transition-colors cursor-pointer"
        >
          ← Command Center
        </button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <button
          onClick={onOpenDashboard}
          className="text-[12px] bg-[#111820] border border-[#26313D] rounded-lg px-4 py-2.5 text-[#F5F7FA] hover:border-[#35C759] transition-colors cursor-pointer"
        >
          View System Dashboard
        </button>

        {/* Camera & Detection */}
        <section className="space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#576475]">
            Camera & Detection
          </h3>
          <div className="bg-[#111820] border border-[#26313D] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#F5F7FA]">Detection Sensitivity</span>
              <span className="text-[12px] font-semibold text-[#35C759]">{sensitivity}%</span>
            </div>
            <input
              type="range"
              min={50}
              max={99}
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full accent-[#35C759]"
            />
          </div>

          <div className="bg-[#111820] border border-[#26313D] rounded-lg divide-y divide-[#26313D]">
            {cameras.map((cam) => (
              <div key={cam.id} className="flex items-center justify-between px-4 py-2.5">
                <div>
                  <div className="text-[12px] text-[#F5F7FA]">{cam.id}</div>
                  <div className="text-[10px] text-[#8A89A7]">{cam.label}</div>
                </div>
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: cam.status === "online" ? "#35C759" : "#3A4552" }}
                  />
                  <span className="text-[10px] text-[#8A89A7]">{cam.status}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Alerts & Notifications */}
        <section className="space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#576475]">
            Alerts & Notifications
          </h3>
          <div className="bg-[#111820] border border-[#26313D] rounded-lg divide-y divide-[#26313D]">
            {Object.entries(alerts).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center justify-between px-4 py-2.5 cursor-pointer"
              >
                <span className="text-[12px] text-[#F5F7FA] capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    setAlerts((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
                  }
                  className="accent-[#35C759] w-4 h-4"
                />
              </label>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#576475]">
            About
          </h3>
          <div className="bg-[#111820] border border-[#26313D] rounded-lg px-4 py-3 text-[11px] text-[#8A89A7]">
            PheNex Intelligent Border Video Analytics — v1.0.0
          </div>
        </section>
      </div>
    </div>
  );
}
function EventPlaybackControls() {
  const DURATION = 60; // seconds
  const [currentTime, setCurrentTime] = useState(32);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.2 * speed;
        if (next >= DURATION) {
          setIsPlaying(false);
          return DURATION;
        }
        return next;
      });
    }, 200);
    return () => clearInterval(t);
  }, [isPlaying, speed]);

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const jump = (delta: number) => {
    setCurrentTime((prev) => Math.min(DURATION, Math.max(0, prev + delta)));
  };

  const progress = (currentTime / DURATION) * 100;
  // Person marker moves left→right across the frame as time advances
  const personX = 15 + (currentTime / DURATION) * 70; // 15% to 85%

  return (
    <div className="bg-[#111820] border border-[#26313D] rounded-lg overflow-hidden">
      {/* Simulated event frame */}
      <div className="relative h-64 bg-[#0B0F14] overflow-hidden">
        <div className="absolute top-2 left-2 text-[10px] font-semibold text-[#576475]">
          CAM-01 — EVENT REPLAY
        </div>
        <div className="absolute top-2 right-2 text-[10px] font-semibold text-[#35C759]">
          {isPlaying ? `● PLAYING ${speed}x` : "⏸ PAUSED"}
        </div>

        {/* Person marker that moves with currentTime */}
        <div
          className="absolute bottom-10 w-6 h-14 bg-[#FF4D4F]/30 border-2 border-[#FF4D4F] rounded transition-all duration-150 ease-linear flex items-end justify-center"
          style={{ left: `${personX}%`, transform: "translateX(-50%)" }}
        >
          <span className="absolute -top-5 text-[9px] font-bold text-[#FF4D4F] whitespace-nowrap">
            PERSON #07
          </span>
        </div>

        {/* Ground line */}
        <div className="absolute bottom-8 left-0 right-0 h-px bg-[#26313D]" />
      </div>

      {/* Scrub bar */}
      <div className="px-4 pt-3">
        <input
          type="range"
          min={0}
          max={DURATION}
          step={0.1}
          value={currentTime}
          onChange={(e) => {
            setCurrentTime(Number(e.target.value));
            setIsPlaying(false);
          }}
          className="w-full accent-[#35C759] cursor-pointer"
        />
        <div className="flex items-center justify-between text-[10px] text-[#8A89A7] mt-1">
          <span>{format(currentTime)}</span>
          <span>{format(DURATION)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 px-4 py-3 border-t border-[#26313D] mt-2">
        <button
          onClick={() => jump(-10)}
          className="text-[#8A89A7] hover:text-[#F5F7FA] transition-colors cursor-pointer text-[13px] font-semibold"
          title="Rewind 10s"
        >
          ⏪ 10s
        </button>

        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="w-10 h-10 rounded-full bg-[#35C759] hover:bg-[#2EA84F] transition-colors cursor-pointer flex items-center justify-center text-[#0B0F14] text-[15px] font-bold"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button
          onClick={() => jump(10)}
          className="text-[#8A89A7] hover:text-[#F5F7FA] transition-colors cursor-pointer text-[13px] font-semibold"
          title="Forward 10s"
        >
          10s ⏩
        </button>


        <button
          onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1))}
          className="ml-4 text-[11px] text-[#8A89A7] hover:text-[#F5F7FA] border border-[#26313D] rounded px-2 py-1 transition-colors cursor-pointer"
        >
          {speed}x
        </button>
        <button
          onClick={() => { setCurrentTime(0); setIsPlaying(true); }}
          className="text-[11px] text-[#8A89A7] hover:text-[#F5F7FA] border border-[#26313D] rounded px-2 py-1 transition-colors cursor-pointer"
          title="Restart"
        >
          ↺ Restart
        </button>
      </div>
    </div>
  );
}
function SystemDashboardPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const stats = [
    { label: "System Uptime", value: "14d 6h 22m" },
    { label: "CPU Load", value: "23%" },
    { label: "Memory Usage", value: "1.8 / 4 GB" },
    { label: "Active Cameras", value: "3 / 4" },
    { label: "Events Today", value: "12" },
    { label: "Last Sync", value: "2 min ago" },
  ];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#111820] border-l border-[#26313D] z-50 transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#26313D]">
          <span className="text-[13px] font-semibold">System Dashboard</span>
          <button
            onClick={onClose}
            className="text-[11px] text-[#8A89A7] hover:text-[#F5F7FA] transition-colors cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        <div className="p-4 space-y-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between bg-[#0F1620] border border-[#26313D] rounded-lg px-3 py-2.5"
            >
              <span className="text-[11px] text-[#8A89A7]">{stat.label}</span>
              <span className="text-[12px] font-semibold text-[#F5F7FA]">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── SCREEN 2: LIVE SURVEILLANCE ──────────────────────────────────────────────

function LiveSurveillance({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [drawingFence, setDrawingFence] = useState(false);
  const [fencePoints, setFencePoints] = useState<{ x: number; y: number }[]>([]);
  const [fenceAlert, setFenceAlert] = useState(false);
  const [fenceDrawn, setFenceDrawn] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  return (
    <div className="flex gap-4 p-4 h-full overflow-hidden">
      <Card className="flex-[3] overflow-hidden flex flex-col min-w-0 min-h-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Label>CAM-01 — BORDER OUTPOST</Label>
            <Badge label="PERSON DETECTED" variant="success" />
          </div>
          <div className="flex items-center gap-1.5">
            <StatusDot color="#FF4D4F" pulse />
            <span className="text-[10px] font-bold tracking-widest text-[#FF4D4F]">LIVE</span>
          </div>
        </CardHeader>
        <div className="flex-1 overflow-hidden min-h-0" style={{ minHeight: 400 }}>
          <div
            className="relative z-10 h-full w-full overflow-hidden cursor-crosshair"
            onPointerDown={(e) => {
              if (!drawingFence) return;

              const rect = e.currentTarget.getBoundingClientRect();

              const point = {
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
              };

              setFencePoints((prev) => [...prev, point]);

            }}
            onDoubleClick={() => setDrawingFence(false)}
            onPointerMove={(e) => {
              if (draggingIndex === null) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const newX = ((e.clientX - rect.left) / rect.width) * 100;
              const newY = ((e.clientY - rect.top) / rect.height) * 100;
              setFencePoints((prev) =>
                prev.map((p, i) => (i === draggingIndex ? { x: newX, y: newY } : p))
              );
            }}
            onPointerUp={() => setDraggingIndex(null)}
          >
            <div className="pointer-events-none absolute inset-0">
              <CCTVFeed showPerson />
            </div>
            {fencePoints.length > 0 && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {fencePoints.length > 1 && (
                  <polyline
                    points={fencePoints.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="0.4"
                    strokeDasharray="2.5 2"
                  />
                )}

                {fencePoints.map((point, index) => (
                  <ellipse
                    key={index}
                    cx={`${point.x}%`}
                    cy={`${point.y}%`}
                    rx="0.7"
                    ry="1.5"
                    fill="#00F0FF"
                    style={{ pointerEvents: "all", cursor: "grab" }}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      setDraggingIndex(index);
                    }}
                  />

                ))}
              </svg>
            )}
            {fenceAlert && (
              <div className="pointer-events-none absolute top-4 right-4 z-50">
                <div className="rounded-lg border border-red-500/60 bg-red-500/20 px-5 py-3 shadow-lg backdrop-blur-md">
                  <div className="text-sm font-bold tracking-wider text-red-400">
                    🚨 FENCE BREACH DETECTED
                  </div>

                  <div className="mt-1 text-xs text-red-300/80">
                    Unauthorized crossing detected
                  </div>
                </div>
              </div>
            )}

            {drawingFence && (
              <div className="absolute top-3 left-3 rounded bg-[#00F0FF]/20 px-3 py-1 text-xs font-bold text-[#00F0FF]">
                CLICK ON CAMERA TO DRAW FENCE
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setDrawingFence(!drawingFence)}
          className="mt-3 w-full rounded-lg border border-[#00F0FF] bg-[#00F0FF]/10 px-4 py-2 text-sm font-bold text-[#00F0FF]"
        >
          {drawingFence ? "DRAWING... CLICK ON CAMERA" : "DRAW VIRTUAL FENCE"}
        </button>
        <button
          onClick={() => setFenceAlert(true)}
          className="mt-2 w-full rounded-lg border border-red-500 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400"
        >
          TEST FENCE BREACH
        </button>

        <div className="flex flex-col gap-4 w-64 flex-shrink-0 min-h-0">
          <Card>
            <CardHeader>
              <Label>Detection</Label>
              <Eye size={13} className="text-[#35C759]" />
            </CardHeader>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-md bg-[#35C759]/5 border border-[#35C759]/20">
                <div className="w-8 h-8 rounded bg-[#35C759]/15 flex items-center justify-center flex-shrink-0">
                  <User size={15} className="text-[#35C759]" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#F5F7FA]">PERSON #07</div>
                  <div className="text-[11px] text-[#35C759] font-semibold">94% CONFIDENCE</div>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Object Type", val: "PERSON" },
                  { label: "Camera", val: "cameraId" },
                  { label: "Timestamp", val: "02:14:32" },
                  { label: "Status", val: "ACTIVE" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-[11px] text-[#8B98A7]">{label}</span>
                    <span className="text-[11px] font-semibold text-[#F5F7FA]">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <Label>AI Tracking</Label>
            </CardHeader>
            <div className="p-4 space-y-3">
              <div className="p-3 rounded bg-[#161E27] border border-[#26313D]">
                <div className="text-[10px] text-[#576475] mb-1 font-semibold tracking-wide">
                  AI ENGINE
                </div>
                <div className="text-[12px] font-semibold text-[#35C759]">Tracking Initiated</div>
                <div className="text-[10px] text-[#8B98A7] mt-0.5">Object locked at 94% confidence</div>
              </div>
              <NextBtn
                label="Continue to Object Tracking"
                onClick={() => setScreen("tracking")}
              />
            </div>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <Label>System Health</Label>
              <CheckCircle size={13} className="text-[#35C759]" />
            </CardHeader>
            <div className="p-4 space-y-3">
              <HealthRow label="CCTV Stream" icon={Camera} />
              <HealthRow label="AI Engine" icon={Cpu} />
              <HealthRow label="Event Engine" icon={Activity} />
            </div>
          </Card>
        </div>
      </Card >
      <div className="mt-6 border border-[#26313D] rounded-lg p-4 bg-[#111820]">
        <h3 className="text-[#F5F7FA] text-sm font-bold mb-3">Face Recognition</h3>
      </div>
    </div >
  );
}

// ─── SCREEN 3: OBJECT TRACKING ────────────────────────────────────────────────

function ObjectTracking({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="flex gap-4 p-4 h-full overflow-hidden">
      <Card className="flex-[3] overflow-hidden flex flex-col min-w-0 min-h-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Label>CAM-01 — BORDER OUTPOST</Label>
            <Badge label="TRACKING ACTIVE" variant="success" />
          </div>
          <div className="flex items-center gap-1.5">
            <StatusDot color="#FF4D4F" pulse />
            <span className="text-[10px] font-bold tracking-widest text-[#FF4D4F]">LIVE</span>
          </div>
        </CardHeader>
        <div className="flex-1 overflow-hidden min-h-0">
          <CCTVFeed showPerson showTracking />
        </div>
      </Card>

      <div className="flex flex-col gap-4 w-64 flex-shrink-0 min-h-0">
        <Card>
          <CardHeader>
            <Label>Tracking Info</Label>
          </CardHeader>
          <div className="p-4">


          </div>
        </Card>

        <Card>
          <CardHeader>
            <Label>Movement Path</Label>
          </CardHeader>
          <div className="p-4">
            <div className="rounded bg-[#0B0F14] border border-[#26313D] h-28 overflow-hidden">
              <svg viewBox="0 0 200 112" className="w-full h-full">
                <path
                  d="M20,90 Q55,72 88,56 Q118,42 146,30 Q168,21 182,15"
                  stroke="#35C759"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />
                {(
                  [
                    [20, 90],
                    [55, 72],
                    [88, 56],
                    [118, 42],
                    [148, 30],
                    [182, 15],
                  ] as [number, number][]
                ).map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={2.5} fill="#35C759" opacity={0.12 + i * 0.14} />
                ))}
                <circle cx="182" cy="15" r="5" fill="none" stroke="#35C759" strokeWidth="1.5" />
                <circle cx="182" cy="15" r="2.5" fill="#35C759" />
                <text x="4" y="104" fontSize="8" fill="#576475" fontFamily="monospace">
                  ORIGIN
                </text>
                <text x="152" y="12" fontSize="8" fill="#35C759" fontFamily="monospace">
                  NOW
                </text>
                <line x1="0" y1="95" x2="200" y2="100" stroke="#1b293a" strokeWidth="0.8" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <Label>Next Step</Label>
          </CardHeader>
          <div className="p-4 space-y-3">
            <p className="text-[11px] text-[#8B98A7] leading-relaxed">
              Object approaching virtual fence boundary. Simulate zone entry to trigger perimeter
              detection.
            </p>
            <NextBtn label="Simulate Zone Entry" onClick={() => setScreen("breach")} />
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── SCREEN 4: VIRTUAL FENCE BREACH ──────────────────────────────────────────

function VirtualFenceBreach({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="flex gap-4 p-4 h-full overflow-hidden">
      <Card className="flex-[3] overflow-hidden flex flex-col min-w-0 min-h-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Label>CAM-01 — BORDER OUTPOST</Label>
            <Badge label="ZONE BREACHED" variant="critical" />
          </div>
          <div className="flex items-center gap-1.5">
            <StatusDot color="#FF4D4F" pulse />
            <span className="text-[10px] font-bold tracking-widest text-[#FF4D4F]">LIVE</span>
          </div>
        </CardHeader>
        <div className="flex-1 overflow-hidden min-h-0">
          <CCTVFeed showPerson showTracking showZone zoneBreached />
        </div>
      </Card>

      <div className="flex flex-col gap-4 w-64 flex-shrink-0 min-h-0">
        <Card className="border-[#FF4D4F]/35 flex-shrink-0">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={14} className="text-[#FF4D4F] flex-shrink-0" />
              <span className="text-[10px] font-bold tracking-[1.5px] text-[#FF4D4F]">
                FENCE BREACH DETECTED
              </span>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Zone", val: "RESTRICTED ZONE" },
                { label: "Object", val: "PERSON #07" },
                { label: "Camera", val: "CAM-01" },
                { label: "Confidence", val: "94%" },
                { label: "Timestamp", val: "02:14:32" },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-start">
                  <span className="text-[11px] text-[#8B98A7]">{label}</span>
                  <span className="text-[11px] font-semibold text-[#F5F7FA]">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <Label>Alert Status</Label>
          </CardHeader>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <StatusDot color="#FF4D4F" pulse />
              <span className="text-[11px] font-bold text-[#FF4D4F]">CRITICAL EVENT GENERATED</span>
            </div>
            <p className="text-[11px] text-[#8B98A7] leading-relaxed">
              Person detected crossing restricted perimeter. Priority alert dispatched to operator.
            </p>
            <NextBtn label="View Security Alert" onClick={() => setScreen("alert")} />
          </div>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <Label>Fence Configuration</Label>
          </CardHeader>
          <div className="p-4 space-y-2.5">
            {[
              { label: "Zone Name", val: "ZONE-ALPHA" },
              { label: "Type", val: "RESTRICTED" },
              { label: "Sensitivity", val: "HIGH" },
              { label: "Camera", val: "CAM-01" },
              { label: "Status", val: "ACTIVE" },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between">
                <span className="text-[11px] text-[#8B98A7]">{label}</span>
                <span className="text-[11px] font-semibold text-[#F5F7FA]">{val}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── SCREEN 5: SECURITY ALERT ─────────────────────────────────────────────────

function SecurityAlert({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="flex gap-4 p-4 h-full overflow-hidden">
      {/* Evidence */}
      <div className="flex flex-col gap-4 flex-[2] min-w-0 min-h-0">
        <Card className="flex-1 overflow-hidden flex flex-col min-h-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Label>Evidence Keyframe</Label>
              <span className="text-[10px] font-mono text-[#576475]">02:14:32</span>
            </div>
            <Badge label="BREACH EVENT" variant="critical" />
          </CardHeader>
          <div className="flex-1 overflow-hidden min-h-0">
            <CCTVFeed showPerson showTracking showZone zoneBreached />
          </div>
        </Card>
        <Card className="flex-shrink-0">
          <div className="px-4 py-3">
            <p className="text-[12px] text-[#8B98A7] leading-relaxed">
              Person detected crossing restricted perimeter at CAM-01 Border Outpost. AI tracking
              confidence 94%. Virtual fence breach event logged and priority alert dispatched to
              operator.
            </p>
          </div>
        </Card>
      </div>

      {/* Alert panel */}
      <div className="flex flex-col gap-4 w-72 flex-shrink-0 min-h-0">
        <Card className="border-[#FF4D4F]/35 flex-shrink-0">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#FF4D4F] animate-pulse flex-shrink-0" />
              <span className="text-[10px] font-bold tracking-[2.5px] text-[#FF4D4F]">
                CRITICAL EVENT
              </span>
            </div>
            <h2 className="text-[20px] font-bold text-[#F5F7FA] mb-5 mt-1 tracking-tight">
              INTRUSION DETECTED
            </h2>
            <div className="space-y-3 mb-5">
              {[
                { label: "Camera", val: "CAM-01 — BORDER OUTPOST" },
                { label: "Object", val: "PERSON #07" },
                { label: "Zone", val: "RESTRICTED ZONE" },
                { label: "Confidence", val: "94%" },
                { label: "Timestamp", val: "02:14:32" },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-start gap-4">
                  <span className="text-[11px] text-[#8B98A7] flex-shrink-0">{label}</span>
                  <span className="text-[11px] font-semibold text-[#F5F7FA] text-right">{val}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#26313D] mb-4" />
            <div className="space-y-2">
              <button
                onClick={() => setScreen("details")}
                className="w-full py-2.5 rounded text-[12px] font-bold tracking-[1px] border border-[#FF4D4F]/50 text-[#FF4D4F] hover:bg-[#FF4D4F]/10 transition-colors cursor-pointer"
              >
                VIEW EVENT
              </button>
              <button className="w-full py-2.5 rounded text-[12px] font-bold tracking-[1px] bg-[#161E27] border border-[#26313D] text-[#8B98A7] hover:text-[#F5F7FA] transition-colors cursor-pointer">
                ACKNOWLEDGE
              </button>
            </div>
          </div>
        </Card>

        <Card className="border-[#FF4D4F]/20 flex-shrink-0">
          <CardHeader>
            <Label>Active Alerts</Label>
            <AlertTriangle size={13} className="text-[#FF4D4F]" />
          </CardHeader>
          <div className="p-4">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-[#FF4D4F]">01</span>
              <span className="text-[10px] text-[#576475]">CRITICAL</span>
            </div>
            <div className="space-y-2">
              {[
                { label: "Critical", count: 1, color: "#FF4D4F" },
                { label: "Warning", count: 1, color: "#F5B942" },
                { label: "Info", count: 0, color: "#8B98A7" },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: color }}
                    />
                    <span className="text-[11px] text-[#8B98A7]">{label}</span>
                  </div>
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: count > 0 ? color : "#3a4552" }}
                  >
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <Label>System Health</Label>
            <CheckCircle size={13} className="text-[#35C759]" />
          </CardHeader>
          <div className="p-4 space-y-3">
            <HealthRow label="CCTV Stream" icon={Camera} />
            <HealthRow label="AI Engine" icon={Cpu} />
            <HealthRow label="Event Engine" icon={Activity} />
            <HealthRow label="Database" icon={Database} />
          </div>
        </Card>
      </div>
    </div>
  );

}

// ─── SCREEN 6: EVENT DETAILS ──────────────────────────────────────────────────
function EventDetails({ setScreen, cameraId }: { setScreen: (s: Screen) => void; cameraId?: string }) {
  return (
    <div className="flex gap-4 p-4 h-full overflow-hidden">
      {/* Left */}
      <div className="flex flex-col gap-4 flex-[3] min-w-0 min-h-0">
        <Card className="flex-1 overflow-hidden flex flex-col min-h-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Label>Event View — {cameraId}</Label>
              <Badge label="INTRUSION — OPEN" variant="critical" />
            </div>
            <button
              onClick={() => setScreen("command")}
              className="flex items-center gap-1.5 text-[11px] text-[#8B98A7] hover:text-[#F5F7FA] transition-colors cursor-pointer"
            >
              <ArrowLeft size={11} />
              Command Center
            </button>
          </CardHeader>
          <div className="flex-1 overflow-hidden min-h-0">
            <CCTVFeed showPerson showTracking showZone zoneBreached />
          </div>
          <EventPlaybackControls />
        </Card>

      </div>

      {/* Right */}
      <div className="flex flex-col gap-4 w-64 flex-shrink-0 min-h-0 overflow-y-auto">
        <Card className="flex-shrink-0">
          <CardHeader>
            <Label>Event Timeline</Label>
            <Clock size={13} className="text-[#576475]" />
          </CardHeader>
          <div className="p-4">
            {[
              { time: "02:14:18", event: "Person detected", color: "#35C759", Icon: Eye },
              { time: "02:14:25", event: "Tracking initiated", color: "#35C759", Icon: Crosshair },
              { time: "02:14:32", event: "Restricted zone crossed", color: "#F5B942", Icon: MapPin },
              { time: "02:14:32", event: "Critical alert generated", color: "#FF4D4F", Icon: AlertCircle },
            ].map(({ time, event, color, Icon }, i, arr) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    <Icon size={10} style={{ color }} />
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      className="w-px flex-1 my-1"
                      style={{ background: "#26313D", minHeight: "16px" }}
                    />
                  )}
                </div>
                <div className={i < arr.length - 1 ? "pb-4" : ""}>
                  <div className="text-[10px] font-mono text-[#576475] mb-0.5">{time}</div>
                  <div className="text-[12px] font-medium text-[#F5F7FA]">{event}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex-shrink-0">
          <CardHeader>
            <Label>Event Record</Label>
          </CardHeader>
          <div className="p-4 space-y-2.5">
            {[
              { label: "Event ID", val: "EVT-240101-007" },
              { label: "Camera", val: "CAM-01" },
              { label: "Zone", val: "ZONE-ALPHA" },
              { label: "Object", val: "PERSON #07" },
              { label: "Confidence", val: "94%" },
              { label: "Status", val: "OPEN" },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between">
                <span className="text-[11px] text-[#8B98A7]">{label}</span>
                <span className="text-[11px] font-semibold text-[#F5F7FA]">{val}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex-shrink-0">
          <CardHeader>
            <Label>System Health</Label>
            <CheckCircle size={13} className="text-[#35C759]" />
          </CardHeader>
          <div className="p-4 space-y-2.5">
            <HealthRow label="CCTV Stream" icon={Camera} />
            <HealthRow label="AI Engine" icon={Cpu} />
            <HealthRow label="Event Engine" icon={Activity} />
            <HealthRow label="Database" icon={Database} />
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("command");
  const [selectedCamera, setSelectedCamera] = useState("CAM-01");
  const [time, setTime] = useState(new Date());
  const [showSplash, setShowSplash] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-GB", { hour12: false });
  const dateStr = time.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });


  return (
    <>

      {showSplash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F14]">
          <h1 className="text-4xl font-bold text-white">AVEIS</h1>
        </div>
      )}

      <div
        className="flex min-h-screen overflow-y-auto"
        style={{ background: "#0B0F14", color: "#F5F7FA", fontFamily: "Inter, sans-serif" }}
      >
        <Sidebar
          screen={screen}
          setScreen={setScreen}
          showDashboard={showDashboard}
          onCloseDashboard={() => setShowDashboard(false)}
        />

        <div className="flex flex-col flex-1 min-w-0">
          <TopBar screen={screen} timeStr={timeStr} dateStr={dateStr} />

          <div className="flex-1 overflow-hidden min-h-0">
            {screen === "command" && <CommandCenter setScreen={setScreen} />}
            {screen === "surveillance" && <LiveSurveillance setScreen={setScreen} />}
            {screen === "tracking" && <ObjectTracking setScreen={setScreen} />}
            {screen === "breach" && <VirtualFenceBreach setScreen={setScreen} />}
            {screen === "alert" && <SecurityAlert setScreen={setScreen} />}
            {screen === "details" && <EventDetails setScreen={setScreen} cameraId={selectedCamera} />}
            {screen === "multi-camera" && <MultiCameraGrid setScreen={setScreen} setSelectedCamera={setSelectedCamera} />}
            {screen === "settings" && (
              <SettingsScreen setScreen={setScreen} onOpenDashboard={() => setShowDashboard(true)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
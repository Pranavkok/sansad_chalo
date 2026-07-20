import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

/*
 * The shareable protest card. This is the single most viral surface of the
 * site — it must match the poster language of the homepage exactly:
 * ink black + acid yellow + alarm red, Anton display type, halftone dots,
 * hard borders, rotated "verified" stamp.
 *
 * Palette = globals.css oklch tokens converted to sRGB hex (Satori needs hex):
 *   ink #080706 · card #110f0d · fg #f6f5ee · muted #9b9891
 *   acid #ecf423 · alarm #ea2221
 */

const INK = "#080706";
const FG = "#f6f5ee";
const MUTED = "#9b9891";
const ACID = "#ecf423";
const ALARM = "#ea2221";

// Load fonts once per server process, not per request.
let fontsPromise: Promise<{ anton: Buffer; mono: Buffer; monoBold: Buffer }> | null = null;
function loadFonts() {
  fontsPromise ??= (async () => {
    const dir = join(process.cwd(), "assets", "fonts");
    const [anton, mono, monoBold] = await Promise.all([
      readFile(join(dir, "Anton-Regular.ttf")),
      readFile(join(dir, "JetBrainsMono-Medium.ttf")),
      readFile(join(dir, "JetBrainsMono-Bold.ttf")),
    ]);
    return { anton, mono, monoBold };
  })();
  return fontsPromise;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user || !user.supporterNumber) {
    return new Response("Not found", { status: 404 });
  }

  const { anton, mono, monoBold } = await loadFonts();

  const formattedNumber = String(user.supporterNumber).padStart(6, "0");
  const firstName = (user.name || "A Supporter").trim();
  const initial = firstName.charAt(0).toUpperCase() || "✊";

  const url = new URL(req.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const profileUrl = `${baseUrl}/user/${user.id}`;
  // Acid-on-ink QR so even the code looks like part of the poster.
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    profileUrl
  )}&bgcolor=ecf423&color=080706&margin=1`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: INK,
          color: FG,
          fontFamily: "Anton",
          border: `10px solid ${FG}`,
        }}
      >
        {/* Main poster area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
            padding: "40px 48px 28px",
            position: "relative",
            // Halftone dot field, same as the site background
            backgroundImage: `radial-gradient(circle at 10px 10px, #262319 2px, transparent 2.5px)`,
            backgroundSize: "26px 26px",
          }}
        >
          {/* Top row: event chip + place/date */}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: ACID,
                color: INK,
                fontSize: "34px",
                padding: "8px 20px",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              ✊ Sansad Chalo
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains Mono",
                fontSize: "22px",
                color: MUTED,
                letterSpacing: "0.2em",
              }}
            >
              20 JULY · NEW DELHI
            </div>
          </div>

          {/* Middle: photo + name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "36px",
            }}
          >
            {/* Profile photo — hard border, slight tilt, alarm offset shadow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "190px",
                height: "190px",
                border: `6px solid ${FG}`,
                backgroundColor: ACID,
                transform: "rotate(-3deg)",
                boxShadow: `10px 10px 0 ${ALARM}`,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt=""
                  width={190}
                  height={190}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    fontSize: "110px",
                    color: INK,
                  }}
                >
                  {initial}
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontFamily: "JetBrains Mono",
                  fontSize: "20px",
                  color: ALARM,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                I march for clean exams
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: firstName.length > 18 ? "64px" : "84px",
                  lineHeight: 1.05,
                  textTransform: "uppercase",
                  marginTop: "6px",
                  maxWidth: "780px",
                }}
              >
                {firstName}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginTop: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontFamily: "JetBrains Mono",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: INK,
                    backgroundColor: FG,
                    padding: "4px 14px",
                    letterSpacing: "0.1em",
                  }}
                >
                  SUPPORTER #{formattedNumber}
                </div>
                <div
                  style={{
                    display: "flex",
                    border: `3px solid ${ALARM}`,
                    color: ALARM,
                    fontFamily: "JetBrains Mono",
                    fontWeight: 700,
                    fontSize: "18px",
                    padding: "4px 12px",
                    letterSpacing: "0.15em",
                    transform: "rotate(-2deg)",
                    textTransform: "uppercase",
                  }}
                >
                  Verified ✔
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row: giant number + QR */}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontFamily: "JetBrains Mono",
                  fontSize: "18px",
                  color: MUTED,
                  letterSpacing: "0.25em",
                }}
              >
                THEY CAN&apos;T IGNORE US ALL
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "150px",
                  lineHeight: 0.95,
                  color: ACID,
                }}
              >
                #{formattedNumber}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "120px",
                  height: "120px",
                  border: `4px solid ${FG}`,
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt=""
                  width={112}
                  height={112}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily: "JetBrains Mono",
                  fontSize: "14px",
                  color: MUTED,
                  letterSpacing: "0.2em",
                }}
              >
                SCAN TO JOIN
              </div>
            </div>
          </div>
        </div>

        {/* Acid slogan strip along the bottom, like the site ticker */}
        <div
          style={{
            display: "flex",
            backgroundColor: ACID,
            color: INK,
            padding: "10px 0",
            fontSize: "26px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            justifyContent: "center",
            gap: "28px",
            borderTop: `6px solid ${FG}`,
          }}
        >
          <span>Our exams. Our future.</span>
          <span>✊</span>
          <span>Answer us</span>
          <span>✊</span>
          <span>#SansadChalo</span>
          <span>✊</span>
          <span>20 July</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Anton", data: anton, style: "normal", weight: 400 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 500 },
        { name: "JetBrains Mono", data: monoBold, style: "normal", weight: 700 },
      ],
    }
  );
}

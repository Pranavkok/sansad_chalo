import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

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

  const formattedNumber = String(user.supporterNumber).padStart(6, '0');
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Base URL for QR code, assuming standard https:// or dev url from request
  const url = new URL(req.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const profileUrl = `${baseUrl}/user/${user.id}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(profileUrl)}&bgcolor=171717&color=ffffff&margin=0`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a", // Tailwind background
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Subtle Background Glow/Gradient */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: "40px", fontWeight: "bold", letterSpacing: "-0.02em" }}>
            ViralProtest
          </div>
          <div style={{ display: "flex", fontSize: "24px", color: "#a3a3a3", fontWeight: "500" }}>
            OFFICIAL SUPPORTER
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "160px", height: "160px", borderRadius: "50%", overflow: "hidden", border: "4px solid #262626" }}>
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} 
              alt="Profile" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ fontSize: "56px", fontWeight: "800", letterSpacing: "-0.02em" }}>
              {user.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex", fontSize: "32px", fontFamily: "monospace", color: "#a3a3a3", backgroundColor: "#171717", padding: "8px 24px", borderRadius: "8px", border: "1px solid #262626" }}>
                {`#${formattedNumber}`}
              </div>
              <div style={{ display: "flex", fontSize: "24px", color: "#737373" }}>
                {`Joined ${joinedDate}`}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
             <div style={{ fontSize: "32px", fontWeight: "bold", letterSpacing: "-0.01em" }}>
              #SansadChalo
            </div>
            <div style={{ fontSize: "20px", color: "#737373" }}>
              CJP Protest • July 20, 2026
            </div>
          </div>
          
          <div style={{ display: "flex", width: "120px", height: "120px", borderRadius: "12px", overflow: "hidden", border: "2px solid #262626" }}>
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={qrUrl} alt="QR Code" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

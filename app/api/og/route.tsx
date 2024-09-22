import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Default Title";
    const screenshotUrl = searchParams.get("screenshot");
    const date =
      searchParams.get("date") || new Date().toISOString().split("T")[0];
    const isDarkMode = searchParams.get("dark") === "true";
    const isTwitter = searchParams.get("twitter") === "true";

    if (!screenshotUrl) {
      return new Response("Screenshot URL is required", { status: 400 });
    }

    // Twitter requires a 2:1 aspect ratio
    const width = isTwitter ? 1200 : 1200;
    const height = isTwitter ? 600 : 630;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            backgroundImage: `url(${"http://localhost:3000/screenshot/homepage.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "20px",
              width: "100%",
              background: isDarkMode
                ? "rgba(0, 0, 0, 0.7)"
                : "rgba(255, 255, 255, 0.7)",
            }}
          >
            <h1
              style={{
                fontSize: isTwitter ? "36px" : "48px",
                fontWeight: "bold",
                color: isDarkMode ? "#f8fafc" : "#0f172a",
                marginBottom: "10px",
              }}
            >
              {title}
            </h1>
            <div
              style={{
                fontSize: isTwitter ? "18px" : "24px",
                color: isDarkMode ? "#94a3b8" : "#64748b",
              }}
            >
              {date}
            </div>
          </div>
        </div>
      ),
      {
        width,
        height,
      },
    );
  } catch (error) {
    console.error("Error generating image response:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

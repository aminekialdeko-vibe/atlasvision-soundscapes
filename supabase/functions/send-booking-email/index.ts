import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface BookingRequest {
  eventName: string;
  eventDate: string;
  venue: string;
  performanceType: string;
  duration: string;
  technicalInfo: string;
  logisticsInfo: string;
  budget: string;
  message: string;
}

const performanceTypeLabels: Record<string, string> = {
  "dj-set": "DJ Set",
  "live": "Live Performance",
  "workshop": "Workshop",
};

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: BookingRequest = await req.json();

    // Validate required fields
    if (!body.eventName || !body.eventDate || !body.venue || !body.performanceType || !body.duration) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const performanceLabel = performanceTypeLabels[body.performanceType] || body.performanceType;

    // Build email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #1a1a2e; color: #e8e0d5;">
        <div style="background: linear-gradient(135deg, #c9922c 0%, #a3541a 50%, #553c7e 100%); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 28px;">New Booking Request – Atlas Vision</h1>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #c9922c; border-bottom: 2px solid #c9922c; padding-bottom: 10px; margin-top: 0;">
            📋 Event Details
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #a89a8a; width: 40%;">Event Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #e8e0d5;">${body.eventName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #a89a8a;">Date</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #e8e0d5;">${body.eventDate}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #a89a8a;">Venue / Location</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #e8e0d5;">${body.venue}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #a89a8a;">Performance Type</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #e8e0d5;">${performanceLabel}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #a89a8a;">Duration</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #e8e0d5;">${body.duration}</td>
            </tr>
            ${body.budget ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #a89a8a;">Budget / Fee</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #e8e0d5;">${body.budget}</td>
            </tr>
            ` : ""}
          </table>
          
          ${body.technicalInfo ? `
          <h2 style="color: #c9922c; border-bottom: 2px solid #c9922c; padding-bottom: 10px;">
            🔧 Technical Information
          </h2>
          <div style="background: #252540; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; color: #e8e0d5;">${body.technicalInfo}</p>
          </div>
          ` : ""}
          
          ${body.logisticsInfo ? `
          <h2 style="color: #c9922c; border-bottom: 2px solid #c9922c; padding-bottom: 10px;">
            🚚 Logistics Information
          </h2>
          <div style="background: #252540; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; color: #e8e0d5;">${body.logisticsInfo}</p>
          </div>
          ` : ""}
          
          ${body.message ? `
          <h2 style="color: #c9922c; border-bottom: 2px solid #c9922c; padding-bottom: 10px;">
            💬 Additional Message
          </h2>
          <div style="background: #252540; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; color: #e8e0d5;">${body.message}</p>
          </div>
          ` : ""}
          
          <p style="color: #a89a8a; font-size: 12px; margin-top: 30px; text-align: center;">
            This booking request was sent from the Atlas Vision website.
          </p>
        </div>
      </div>
    `;

    // Send email to aminekialdeko@gmail.com
    const emailResponse = await resend.emails.send({
      from: "Atlas Vision Booking <onboarding@resend.dev>",
      to: ["atlasvision.soundscapes@gmail.com"],
      subject: `New Booking Request – Atlas Vision | ${body.eventName}`,
      html: emailHtml,
    });

    console.log("Booking email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Booking request sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error sending booking email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});

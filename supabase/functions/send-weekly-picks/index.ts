import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendResendEmail } from "../_shared/resend.ts";
import { renderNamedTemplate } from "../_shared/emailTemplates.ts";
import { getTestEmail, matchesTestEmail } from "../_shared/testEmail.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const testEmail = await getTestEmail(req);
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: prefs } = await supabase
    .from("newsletter_preferences")
    .select("user_id, enabled, weekly_picks_enabled");

  const prefMap = new Map(
    (prefs || []).map((p: { user_id: string; enabled: boolean; weekly_picks_enabled: boolean }) => [p.user_id, p])
  );

  const { data: featured } = await supabase
    .from("books")
    .select("id, title, author, description")
    .eq("is_featured", true)
    .gt("available_qty", 0)
    .limit(5);

  const fallback = await supabase
    .from("books")
    .select("id, title, author")
    .gt("available_qty", 0)
    .limit(1);

  const pick =
    featured?.[Math.floor(Math.random() * (featured?.length || 1))] ||
    fallback.data?.[0];

  if (!pick) {
    return new Response(JSON.stringify({ error: "no books" }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const { data: users } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("role", "aluno");

  let sent = 0;
  const errors: unknown[] = [];

  const recipients = (users || []).filter((u) =>
    testEmail ? matchesTestEmail(u.email, testEmail) : true
  );

  if (testEmail && recipients.length === 0) {
    return new Response(
      JSON.stringify({
        sent: 0,
        testEmail,
        error: "no_profile_with_that_email",
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }

  for (const u of recipients) {
    const pref = prefMap.get(u.id) as { enabled?: boolean; weekly_picks_enabled?: boolean } | undefined;
    if (pref?.enabled === false || pref?.weekly_picks_enabled === false) continue;

    if (!u.email) continue;

    const rendered = renderNamedTemplate("weekly_pick", {
      pickTitle: pick.title,
      pickAuthor: pick.author,
      bookTitle: String(pick.id),
    });

    const result = await sendResendEmail({
      to: u.email,
      subject: rendered.subject,
      html: rendered.html,
    });

    if (!result.ok) {
      errors.push(result.error);
      continue;
    }
    sent++;
  }

  return new Response(
    JSON.stringify({ sent, book: pick.title, errors, testEmail: testEmail ?? undefined }),
    {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    },
  );
});

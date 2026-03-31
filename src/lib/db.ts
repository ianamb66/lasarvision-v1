import { supabase } from "./supabase";

export async function getRole(): Promise<"user" | "editor" | "admin" | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error) return null;
  return (data?.role as any) ?? "user";
}

export async function listIndustries() {
  return supabase.from("industries").select("id,name").order("name");
}

export async function listCountries() {
  return supabase.from("countries").select("id,code,name").order("name");
}

export async function listInsights(params?: {
  country_id?: string;
  industry_id?: string;
  topic?: string;
}) {
  let q = supabase
    .from("insights")
    .select(
      "id,title,takeaway,why_it_matters,topic,chart_type,chart_series_label,chart_data,sources,status,industries(name),countries(name)"
    )
    .order("created_at", { ascending: false });

  if (params?.country_id) q = q.eq("country_id", params.country_id);
  if (params?.industry_id) q = q.eq("industry_id", params.industry_id);
  if (params?.topic) q = q.eq("topic", params.topic);

  return q;
}

export async function listOpportunities() {
  return supabase
    .from("opportunities")
    .select("id,title,description,risk,irr,status,industries(name),countries(name)")
    .order("created_at", { ascending: false });
}

export async function createOpportunity(input: {
  title: string;
  description?: string;
  risk?: string;
  irr?: number;
  industry_id?: string | null;
  country_id?: string | null;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("not_authenticated");

  return supabase.from("opportunities").insert({
    ...input,
    created_by: user.id,
  });
}

export async function createOrder(input: {
  opportunity_id?: string | null;
  amount: number;
  currency: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("not_authenticated");

  return supabase.from("orders").insert({
    user_id: user.id,
    opportunity_id: input.opportunity_id ?? null,
    amount: input.amount,
    currency: input.currency,
    status: "submitted",
  });
}

export async function listOrders() {
  return supabase
    .from("orders")
    .select(
      "id,amount,currency,status,created_at,opportunities(title),opportunities(countries(name)),opportunities(industries(name))"
    )
    .order("created_at", { ascending: false });
}

export async function createLead(input: {
  partner_id?: string | null;
  opportunity_id?: string | null;
  message?: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("not_authenticated");

  return supabase.from("leads")
    .insert({
      user_id: user.id,
      partner_id: input.partner_id ?? null,
      opportunity_id: input.opportunity_id ?? null,
      message: input.message ?? "",
    });
}

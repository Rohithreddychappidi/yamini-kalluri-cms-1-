import { createClient } from "@/utils/supabase/server";

export async function getSiteSettings() {
  const supabase = createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  return data;
}

export async function getPage(slug) {
  const supabase = createClient();
  const { data } = await supabase.from("pages").select("content").eq("slug", slug).single();
  return data?.content || {};
}

export async function getWritings() {
  const supabase = createClient();
  const { data } = await supabase
    .from("writings")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  return data || [];
}

export async function getWritingBySlug(slug) {
  const supabase = createClient();
  const { data } = await supabase.from("writings").select("*").eq("slug", slug).single();
  return data;
}

export async function getGalleryItems() {
  const supabase = createClient();
  const { data } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true });
  return data || [];
}

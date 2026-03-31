-- Laservision v1 schema (Supabase/Postgres)

-- Extensions
create extension if not exists pgcrypto;

-- Profiles linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user','editor','admin')),
  created_at timestamptz not null default now()
);

-- Industries, Countries
create table if not exists public.industries (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.countries (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

-- Insight cards
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  takeaway text not null,
  why_it_matters text not null,
  topic text not null,
  industry_id uuid references public.industries(id) on delete set null,
  country_id uuid references public.countries(id) on delete set null,
  chart_type text not null,
  chart_series_label text not null,
  chart_data jsonb not null,
  sources jsonb,
  status text not null default 'draft' check (status in ('draft','published')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Partners
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  country_id uuid references public.countries(id) on delete set null,
  industry_id uuid references public.industries(id) on delete set null,
  website text,
  created_at timestamptz not null default now()
);

-- Opportunities
create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  risk text,
  irr numeric,
  country_id uuid references public.countries(id) on delete set null,
  industry_id uuid references public.industries(id) on delete set null,
  status text not null default 'active' check (status in ('active','inactive')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Orders ("Invest")
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  opportunity_id uuid references public.opportunities(id) on delete set null,
  amount numeric not null,
  currency text not null default 'usd',
  status text not null default 'created' check (status in ('created','submitted','approved','rejected')),
  created_at timestamptz not null default now()
);

-- Leads / contact requests
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  partner_id uuid references public.partners(id) on delete set null,
  opportunity_id uuid references public.opportunities(id) on delete set null,
  message text,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now()
);

-- ---------
-- RLS
-- ---------
alter table public.profiles enable row level security;
alter table public.industries enable row level security;
alter table public.countries enable row level security;
alter table public.insights enable row level security;
alter table public.partners enable row level security;
alter table public.opportunities enable row level security;
alter table public.orders enable row level security;
alter table public.leads enable row level security;

-- helper: is_admin
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = uid and p.role = 'admin'
  );
$$;

-- profiles: user can read own; admin can read all
create policy "profiles_read_own" on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin(auth.uid()));

create policy "profiles_upsert_own" on public.profiles
for insert
to authenticated
with check (id = auth.uid());

create policy "profiles_update_own" on public.profiles
for update
to authenticated
using (id = auth.uid() or public.is_admin(auth.uid()))
with check (id = auth.uid() or public.is_admin(auth.uid()));

-- industries/countries: readable by all authenticated; writable by admin
create policy "industries_read" on public.industries
for select
to authenticated
using (true);
create policy "industries_write_admin" on public.industries
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "countries_read" on public.countries
for select
to authenticated
using (true);
create policy "countries_write_admin" on public.countries
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- insights: published readable by authenticated; drafts only admin/editor/owner
create policy "insights_read_published" on public.insights
for select
to authenticated
using (status = 'published' or public.is_admin(auth.uid()) or created_by = auth.uid());

create policy "insights_write_admin" on public.insights
for insert
to authenticated
with check (public.is_admin(auth.uid()));
create policy "insights_update_admin" on public.insights
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- partners/opportunities: readable by authenticated; writable by admin
create policy "partners_read" on public.partners
for select to authenticated
using (true);
create policy "partners_write_admin" on public.partners
for all to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "opportunities_read" on public.opportunities
for select to authenticated
using (true);
create policy "opportunities_write_admin" on public.opportunities
for all to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- orders: user can manage own; admin can see all
create policy "orders_read_own" on public.orders
for select to authenticated
using (user_id = auth.uid() or public.is_admin(auth.uid()));

create policy "orders_insert_own" on public.orders
for insert to authenticated
with check (user_id = auth.uid());

create policy "orders_update_own" on public.orders
for update to authenticated
using (user_id = auth.uid() or public.is_admin(auth.uid()))
with check (user_id = auth.uid() or public.is_admin(auth.uid()));

-- leads: user can create; read own; admin read all
create policy "leads_read_own" on public.leads
for select to authenticated
using (user_id = auth.uid() or public.is_admin(auth.uid()));

create policy "leads_insert" on public.leads
for insert to authenticated
with check (user_id = auth.uid());

create policy "leads_update_admin" on public.leads
for update to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

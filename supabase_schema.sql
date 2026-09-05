-- ZORIX persistent multi-user foundation.
-- Run in Supabase SQL Editor. Review legal/compliance requirements before accepting real funds.
create table if not exists public.activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('Deposit','Withdraw','Staking','KYC')),
  amount numeric(30,6) not null default 0 check (amount >= 0),
  tx text not null,
  status text not null check (status in ('Pending','Approved','Active','Completed','Rejected')),
  address text,
  plan text,
  note text,
  created_at timestamptz not null default now()
);
create index if not exists activity_user_created on public.activity(user_id, created_at desc);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.activity enable row level security;
alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.profiles p where p.id=auth.uid() and p.is_admin=true); $$;

drop policy if exists "activity own read" on public.activity;
drop policy if exists "activity own insert" on public.activity;
drop policy if exists "admin activity update" on public.activity;
drop policy if exists "profile own read" on public.profiles;

create policy "activity own read" on public.activity for select using (user_id=auth.uid() or public.is_admin());
create policy "activity own insert" on public.activity for insert with check (user_id=auth.uid());
create policy "admin activity update" on public.activity for update using (public.is_admin()) with check (public.is_admin());
create policy "profile own read" on public.profiles for select using (id=auth.uid() or public.is_admin());

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public
as $$ begin insert into public.profiles(id,email) values(new.id,new.email) on conflict (id) do nothing; return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- After creating your own admin account, run:
-- update public.profiles set is_admin=true where email='YOUR-ADMIN-EMAIL';

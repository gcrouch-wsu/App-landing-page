alter table "site_settings"
add column if not exists "header_title_size_px" integer not null default 28;

CREATE TABLE IF NOT EXISTS "site_settings" (
	"id" smallint PRIMARY KEY DEFAULT 1,
	"brand_line1" text NOT NULL DEFAULT 'WSU',
	"brand_line2" text NOT NULL DEFAULT 'Grad',
	"header_title" text NOT NULL DEFAULT 'Graduate School Tools',
	"header_subtitle" text NOT NULL DEFAULT 'Internal directory',
	"hero_title" text NOT NULL DEFAULT 'Applications',
	"hero_lede" text NOT NULL DEFAULT 'This page is public. Editors sign in with Admin login to add links, descriptions, and ordering.',
	"empty_state_text" text NOT NULL DEFAULT 'No applications yet. Sign in with Admin login to add cards.',
	"manage_add_title" text NOT NULL DEFAULT 'Add application',
	"manage_add_blurb" text NOT NULL DEFAULT 'Titles and URLs appear on the public page. Descriptions are optional. Drag cards in the frame below to set order; changes save automatically.',
	"manage_order_title" text NOT NULL DEFAULT 'Card order',
	"manage_order_blurb" text NOT NULL DEFAULT 'Drag by the handle. Order matches the public landing page.',
	"manage_empty_drag_text" text NOT NULL DEFAULT 'No cards yet. Add one above.',
	"login_title" text NOT NULL DEFAULT 'Admin sign in',
	"login_lede" text NOT NULL DEFAULT 'Enter the shared admin password to manage application cards. The public directory is on the home page.',
	"login_back_label" text NOT NULL DEFAULT '← Back to directory',
	"color_primary" text NOT NULL DEFAULT '#981e32',
	"color_primary_dark" text NOT NULL DEFAULT '#6d1524',
	"color_text" text NOT NULL DEFAULT '#393939',
	"color_text_muted" text NOT NULL DEFAULT '#5e6a71',
	"color_border" text NOT NULL DEFAULT '#e2e2e2',
	"color_page_bg" text NOT NULL DEFAULT '#f7f5f5',
	"color_card_bg" text NOT NULL DEFAULT '#ffffff',
	"color_card_accent" text NOT NULL DEFAULT '#981e32',
	"color_url_on_card" text NOT NULL DEFAULT '#981e32',
	"card_radius_px" integer NOT NULL DEFAULT 10,
	"card_shadow" text NOT NULL DEFAULT 'md',
	"updated_at" timestamp with time zone DEFAULT now()
);

INSERT INTO "site_settings" ("id") VALUES (1)
ON CONFLICT ("id") DO NOTHING;

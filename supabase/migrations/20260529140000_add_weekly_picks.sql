ALTER TABLE public.newsletter_preferences
ADD COLUMN weekly_picks_enabled BOOLEAN NOT NULL DEFAULT true;

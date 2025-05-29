-- Olympiad alumni
CREATE TABLE alumni (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  olympiad VARCHAR(10) NOT NULL,  -- IMO, IPhO, etc.
  medal VARCHAR(10),
  year INT,
  country CHAR(3),
  lat FLOAT,   -- for map
  lng FLOAT,
  education JSONB,  -- array of {institution, start, end, degree}
  publications JSONB,
  socials JSONB     -- {linkedin, twitter, github}
);

-- Talks
CREATE TABLE talks (
  id SERIAL PRIMARY KEY,
  title TEXT,
  guest_name TEXT,
  video_url TEXT,
  published_at DATE DEFAULT CURRENT_DATE
);

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

CREATE TABLE seminars (
  id SERIAL PRIMARY KEY,
  topic TEXT,
  host TEXT,
  date DATE,
  link TEXT
);

CREATE TABLE career_moves (
  id SERIAL PRIMARY KEY,
  alumnus_id INT REFERENCES alumni(id),
  current_city TEXT,
  lat FLOAT,
  lng FLOAT,
  moved_at DATE DEFAULT CURRENT_DATE
);

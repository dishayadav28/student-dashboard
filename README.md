#  Student Dashboard
animated learning dashboard built as a frontend internship assignment.

 Live Demo: https://student-dashboard-gray-rho.vercel.app/



## Tech Stack


Next.js 14 (App Router) Framework 
Supabase ( PostgreSQL database) 
Tailwind CSS (Styling) 
Framer Motion  (Animations)
Lucide React (Icons)  



## Getting Started Locally

### 1. Clone the repo
```bash
git clone https://github.com/your-username/student-dashboard.git
cd student-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in your Supabase project URL and anon key inside `.env.local`.

### 4. Set up Supabase database

Run this SQL in your Supabase project SQL Editor:

```sql
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null,
  icon_name text not null,
  created_at timestamp with time zone default now()
);

alter table courses disable row level security;
grant select on courses to anon;

insert into courses (title, progress, icon_name) values
  ('Introduction to Python', 60, 'Terminal'),
  ('System Design Fundamentals', 42, 'Network'),
  ('UI/UX Design Basics', 35, 'Pencil'),
  ('Database Management', 30, 'Database');
```

### 5. Run the development server
```bash
npm run dev
```

Open http://localhost:3000



## Architecture


## Server vs Client Component Split

Server components:
`app/page.tsx` - Fetches Supabase data at request time. 
`app/layout.tsx` - Static shell.
`app/loading.tsx`-Pure CSS animation, no hooks needed.
`components/SkeletonTile.tsx`-Pure CSS.
`components/ErrorTile.tsx`-Static UI, no interactivity.

Client components:
`components/BentoGrid.tsx`-Uses Framer Motion variants which require browser APIs.
`components/Sidebar.tsx`- Uses useState for collapse state and Framer Motion layoutId.
`components/MobileNav.tsx` -Uses useState for active tab tracking.
`components/HeroTile.tsx`- Uses Framer Motion whileHover.
`components/CourseCard.tsx`-Uses useEffect for progress bar animation timing.
`components/ActivityTile.tsx`- Uses Framer Motion staggered cell animations.


## Challenges Faced

### 1. Tailwind v4 Was Different Than Expected
When the project was created, it automatically installed Tailwind v4 which works completely differently from v3. The usual tailwind.config.ts file does not work in v4. After some research I moved all the theme configuration into globals.css using the @theme directive,and used plain CSS media queries.

### 2. Icons Not Showing Correctly
The course icon names are stored as plain text strings in Supabase. The challenge was turning that text string into an actual React icon component. I solved this by importing all lucide-react icons at once and looking up the right one by name.

### 3. Progress Bar Animation
I wanted the progress bar to animate from 0% to the real value every time the page loads. The tricky part was making sure the animation starts after the card itself has finished appearing on screen.

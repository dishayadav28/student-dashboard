export type Lesson = {
  id: string
  title: string
  minutes: number
  body: string[]
  code?: { lang: string; text: string }
  tip?: string
}

export type Question = {
  q: string
  options: string[]
  answer: number
  explain: string
}

export type CourseContent = { lessons: Lesson[]; quiz: Question[] }

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const ALL_CONTENT: Record<string, CourseContent> = {
  'introduction-to-python': {
    lessons: [
      {
        id: 'variables',
        title: 'Variables and Data Types',
        minutes: 6,
        body: [
          'A variable is a name that points to a value. Python works out the type automatically, so you never declare it.',
          'The four types you will use every day are int, float, str and bool. Use type() to inspect any value.',
        ],
        code: {
          lang: 'python',
          text: `name = "Disha"
age = 21
gpa = 8.7
is_student = True

print(type(age))   # <class 'int'>
print(f"{name} is {age} years old")`,
        },
        tip: 'Use snake_case for variable names. It is the Python convention.',
      },
      {
        id: 'loops',
        title: 'Conditions and Loops',
        minutes: 8,
        body: [
          'if / elif / else lets your program make decisions. Indentation (4 spaces) defines the block, there are no curly braces.',
          'A for loop walks through any sequence. range(n) gives you the numbers 0 up to n-1.',
        ],
        code: {
          lang: 'python',
          text: `for n in range(1, 6):
    if n % 2 == 0:
        print(n, "is even")
    else:
        print(n, "is odd")`,
        },
      },
      {
        id: 'functions',
        title: 'Functions',
        minutes: 7,
        body: [
          'A function packages reusable logic. Define it with def and send a value back with return.',
          'Give parameters a default value to make them optional.',
        ],
        code: {
          lang: 'python',
          text: `def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Disha"))
print(greet("Disha", "Welcome"))`,
        },
        tip: 'A function without a return statement returns None.',
      },
    ],
    quiz: [
      {
        q: 'Which of these is a valid Python variable name?',
        options: ['2nd_value', 'my-value', 'my_value', 'class'],
        answer: 2,
        explain:
          'Names cannot start with a digit, contain hyphens, or be a reserved keyword like class.',
      },
      {
        q: 'What does range(3) produce?',
        options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '3'],
        answer: 1,
        explain: 'range(n) starts at 0 and stops before n.',
      },
      {
        q: 'Which keyword sends a value back from a function?',
        options: ['return', 'print', 'def', 'pass'],
        answer: 0,
        explain: 'return ends the function and hands a value to the caller.',
      },
    ],
  },

  'system-design-fundamentals': {
    lessons: [
      {
        id: 'scalability',
        title: 'Scalability Basics',
        minutes: 6,
        body: [
          'Scaling means handling more users without the system falling over. There are two ways to do it.',
          'Vertical scaling makes one machine bigger. It is simple but has a hard ceiling. Horizontal scaling adds more machines, which is how large systems grow.',
        ],
        code: {
          lang: 'text',
          text: `Vertical scaling   -> bigger machine (more CPU / RAM)
Horizontal scaling -> more machines behind a load balancer`,
        },
      },
      {
        id: 'balancing-caching',
        title: 'Load Balancing and Caching',
        minutes: 8,
        body: [
          'A load balancer spreads incoming requests across servers so none of them gets overloaded.',
          'A cache keeps frequently used data in fast memory so you avoid hitting the database every time.',
        ],
        code: {
          lang: 'text',
          text: `Client -> Load Balancer -> App Server 1
                       -> App Server 2
App Server -> Cache (Redis) -> Database`,
        },
        tip: 'Cache invalidation (knowing when cached data is stale) is the hard part.',
      },
      {
        id: 'cap',
        title: 'CAP Theorem',
        minutes: 7,
        body: [
          'A distributed system can guarantee only two of three things: Consistency, Availability and Partition tolerance.',
          'Network partitions are unavoidable, so in practice you choose between consistency (every read sees the latest write) and availability (every request gets an answer).',
        ],
      },
    ],
    quiz: [
      {
        q: 'Adding more servers to share traffic is called…',
        options: ['Vertical scaling', 'Horizontal scaling', 'Caching', 'Indexing'],
        answer: 1,
        explain: 'Horizontal scaling adds machines instead of upgrading one.',
      },
      {
        q: 'What is the main job of a load balancer?',
        options: [
          'Store data permanently',
          'Spread requests across servers',
          'Compile code',
          'Encrypt passwords',
        ],
        answer: 1,
        explain: 'It distributes traffic so no single server is overloaded.',
      },
      {
        q: 'Which tool is commonly used as an in-memory cache?',
        options: ['Redis', 'MySQL', 'Git', 'Nginx'],
        answer: 0,
        explain: 'Redis keeps data in memory for very fast reads.',
      },
    ],
  },

  'ui-ux-design-basics': {
    lessons: [
      {
        id: 'hierarchy',
        title: 'Visual Hierarchy',
        minutes: 5,
        body: [
          'Visual hierarchy tells users what to look at first. You create it with size, weight, color and spacing.',
          'The most important element should be the most prominent. If everything shouts, nothing gets heard.',
        ],
        tip: 'Squint at your design. Whatever you can still see is your real hierarchy.',
      },
      {
        id: 'contrast',
        title: 'Color and Contrast',
        minutes: 6,
        body: [
          'Text must be easy to read. WCAG AA requires a contrast ratio of at least 4.5:1 for normal text.',
          'Never rely on color alone to carry meaning. Add icons or labels for people with color blindness.',
        ],
        code: {
          lang: 'text',
          text: `Good: #FFFFFF on #1F2937  -> ~14:1
Bad:  #9CA3AF on #FFFFFF  -> ~2.5:1`,
        },
      },
      {
        id: 'heuristics',
        title: 'Usability Heuristics',
        minutes: 8,
        body: [
          "Jakob Nielsen's 10 heuristics are rules of thumb for good interfaces. Three of the most useful are: visibility of system status, user control and freedom, and consistency.",
          'Always show users what is happening (loading states, success messages) and let them undo mistakes.',
        ],
      },
    ],
    quiz: [
      {
        q: 'Minimum contrast ratio for normal text under WCAG AA?',
        options: ['2:1', '3:1', '4.5:1', '10:1'],
        answer: 2,
        explain: 'WCAG AA requires 4.5:1 for normal text and 3:1 for large text.',
      },
      {
        q: 'Which helps create visual hierarchy?',
        options: [
          'Using one size everywhere',
          'Varying size and weight',
          'Adding more colors',
          'Removing all whitespace',
        ],
        answer: 1,
        explain: 'Contrast in size and weight guides the eye.',
      },
      {
        q: 'A loading spinner after clicking Submit follows which heuristic?',
        options: [
          'Visibility of system status',
          'Error prevention',
          'Aesthetic design',
          'Help and documentation',
        ],
        answer: 0,
        explain: 'Users should always know what the system is doing.',
      },
    ],
  },

  'database-management': {
    lessons: [
      {
        id: 'tables-keys',
        title: 'Tables, Rows and Keys',
        minutes: 6,
        body: [
          'A relational database stores data in tables. Each row is a record and each column is an attribute.',
          'A primary key uniquely identifies each row. A foreign key points to a row in another table.',
        ],
        code: {
          lang: 'sql',
          text: `CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);`,
        },
      },
      {
        id: 'select-join',
        title: 'SELECT and JOIN',
        minutes: 8,
        body: [
          'SELECT reads data. WHERE filters rows. JOIN combines rows from related tables using a matching column.',
        ],
        code: {
          lang: 'sql',
          text: `SELECT s.name, c.title
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN courses  c ON c.id = e.course_id
WHERE c.title = 'Intro to SQL';`,
        },
        tip: 'Always filter with WHERE before testing UPDATE or DELETE queries.',
      },
      {
        id: 'normalization',
        title: 'Normalization and Indexes',
        minutes: 7,
        body: [
          'Normalization removes duplicated data by splitting it into related tables, which keeps updates consistent.',
          'An index works like a book index. It makes lookups on a column much faster, at the cost of slightly slower writes.',
        ],
      },
    ],
    quiz: [
      {
        q: 'What uniquely identifies each row in a table?',
        options: ['Foreign key', 'Primary key', 'Index', 'View'],
        answer: 1,
        explain: 'A primary key is unique and not null for every row.',
      },
      {
        q: 'Which clause combines rows from two tables?',
        options: ['GROUP BY', 'ORDER BY', 'JOIN', 'LIMIT'],
        answer: 2,
        explain: 'JOIN matches rows using a related column.',
      },
      {
        q: 'What is the main benefit of an index?',
        options: [
          'Faster lookups',
          'Less disk space',
          'Automatic backups',
          'Stricter data types',
        ],
        answer: 0,
        explain: 'Indexes speed up reads on the indexed column.',
      },
    ],
  },
}

export const getContent = (title: string) => ALL_CONTENT[slugify(title)]
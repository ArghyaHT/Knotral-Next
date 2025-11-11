// src/lib/sanityClient.js
import { createClient } from '@sanity/client';

export const client = createClient({
  // projectId: '0nab0vpu',     // find this in sanity.json or manage.sanity.io
  projectId: "cbna0iwj",
  dataset: 'production',            // or your dataset name
  useCdn: false,
  apiVersion: '2025-06-18',
  // token: "skLv4cxC3QbNkrxS5YPADl1aOOLKQ0wPOD12JOqN1xgIodip03tnVy0E6MMvHfloAlrXIJZvCIl8BTZ08noh0NpDaL9L2mT52FOL09Da8Sh0inHpDbQLKpYv3Q2rvufoDvNZvL5ZpjY2diYxfKXSgRSJvMLnFfq4LETxeogVKbt48yoxMMXl"         // use today's date or your API version
  token: "skbhzg0v25AN0hSjh5eBMZsS8lfWmRUTsHUyaRtg92jVUXKYJkb6XHKxGXqHX44CXiZ7aJeGRnAGTHqzM5swW8KdNabPlTfuiqwAn0TNmMryPCuHymr0yNGNVPWlUCFvw2sNxipJ1Luw3UnNCfLfCxPsL8EaKJ5ZAxeNJJyKzl6TfVNehPd5"
});

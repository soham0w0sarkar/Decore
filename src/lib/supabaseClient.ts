import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and public anon key
const supabaseUrl = 'https://amfbkihpltioaqcquluv.supabase.co';
const supabaseAnonKey = '=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZmJraWhwbHRpb2FxY3F1bHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2MzA1MjUsImV4cCI6MjA0MjIwNjUyNX0.mx-kvJuIio2z6jEF_IW2cODUy93l-Q3KYnIkD6qL1MY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

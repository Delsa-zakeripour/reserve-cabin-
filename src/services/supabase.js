import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jqgkomcbfsjtzlqgmprq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZ2tvbWNiZnNqdHpscWdtcHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMjAxMzAsImV4cCI6MjA0Mzc5NjEzMH0.ff1O2A9O_wbOw99ipWkeQeufO5lq6v5Kh0kjA8Y0qX4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

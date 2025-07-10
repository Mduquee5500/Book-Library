// Responsability / Concern: Create Supabase Client

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ooayqklqlwznmtugljxj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vYXlxa2xxbHd6bm10dWdsanhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTI1MjUsImV4cCI6MjA2NzU4ODUyNX0.GivD6N41bmi6KngayqEb9c41KfTXnbL0pkbQRnpEDHk";

export const supabase = createClient(supabaseUrl, supabaseKey);

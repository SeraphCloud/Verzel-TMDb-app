import { createClient } from "@supabase/supabase-js";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRseXd6Z2N3aG5wdmZ6emt6eGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNDI2MzUsImV4cCI6MjA3NzkxODYzNX0.qgIJUrFYMr1bQZTjv-CNnnyi98gyeGvWsJVvs7CU72I";
const supabaseUrl = "https://tlywzgcwhnpvfzzkzxjn.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wqkcknktmkgfvrgpfsbw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxa2Nrbmt0bWtnZnZyZ3Bmc2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NzU2NjIsImV4cCI6MjA1MTE1MTY2Mn0.NcP2wkJPC12_H9K8KO28Ge5ptCmHA081Irxy0XlPI68";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import * as dotenv from "dotenv";
import * as path from "path";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const updates = [
  { email: "brad.ivy21@gmail.com", full_name: "Brad Ivy" },
];

async function run() {
  const { data: { users }, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error("Failed to list users:", error.message);
    process.exit(1);
  }

  for (const update of updates) {
    const user = users.find((u) => u.email === update.email);

    if (!user) {
      console.log(`Not found: ${update.email}`);
      continue;
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { user_metadata: { full_name: update.full_name } }
    );

    if (updateError) {
      console.error(`Failed to update ${update.email}:`, updateError.message);
    } else {
      console.log(`Updated ${update.email} → full_name: "${update.full_name}"`);
    }
  }
}

run();

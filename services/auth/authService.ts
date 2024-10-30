import { supabase } from "@utils/supabase";
import { Session } from "@supabase/supabase-js";
interface SignProps {
  email: string;
  password: string
}
export const checkUserSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Function to listen for authentication state changes
export const subscribeToAuthChanges = (callback: (session: Session | null) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}

// Example function to sign in a user
export const signInWithPassword = async ({ email, password }: SignProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
}

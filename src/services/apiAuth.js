import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log("user data", data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log("data of session", data);

  if (error) throw new Error(error.message);

  return data?.user;
}


export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, email, avatar }) {
  //  1 update username or password
  let updateDeta;

  if (password) updateDeta = { password };
  if (email) updateDeta = { data: { email } };

  const { data, error } = await supabase.auth.updateUser(updateDeta);

  if (error) throw new Error(error.message);
  if (avatar) return data;

  // 2 upload an avatar
  const fileName = `avatar-${data.user.id}-${Math.random}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3 update avatar in the user
  const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updateUser;
}
